import { Slot } from "radix-ui";
import type { ComponentProps, ReactNode } from "react";
import { CaretRightIcon } from "@/components/icon";
import { cn } from "@/lib/utils";

export interface ListProps extends ComponentProps<"ul"> {
  /** Daftar menjadi kartu bersudut bulat dengan margin samping. */
  inset?: boolean;
  /** Latar `card` (bukan transparan). */
  strong?: boolean;
  /** Garis tepi atas dan bawah (atau border penuh jika `inset`). */
  outline?: boolean;
}

/** Daftar (Konsta `List`): wadah `ListItem` dan `ListGroupTitle`. */
export function List({
  className,
  inset = false,
  strong = false,
  outline = false,
  ...props
}: ListProps) {
  return (
    <ul
      data-slot="list"
      className={cn(
        "my-8 p-0 relative z-10 list-none",
        strong && "bg-card",
        outline && !inset && "border-y border-border",
        inset && "mx-4 overflow-hidden ios:rounded-3xl material:rounded-2xl",
        inset && outline && "border border-border",
        className
      )}
      {...props}
    />
  );
}

/** Judul kelompok di dalam `List`. */
export function ListGroupTitle({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="list-group-title"
      className={cn(
        "top-0 px-4 text-sm ios:h-8 material:h-12 sticky z-20 flex items-center text-muted-foreground ios:bg-muted material:bg-card",
        className
      )}
      {...props}
    />
  );
}

export interface ListItemProps extends Omit<ComponentProps<"div">, "title"> {
  title?: ReactNode;
  subtitle?: ReactNode;
  text?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  /** Ikon atau gambar di kiri. */
  media?: ReactNode;
  /** Konten di kanan (nilai, badge, dan sebagainya). */
  after?: ReactNode;
  /** Judul ditebalkan. */
  strongTitle?: boolean;
  /** Tampilkan panah di kanan. */
  chevron?: boolean;
  /** Gabungkan perilaku ke elemen anak (misalnya `<a>` atau `Link`). */
  asChild?: boolean;
}

/**
 * Baris daftar (Konsta `ListItem`).
 * Dengan `onClick` atau `asChild`, baris menjadi interaktif dan memberi umpan balik saat ditekan.
 */
export function ListItem({
  className,
  title,
  subtitle,
  text,
  header,
  footer,
  media,
  after,
  strongTitle = false,
  chevron = false,
  asChild = false,
  onClick,
  ...props
}: ListItemProps) {
  const interactive = !!onClick || asChild;
  const Comp = (asChild ? Slot.Root : onClick ? "button" : "div") as "div";
  const buttonProps = onClick && !asChild ? { type: "button" } : {};

  return (
    <li data-slot="list-item" className="group/item list-none">
      <Comp
        className={cn(
          "ps-4 flex w-full items-center text-start text-foreground",
          interactive &&
            "ios:active:bg-black/10 ios:dark:active:bg-white/10 cursor-pointer duration-300 select-none active:duration-0 material:hover:bg-foreground/5 material:active:bg-foreground/10",
          className
        )}
        onClick={onClick}
        {...buttonProps}
        {...props}
      >
        {media && (
          <div className="me-4 ios:py-2 material:py-3 flex shrink-0">
            {media}
          </div>
        )}
        <div className="py-3 pe-4 relative w-full border-b border-border group-last/item:border-b-0">
          {header && (
            <div className="mb-0.5 text-xs text-muted-foreground">{header}</div>
          )}
          <div className="ios:min-h-7 flex items-center justify-between">
            <div className={cn("shrink", strongTitle && "font-semibold")}>
              {title}
            </div>
            {(after || chevron) && (
              <div className="gap-1 ps-1 ms-auto flex shrink-0 items-center text-muted-foreground">
                {after}
                {chevron && (
                  <CaretRightIcon className="ms-2 size-4 opacity-40" />
                )}
              </div>
            )}
          </div>
          {subtitle && <div className="text-sm">{subtitle}</div>}
          {text && (
            <div className="text-sm line-clamp-2 text-muted-foreground">
              {text}
            </div>
          )}
          {footer && (
            <div className="mt-0.5 text-xs text-muted-foreground">{footer}</div>
          )}
        </div>
      </Comp>
    </li>
  );
}
