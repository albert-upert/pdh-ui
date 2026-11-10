import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { CaretRightIcon } from "@/components/icon";
import { cn } from "@/lib/utils";

/**
 * Breadcrumbs (dari Konsta UI, MIT). Susun dengan `BreadcrumbsItem`,
 * `BreadcrumbsSeparator`, dan `BreadcrumbsCollapsed`. Jika tidak muat, daftar bisa digulir.
 */
export function Breadcrumbs({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      aria-label="Breadcrumb"
      data-slot="breadcrumbs"
      className={cn(
        "no-scrollbar gap-3 px-0 py-1 flex items-center justify-start overflow-auto whitespace-nowrap",
        "material:text-sm ios:text-[17px]",
        className
      )}
      {...props}
    />
  );
}

export interface BreadcrumbsItemProps extends ComponentProps<"div"> {
  /** Halaman saat ini: teks lebih tegas dan diberi `aria-current="page"`. */
  active?: boolean;
  /** Pakai elemen anak sebagai item, mis. `<a>` atau `Link` router. */
  asChild?: boolean;
}

export function BreadcrumbsItem({
  className,
  active = false,
  asChild = false,
  ...props
}: BreadcrumbsItemProps) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="breadcrumbs-item"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex shrink-0 items-center overflow-hidden",
        active
          ? "ios:font-semibold text-foreground material:bg-muted"
          : "text-primary hover:underline material:bg-primary-light",
        "material:px-2 material:py-1 material:font-medium material:rounded-lg",
        className
      )}
      {...props}
    />
  );
}

export function BreadcrumbsSeparator({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      data-slot="breadcrumbs-separator"
      className={cn(
        "w-5 flex shrink-0 items-center justify-center text-muted-foreground rtl:rotate-180",
        className
      )}
      {...props}
    >
      {children ?? <CaretRightIcon className="size-5" />}
    </div>
  );
}

/** Tiga titik penanda tingkat yang diringkas. Gunakan sebagai pemicu `Popover`. */
export function BreadcrumbsCollapsed({
  className,
  "aria-label": ariaLabel = "Tampilkan tingkat tersembunyi",
  ...props
}: ComponentProps<"button">) {
  const dot = "size-1 rounded-full bg-primary";

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      data-slot="breadcrumbs-collapsed"
      className={cn(
        "gap-0.75 flex cursor-pointer items-center focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        "ios:px-1.5 ios:h-[1em] ios:rounded-sm ios:bg-primary/15 ios:duration-300 ios:active:opacity-30 ios:active:duration-0",
        "material:px-2 material:py-3 material:rounded-lg material:bg-primary-light",
        className
      )}
      {...props}
    >
      <span className={dot} />
      <span className={dot} />
      <span className={dot} />
    </button>
  );
}
