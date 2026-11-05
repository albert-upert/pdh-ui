import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FabProps extends Omit<ComponentProps<"button">, "children"> {
  icon?: ReactNode;
  text?: ReactNode;
  children?: ReactNode;
}

/**
 * Tombol aksi melayang (Konsta `Fab`).
 * iOS: kapsul kaca berwarna primary setinggi 44 px. Material: kotak `rounded-2xl` 56 px.
 * Posisikan sendiri, mis. `className="fixed right-4 bottom-4"`.
 */
export function Fab({ className, icon, text, children, ...props }: FabProps) {
  const hasText = !!text;

  return (
    <button
      type="button"
      data-slot="fab"
      className={cn(
        "gap-2 flex cursor-pointer items-center justify-center overflow-hidden select-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
        "ios:h-11 ios:rounded-full ios:bg-primary ios:text-primary-foreground ios:shadow-ios-fab ios:duration-100 ios:dark:shadow-ios-fab-dark",
        "material:shadow material:rounded-2xl material:bg-primary-light material:text-primary material:duration-300 material:hover:brightness-95",
        hasText ? "px-4 material:h-14" : "ios:w-11 material:size-14",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="size-6 flex items-center justify-center">{icon}</span>
      )}
      {hasText && (
        <span className="text-sm ios:font-semibold material:font-medium ios:uppercase">
          {text}
        </span>
      )}
      {children}
    </button>
  );
}
