import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export interface BlockProps extends ComponentProps<"div"> {
  /** Latar `card` dengan padding vertikal. */
  strong?: boolean;
  /** Menjadi kartu bersudut bulat dengan margin samping. */
  inset?: boolean;
  /** Garis tepi atas dan bawah (atau border penuh jika `inset`). */
  outline?: boolean;
  /** Tanpa margin vertikal, untuk blok di dalam blok lain. */
  nested?: boolean;
}

/** Wadah konten teks (Konsta `Block`). */
export function Block({
  className,
  strong = false,
  inset = false,
  outline = false,
  nested = false,
  ...props
}: BlockProps) {
  return (
    <div
      data-slot="block"
      className={cn(
        "text-sm relative z-10 text-foreground",
        !nested && "my-8",
        inset ? "mx-4 px-4 ios:rounded-3xl material:rounded-2xl" : "px-4",
        (strong || outline) && "py-4",
        strong && "bg-card",
        outline && !inset && "border-y border-border",
        outline && inset && "border border-border",
        className
      )}
      {...props}
    />
  );
}

export interface BlockTitleProps extends ComponentProps<"div"> {
  /** Judul lebih besar. */
  large?: boolean;
}

/** Judul di atas `Block` atau `List` (Konsta `BlockTitle`). */
export function BlockTitle({
  className,
  large = false,
  ...props
}: BlockTitleProps) {
  return (
    <div
      data-slot="block-title"
      className={cn(
        "mt-8 -mb-2 px-4 flex items-center justify-between text-foreground",
        "ios:font-semibold material:font-medium",
        large ? "text-[1.375rem]" : "ios:text-[17px] material:text-[0.875rem]",
        className
      )}
      {...props}
    />
  );
}
