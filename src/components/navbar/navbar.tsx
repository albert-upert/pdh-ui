import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface NavbarProps extends Omit<ComponentProps<"header">, "title"> {
  title?: ReactNode;
  subtitle?: ReactNode;
  /** Slot kiri, biasanya tombol kembali. */
  left?: ReactNode;
  /** Slot kanan, biasanya aksi. */
  right?: ReactNode;
}

/**
 * Bilah atas (Konsta `Navbar`).
 * iOS: judul di tengah, latar gradasi yang memudar ke transparan.
 * Material: judul rata kiri, latar `card` setinggi 64 px.
 */
export function Navbar({
  className,
  title,
  subtitle,
  left,
  right,
  children,
  ...props
}: NavbarProps) {
  return (
    <header
      data-slot="navbar"
      className={cn(
        "top-0 sticky z-20 w-full text-foreground",
        "ios:pb-4 ios:bg-gradient-to-b ios:from-muted ios:to-transparent ios:pt-[max(16px,env(safe-area-inset-top,0px))]",
        "material:bg-card material:pt-safe",
        className
      )}
      {...props}
    >
      <div
        data-slot="navbar-inner"
        className="ios:h-11 ios:px-4 material:h-16 relative flex w-full items-center ios:justify-between material:justify-start material:overflow-hidden material:px-safe"
      >
        {left && (
          <div
            data-slot="navbar-left"
            className="ios:me-2 material:mx-1 flex h-full items-center justify-center"
          >
            {left}
          </div>
        )}

        {(title || subtitle) && (
          <div
            data-slot="navbar-title"
            className="min-w-0 leading-tight material:mx-4 whitespace-nowrap ios:absolute ios:top-1/2 ios:left-1/2 ios:-translate-x-1/2 ios:-translate-y-1/2 ios:text-center material:text-start"
          >
            {title && (
              <div className="ios:font-semibold material:font-normal truncate ios:text-[17px] material:text-[22px]">
                {title}
              </div>
            )}
            {subtitle && (
              <div className="text-sm truncate leading-none opacity-75">
                {subtitle}
              </div>
            )}
          </div>
        )}

        {children}

        {right && (
          <div
            data-slot="navbar-right"
            className="material:me-1 ms-auto flex h-full items-center justify-center"
          >
            {right}
          </div>
        )}
      </div>
    </header>
  );
}
