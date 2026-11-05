import { Popover as PopoverPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { glassIosClassName } from "@/components/glass";
import { cn } from "@/lib/utils";

/** Popover (Konsta `Popover`), dibangun di atas Radix Popover. */
export function Popover({
  ...props
}: ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

export function PopoverTrigger({
  ...props
}: ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

export function PopoverClose({
  ...props
}: ComponentProps<typeof PopoverPrimitive.Close>) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}

/**
 * Isi popover selebar 240 px. iOS: kaca bersudut `rounded-4xl`. Material: `bg-card` bersudut 28 px.
 * Gunakan `showArrow` untuk panah penunjuk.
 */
export function PopoverContent({
  className,
  children,
  sideOffset = 8,
  showArrow = false,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content> & { showArrow?: boolean }) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        sideOffset={sideOffset}
        className={cn(
          "w-60 z-50 overflow-visible text-card-foreground outline-none",
          "material:shadow-lg ios:rounded-4xl material:rounded-[1.75rem] material:bg-card",
          glassIosClassName,
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 origin-(--radix-popover-content-transform-origin) duration-200",
          className
        )}
        {...props}
      >
        <div className="overflow-hidden rounded-[inherit]">{children}</div>
        {showArrow && (
          <PopoverPrimitive.Arrow
            width={20}
            height={10}
            className="fill-ios-glass ios:dark:fill-ios-glass-dark material:fill-card"
          />
        )}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}
