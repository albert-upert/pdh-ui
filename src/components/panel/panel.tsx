import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { Dialog as PanelPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Panel samping (Konsta `Panel`), dibangun di atas Radix Dialog. */
export function Panel({
  ...props
}: ComponentProps<typeof PanelPrimitive.Root>) {
  return <PanelPrimitive.Root data-slot="panel" {...props} />;
}

export function PanelTrigger({
  ...props
}: ComponentProps<typeof PanelPrimitive.Trigger>) {
  return <PanelPrimitive.Trigger data-slot="panel-trigger" {...props} />;
}

export function PanelClose({
  ...props
}: ComponentProps<typeof PanelPrimitive.Close>) {
  return <PanelPrimitive.Close data-slot="panel-close" {...props} />;
}

const panelVariants = cva(
  "w-72 data-[state=closed]:animate-out data-[state=open]:animate-in fixed z-50 max-w-full overflow-auto bg-card text-card-foreground duration-300 outline-none",
  {
    variants: {
      side: {
        left: "left-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        right:
          "right-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
      },
      floating: {
        // Melayang: menjauh dari tepi dan sudut bulat di semua sisi
        true: "inset-y-2 mx-2 h-auto ios:rounded-4xl material:rounded-2xl",
        false: "inset-y-0 h-full",
      },
    },
    compoundVariants: [
      // Material non-melayang: sudut bulat hanya di sisi dalam
      { side: "left", floating: false, className: "material:rounded-r-2xl" },
      { side: "right", floating: false, className: "material:rounded-l-2xl" },
    ],
    defaultVariants: {
      side: "left",
      floating: false,
    },
  }
);

export type PanelContentProps = ComponentProps<typeof PanelPrimitive.Content> &
  VariantProps<typeof panelVariants>;

/** Isi panel. Beri `PanelTitle` agar terbaca oleh pembaca layar (wajib oleh Radix). */
export function PanelContent({
  className,
  side = "left",
  floating = false,
  children,
  ...props
}: PanelContentProps) {
  return (
    <PanelPrimitive.Portal>
      <PanelPrimitive.Overlay
        data-slot="panel-overlay"
        className="inset-0 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed z-40 duration-300"
      />
      <PanelPrimitive.Content
        data-slot="panel-content"
        data-side={side}
        className={cn(panelVariants({ side, floating }), className)}
        {...props}
      >
        {children}
      </PanelPrimitive.Content>
    </PanelPrimitive.Portal>
  );
}

export function PanelTitle({
  className,
  ...props
}: ComponentProps<typeof PanelPrimitive.Title>) {
  return (
    <PanelPrimitive.Title
      data-slot="panel-title"
      className={cn(
        "px-4 pt-4 font-semibold material:text-xl ios:text-[17px]",
        className
      )}
      {...props}
    />
  );
}
