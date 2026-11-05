import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Permukaan kaca iOS (dari Konsta `Glass`): latar tembus pandang, blur, dan bayangan dalam. */
export const glassIosClassName =
  "ios:bg-ios-glass ios:dark:bg-ios-glass-dark ios:shadow-ios-glass ios:dark:shadow-ios-glass-dark ios:backdrop-blur-lg";

export type GlassProps = ComponentProps<"div"> & {
  asChild?: boolean;
};

export function Glass({ className, asChild = false, ...props }: GlassProps) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="glass"
      className={cn(
        glassIosClassName,
        "material:shadow-sm material:bg-card",
        className
      )}
      {...props}
    />
  );
}
