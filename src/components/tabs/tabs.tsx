import { Tabs as RadixTabs } from "radix-ui";
import type { ComponentProps } from "react";
import { glassIosClassName } from "@/components/glass";
import { cn } from "@/lib/utils";

export function Tabs({
  className,
  ...props
}: ComponentProps<typeof RadixTabs.Root>) {
  return (
    <RadixTabs.Root
      data-slot="tabs"
      className={cn("w-full", className)}
      {...props}
    />
  );
}

export function TabsList({
  className,
  variant = "underline",
  ...props
}: ComponentProps<typeof RadixTabs.List> & {
  variant?: "underline" | "pill" | "folder";
}) {
  return (
    <RadixTabs.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(
        "gap-0 inline-flex items-center text-foreground",
        // Underline: garis pemisah tipis, indikator ada di setiap tab
        variant === "underline" && "border-b border-border",
        // Pill (Tabbar Konsta): iOS kapsul kaca, Material bilah berlatar card
        variant === "pill" && [
          "gap-1 rounded-full",
          glassIosClassName,
          "ios:p-1 material:px-2 material:shadow-sm material:bg-card",
        ],
        // Folder: garis dasar primary, tab aktif "menyatu" dengan konten
        variant === "folder" && "w-full border-b border-primary",
        className
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  variant = "underline",
  stacked = false,
  ...props
}: ComponentProps<typeof RadixTabs.Trigger> & {
  variant?: "underline" | "pill" | "folder";
  /** Ikon di atas, label di bawah (seperti `TabbarLink`). Untuk semua varian. */
  stacked?: boolean;
}) {
  return (
    <RadixTabs.Trigger
      data-slot="tabs-trigger"
      data-variant={variant}
      className={cn(
        "relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap select-none",
        "font-medium material:text-sm transition-colors ios:text-[15px]",
        stacked ? "gap-0.5 text-xs flex-col" : "gap-2",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        // Underline: teks primary + indikator di bawah (iOS tipis, Material 3 px berujung bulat)
        variant === "underline" && [
          "px-4 py-3 -mb-px",
          "after:bottom-0 after:h-0.5 after:pointer-events-none after:absolute after:rounded-full after:bg-transparent after:transition-colors",
          "ios:after:inset-x-3 material:after:inset-x-0 material:after:h-[3px] material:after:rounded-b-none",
          "ios:data-[state=inactive]:text-muted-foreground material:data-[state=inactive]:text-muted-foreground",
          "ios:data-[state=active]:font-semibold data-[state=active]:text-primary data-[state=active]:after:bg-primary",
          "ios:active:opacity-50 material:rounded-t-lg material:hover:bg-primary/8",
        ],
        // Pill (gaya TabbarLink Konsta)
        variant === "pill" && [
          "rounded-full",
          stacked ? "px-4 py-1" : "px-4 py-2",
          // iOS: aktif = teks primary di atas kapsul tipis
          "ios:data-[state=active]:bg-black/10 ios:dark:data-[state=active]:bg-white/15 ios:data-[state=inactive]:text-foreground",
          // Material: aktif = kapsul primary transparan
          "material:data-[state=active]:bg-primary/15 material:data-[state=inactive]:text-muted-foreground",
          "data-[state=active]:text-primary",
        ],
        // Folder: tab aktif berupa kartu yang menutup garis dasar
        variant === "folder" && [
          "px-10 py-2.5 ios:rounded-t-2xl material:rounded-t-xl",
          "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground",
          "ios:data-[state=active]:font-semibold data-[state=active]:-mb-px data-[state=active]:border-x data-[state=active]:border-t data-[state=active]:border-primary data-[state=active]:bg-card data-[state=active]:text-primary",
        ],
        className
      )}
      {...props}
    />
  );
}
export function TabsContent({
  className,
  variant = "underline",
  ...props
}: ComponentProps<typeof RadixTabs.Content> & {
  variant?: "underline" | "pill" | "folder";
}) {
  return (
    <RadixTabs.Content
      data-slot="tabs-content"
      className={cn(
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
        variant === "underline" && "mt-4",
        variant === "pill" && "mt-4",
        variant === "folder" && "mt-0",
        className
      )}
      {...props}
    />
  );
}
