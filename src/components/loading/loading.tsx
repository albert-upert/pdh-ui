import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { Typography } from "@/components/typography";
import { cn } from "@/lib/utils";

const loadingVariants = cva(
  "gap-4 p-6 flex flex-col items-center justify-center bg-card ios:rounded-3xl material:rounded-2xl",
  {
    variants: {
      size: {
        sm: "w-[300px]",
        md: "w-[420px]",
        lg: "w-[500px]",
        full: "w-full",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface LoadingProps
  extends ComponentProps<"div">, VariantProps<typeof loadingVariants> {
  /** Progress value from 0 to 100. If not provided, shows indeterminate animation */
  progress?: number;
  /** Text to display below the progress bar */
  text?: string;
  /** Whether to show the progress bar with animation */
  indeterminate?: boolean;
}

export function Loading({
  className,
  size,
  progress,
  text = "loading...",
  indeterminate = true,
  ...props
}: LoadingProps) {
  const isIndeterminate = indeterminate && progress === undefined;

  return (
    <div
      data-slot="loading"
      className={cn(loadingVariants({ size, className }))}
      {...props}
    >
      {/* Progress bar container */}
      {/* Konsta Progressbar: iOS h-1.5, Material h-1, ujung bulat */}
      <div className="ios:h-1.5 material:h-1 w-full overflow-hidden rounded-full bg-primary/20">
        {/* Progress bar fill */}
        <div
          className={cn(
            "h-full rounded-full bg-primary transition-all duration-200",
            isIndeterminate && "animate-loading-progress"
          )}
          style={
            !isIndeterminate
              ? { width: `${Math.min(100, Math.max(0, progress ?? 0))}%` }
              : undefined
          }
        />
      </div>

      {/* Loading text */}
      <Typography variant="h5" className="text-center text-foreground">
        {text}
      </Typography>
    </div>
  );
}
