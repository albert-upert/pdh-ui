import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Gaya mengikuti Konsta UI (ButtonClasses/ButtonColors), memakai token Uper.
 * `ios:` dan `material:` aktif sesuai `data-ui` pada <html> (lihat src/styles.css).
 *
 * Pemetaan varian Konsta -> pdh-ui:
 *   fill -> primary, outline -> secondary, clear -> tertiary, tonal -> tonal
 */
const buttonVariants = cva(
  [
    "relative inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap select-none",
    "font-medium transition-colors ios:duration-100 material:duration-300",
    "ios:rounded-sm material:rounded-lg",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
    "disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground",
          "ios:active:bg-[color-mix(in_srgb,var(--primary)_85%,black)]",
          "material:hover:bg-[color-mix(in_srgb,var(--primary)_92%,white)]",
          "disabled:bg-black/10 disabled:text-black/30 dark:disabled:bg-white/10 dark:disabled:text-white/30",
        ],
        secondary: [
          "border border-primary bg-transparent text-primary",
          "ios:border-2 ios:active:bg-primary/15",
          "material:border-border material:hover:bg-primary/10",
          "disabled:border-black/10 disabled:text-black/30 dark:disabled:border-white/10 dark:disabled:text-white/30",
        ],
        tertiary: [
          "bg-transparent text-primary",
          "ios:active:bg-primary/15 material:hover:bg-primary/10",
          "disabled:text-black/30 dark:disabled:text-white/30",
        ],
        tonal: [
          "bg-primary/15 text-primary",
          "ios:active:bg-primary/25 material:hover:bg-primary/25",
          "disabled:bg-black/10 disabled:text-black/30 dark:disabled:bg-white/10 dark:disabled:text-white/30",
        ],
        destructive: [
          "bg-destructive text-destructive-foreground",
          "ios:active:bg-[var(--destructive-active)] material:hover:bg-[var(--destructive-hover)]",
          "disabled:bg-black/10 disabled:text-black/30 dark:disabled:bg-white/10 dark:disabled:text-white/30",
        ],
        outline: [
          "border border-border bg-background text-foreground",
          "ios:active:bg-muted material:hover:bg-muted",
          "disabled:border-black/10 disabled:text-black/30 dark:disabled:border-white/10 dark:disabled:text-white/30",
        ],
        ghost: [
          "bg-transparent text-foreground",
          "ios:active:bg-muted material:hover:bg-muted",
          "disabled:text-black/30 dark:disabled:text-white/30",
        ],
      },
      size: {
        // Konsta: large / medium / small
        lg: "gap-2 px-4 text-sm [&_svg]:size-5 ios:h-12 ios:font-semibold material:h-12 ios:text-[17px]",
        md: "gap-1.5 px-3 text-sm [&_svg]:size-4 ios:h-8.5 material:h-10 ios:text-[15px]",
        sm: "gap-1 px-2 text-sm [&_svg]:size-4 ios:h-7 material:h-8",
        icon: "size-10 [&_svg]:size-5",
        "icon-md": "[&_svg]:size-4 size-[30px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);

export function Button({
  className,
  variant = "primary",
  size = "lg",
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
