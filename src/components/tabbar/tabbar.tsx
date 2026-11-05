import type { ComponentProps, ReactNode } from "react";
import { Toolbar, ToolbarPane } from "@/components/toolbar";
import type { ToolbarProps } from "@/components/toolbar";
import { cn } from "@/lib/utils";

export interface TabbarProps extends Omit<ToolbarProps, "tall"> {
  /** Tautan memakai ikon (tinggi toolbar menyesuaikan jika bersama `labels`). */
  icons?: boolean;
  /** Tautan memakai label. */
  labels?: boolean;
}

/** Bilah tab (Konsta `Tabbar`): `Toolbar` berisi `TabbarLink`. */
export function Tabbar({
  className,
  icons = false,
  labels = false,
  children,
  ...props
}: TabbarProps) {
  return (
    <Toolbar
      data-slot="tabbar"
      tall={icons && labels}
      className={className}
      {...props}
    >
      <ToolbarPane className="md:w-auto w-full">{children}</ToolbarPane>
    </Toolbar>
  );
}

export interface TabbarLinkProps extends Omit<
  ComponentProps<"button">,
  "children"
> {
  active?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
}

/**
 * Satu tab (Konsta `TabbarLink`).
 * iOS: ikon 28 px, tab aktif berwarna primary dengan kapsul tipis.
 * Material: ikon di dalam kapsul 64x32 yang terisi saat aktif.
 */
export function TabbarLink({
  className,
  active = false,
  icon,
  label,
  ...props
}: TabbarLinkProps) {
  return (
    <button
      type="button"
      data-slot="tabbar-link"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "min-w-16 flex h-full flex-1 cursor-pointer flex-col items-center justify-center text-center select-none",
        "transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        "ios:px-3 ios:py-1 ios:rounded-full",
        "ios:data-[active=true]:bg-black/10 ios:dark:data-[active=true]:bg-white/15",
        "material:py-2",
        icon && label && "material:gap-1",
        active
          ? "text-primary"
          : "text-foreground material:text-muted-foreground",
        className
      )}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            "ios:size-7 material:h-8 material:w-16 relative flex items-center justify-center material:rounded-full",
            "material:transition-colors",
            active && "material:bg-primary/15"
          )}
        >
          {icon}
        </span>
      )}
      {label && (
        <span
          className={cn(
            "font-medium",
            icon ? "text-xs" : "ios:text-base material:text-sm"
          )}
        >
          {label}
        </span>
      )}
    </button>
  );
}
