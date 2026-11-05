import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { cn } from "@/lib/utils";

export interface SignaturePadRef {
  clear: () => void;
  getSignature: () => string | null;
  isEmpty: () => boolean;
}

export interface SignaturePadProps {
  className?: string;
  width?: number;
  height?: number;
  penColor?: string;
  disabled?: boolean;
}

export const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>(
  (
    {
      className,
      width = 400,
      height = 200,
      penColor = "#000",
      disabled = false,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);

    const getCtx = () => canvasRef.current?.getContext("2d");

    const startDraw = (e: PointerEvent<HTMLCanvasElement>) => {
      if (disabled) return;
      const rect = canvasRef.current!.getBoundingClientRect();
      const ctx = getCtx();
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      setIsDrawing(true);
    };

    const draw = (e: PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawing || disabled) return;
      const rect = canvasRef.current!.getBoundingClientRect();
      const ctx = getCtx();
      if (!ctx) return;
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.strokeStyle = penColor;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.stroke();
      setHasDrawn(true);
    };

    const stopDraw = () => setIsDrawing(false);

    useImperativeHandle(ref, () => ({
      clear: () => {
        const canvas = canvasRef.current;
        const ctx = getCtx();
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasDrawn(false);
      },
      getSignature: () => {
        if (!hasDrawn) return null;
        return canvasRef.current?.toDataURL("image/png") ?? null;
      },
      isEmpty: () => !hasDrawn,
    }));

    return (
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={cn(
          "touch-none rounded-md border border-input bg-background",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        onPointerDown={startDraw}
        onPointerMove={draw}
        onPointerUp={stopDraw}
        onPointerLeave={stopDraw}
      />
    );
  }
);

SignaturePad.displayName = "SignaturePad";
