import { Dialog as DialogPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { Button } from "@/components/button";
import { CloseIcon } from "@/components/icon";
import Typography from "@/components/typography/typography";
import { cn } from "@/lib/utils";

export function Dialog({
  ...props
}: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="Dialog" {...props} />;
}

export function DialogTrigger({
  ...props
}: ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="Dialog-trigger" {...props} />;
}

export function DialogClose({
  ...props
}: ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="Dialog-close" {...props} />;
}

export function DialogPortal({
  ...props
}: ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="Dialog-portal" {...props} />;
}

export function DialogOverlay({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="Dialog-overlay"
      className={cn(
        "inset-0 bg-black/50 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed z-50 duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0",
        className
      )}
      {...props}
    />
  );
}

export function DialogContent({
  className,
  children,
  side = "center",
  showCloseButton = true,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left" | "center";
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="Dialog-content"
        data-side={side}
        className={cn(
          "gap-4 shadow-lg ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:p-6 data-[side=center]:max-w-lg data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:p-6 data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:p-6 data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:p-6 data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=center]:data-open:zoom-in-95 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=center]:data-closed:zoom-out-95 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10 fixed z-50 bg-background bg-clip-padding transition duration-200 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=center]:top-1/2 data-[side=center]:left-1/2 data-[side=center]:w-full data-[side=center]:-translate-x-1/2 data-[side=center]:-translate-y-1/2 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:h-auto data-[side=top]:border-b ios:data-[side=center]:rounded-4xl material:data-[side=center]:rounded-[1.75rem]",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="Dialog-close" asChild>
            <Button
              variant="ghost"
              className="top-4 right-4 absolute"
              size="icon"
            >
              <CloseIcon />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="Dialog-header"
      className={cn(
        "gap-2.5 px-5 py-5 flex items-center rounded-t-xl border border-b-0 border-input bg-muted",
        className
      )}
      {...props}
    />
  );
}

export function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="Dialog-footer"
      className={cn("gap-4 flex items-center", className)}
      {...props}
    />
  );
}

export function DialogTitle({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="Dialog-title"
      className={cn("flex-1 text-center", className)}
      {...props}
    >
      <Typography variant="h5" as="span">
        {children}
      </Typography>
    </DialogPrimitive.Title>
  );
}

export function DialogDescription({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="Dialog-description"
      className={cn("text-center", className)}
      {...props}
    >
      <Typography variant="body-small" as="span">
        {children}
      </Typography>
    </DialogPrimitive.Description>
  );
}

export function DialogBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="Dialog-body"
      className={cn(
        "gap-5 px-5 py-5 flex flex-col items-center rounded-b-xl border border-t-0 border-input bg-background",
        className
      )}
      {...props}
    />
  );
}
