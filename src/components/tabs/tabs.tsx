import { Tabs as RadixTabs } from "radix-ui";
import type { ComponentProps } from "react";
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
        variant === "underline" && "border-b border-border",
        // pill = Segmented Konsta: iOS rounded-lg, Material rounded-full
        variant === "pill" &&
          "gap-2 p-1 bg-muted ios:rounded-lg material:rounded-full",
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
  ...props
}: ComponentProps<typeof RadixTabs.Trigger> & {
  variant?: "underline" | "pill" | "folder";
}) {
  return (
    <RadixTabs.Trigger
      data-slot="tabs-trigger"
      data-variant={variant}
      className={cn(
        "gap-2 font-normal material:text-sm inline-flex items-center justify-center whitespace-nowrap text-muted-foreground transition-all ios:text-[15px]",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        "hover:text-foreground",
        // Underline variant (default)
        variant === "underline" && [
          "px-4 py-3 -mb-px border-b-2 border-transparent",
          "data-[state=active]:font-bold data-[state=active]:border-primary data-[state=active]:text-primary",
        ],
        // Pill variant
        variant === "pill" && [
          "px-6 py-2 font-bold ios:rounded-md material:rounded-full",
          "data-[state=active]:shadow-sm data-[state=active]:bg-background data-[state=active]:text-primary",
        ],
        // Folder variant
        variant === "folder" && [
          "px-10 py-2.5 bg-transparent",
          "data-[state=active]:bg-white data-[state=active]:font-bold data-[state=active]:-mb-px data-[state=active]:rounded-t-xl data-[state=active]:border-x data-[state=active]:border-t data-[state=active]:border-primary data-[state=active]:text-primary",
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
