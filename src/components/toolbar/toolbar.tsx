import type { ComponentProps } from "react";
import { glassIosClassName } from "@/components/glass";
import { cn } from "@/lib/utils";

export interface ToolbarProps extends ComponentProps<"div"> {
  /** Toolbar di atas halaman (bukan di bawah). */
  top?: boolean;
  /** Garis pemisah tipis, hanya berlaku di Material. */
  outline?: boolean;
  /** Toolbar lebih tinggi (ikon + label), dipakai oleh Tabbar. */
  tall?: boolean;
}

/**
 * Bilah bawah atau atas (Konsta `Toolbar`).
 * iOS: melayang dengan latar gradasi, isinya biasanya `ToolbarPane` berbentuk kaca.
 * Material: bilah penuh berlatar `card`.
 */
export function Toolbar({
  className,
  top = false,
  outline = false,
  tall = false,
  children,
  ...props
}: ToolbarProps) {
  return (
    <div
      data-slot="toolbar"
      data-top={top || undefined}
      className={cn(
        "relative z-20 w-full text-foreground",
        !top &&
          "ios:pb-[max(16px,env(safe-area-inset-bottom,0px))] material:pb-safe",
        "ios:px-4 ios:flex ios:justify-center",
        className
      )}
      {...props}
    >
      {/* Latar iOS: gradasi yang memudar ke transparan */}
      {!top && (
        <div
          aria-hidden="true"
          className={cn(
            "bottom-0 left-0 pointer-events-none absolute w-full ios:bg-gradient-to-t ios:from-muted ios:to-transparent material:hidden",
            tall
              ? "h-[calc(96px+env(safe-area-inset-bottom,0px))]"
              : "h-[calc(80px+env(safe-area-inset-bottom,0px))]"
          )}
        />
      )}
      {/* Latar Material */}
      <div
        aria-hidden="true"
        className={cn(
          "top-0 left-0 absolute hidden h-full w-full bg-card material:block",
          outline && (top ? "material:border-b" : "material:border-t")
        )}
      />
      <div
        data-slot="toolbar-inner"
        className={cn(
          "relative flex justify-between",
          "ios:gap-4 ios:items-stretch",
          "material:px-2 material:w-full material:items-center material:overflow-hidden",
          tall ? "ios:h-16 material:h-20" : "ios:h-12 material:h-14"
        )}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Kapsul isi toolbar (Konsta `ToolbarPane`).
 * iOS: kapsul kaca. Material: tidak membuat kotak (`contents`).
 */
export function ToolbarPane({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="toolbar-pane"
      className={cn(
        "ios:relative ios:flex ios:h-full ios:items-center ios:justify-between ios:rounded-full",
        glassIosClassName,
        "material:contents",
        className
      )}
      {...props}
    />
  );
}
