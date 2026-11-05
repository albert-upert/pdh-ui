import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Lencana angka atau status kecil (Konsta `Badge`), mis. jumlah notifikasi pada tab. */
const badgeVariants = cva(
  "ios:font-semibold material:font-medium inline-flex items-center justify-center rounded-full bg-primary leading-none text-primary-foreground",
  {
    variants: {
      size: {
        sm: "min-h-4 min-w-4 px-0.5 text-[10px]",
        md: "min-h-5 min-w-5 px-1.5 py-0.5 text-xs",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, size, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ size }), className)}
      {...props}
    />
  );
}
