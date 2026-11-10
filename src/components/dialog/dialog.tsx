import { Dialog as DialogPrimitive } from "radix-ui";
import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/button";
import { glassIosClassName } from "@/components/glass";
import { CloseIcon } from "@/components/icon";
import Typography from "@/components/typography/typography";
import { cn } from "@/lib/utils";

export interface DialogProps extends Omit<
  ComponentProps<typeof DialogPrimitive.Root>,
  "children"
> {
  children?: ReactNode;
  /** Mode Konsta: tampil atau tersembunyi. Kendalikan dari luar, mis. dengan `useState`. */
  opened?: boolean;
  /** Mode Konsta: dipanggil saat latar ditekan atau Escape ditekan. Tutup dialog di sini. */
  onBackdropClick?: () => void;
  /** Mode Konsta: judul. */
  title?: ReactNode;
  /** Mode Konsta: isi, bisa teks atau elemen (mis. `List`). */
  content?: ReactNode;
  /** Mode Konsta: tombol di bawah, gunakan `DialogButton`. */
  buttons?: ReactNode;
  /** Mode Konsta: className untuk panel dialog. */
  className?: string;
}

/**
 * Dialog. Dua cara pakai:
 * 1. Gaya Konsta (kontrol dari luar): `<Dialog opened title content buttons onBackdropClick />`
 * 2. Gaya Radix (komposisi): `<Dialog><DialogTrigger /><DialogContent /></Dialog>`
 *
 * iOS: kaca `rounded-4xl` lebar 300 px, tombol tonal berdampingan.
 * Material: panel `card` `rounded-[1.75rem]` lebar 312 px, tombol teks rata kanan.
 */
export function Dialog({
  opened,
  onBackdropClick,
  onOpenChange,
  title,
  content,
  buttons,
  className,
  children,
  ...props
}: DialogProps) {
  const konsta =
    opened !== undefined ||
    title !== undefined ||
    content !== undefined ||
    buttons !== undefined;

  if (!konsta) {
    return (
      <DialogPrimitive.Root
        data-slot="Dialog"
        onOpenChange={onOpenChange}
        {...props}
      >
        {children}
      </DialogPrimitive.Root>
    );
  }

  return (
    <DialogPrimitive.Root
      data-slot="Dialog"
      open={opened}
      onOpenChange={(open) => {
        onOpenChange?.(open);
        if (!open) onBackdropClick?.();
      }}
      {...props}
    >
      <DialogPortal>
        <DialogPrimitive.Overlay
          data-slot="Dialog-overlay"
          className="inset-0 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed z-50 duration-300"
        />
        <DialogPrimitive.Content
          data-slot="Dialog-content"
          aria-describedby={undefined}
          className={cn(
            "fixed top-1/2 left-1/2 z-50 max-h-full -translate-x-1/2 -translate-y-1/2 overflow-hidden text-foreground outline-none",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-200",
            glassIosClassName,
            "ios:w-75 ios:max-w-full ios:rounded-4xl",
            "material:w-78 material:p-6 material:shadow-xl material:max-w-[90%] material:rounded-[1.75rem] material:bg-card",
            className
          )}
        >
          <div className="gap-3 ios:p-6 flex flex-col ios:items-center ios:text-center">
            {title ? (
              <DialogPrimitive.Title className="font-semibold material:text-2xl material:font-normal w-full ios:text-[17px]">
                {title}
              </DialogPrimitive.Title>
            ) : (
              <DialogPrimitive.Title className="sr-only">
                Dialog
              </DialogPrimitive.Title>
            )}
            {(content || children) && (
              <div className="text-sm w-full material:text-muted-foreground">
                {content}
                {children}
              </div>
            )}
          </div>
          {buttons && (
            <div className="gap-2 ios:p-3.5 ios:pt-0 material:pt-6 flex items-center ios:justify-center material:justify-end">
              {buttons}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogPrimitive.Root>
  );
}

export interface DialogButtonProps extends ComponentProps<"button"> {
  /** Tombol utama (terisi `primary`). Tanpa ini: tonal di iOS, teks di Material. */
  strong?: boolean;
}

/** Tombol pada `Dialog` (Konsta `DialogButton`). Tidak menutup dialog otomatis: tutup lewat `onClick`. */
export function DialogButton({
  className,
  strong = false,
  ...props
}: DialogButtonProps) {
  return (
    <button
      type="button"
      data-slot="Dialog-button"
      className={cn(
        "inline-flex cursor-pointer items-center justify-center duration-100 select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        "ios:h-12 ios:font-semibold ios:flex-1 ios:rounded-sm ios:text-[17px]",
        "material:h-10 material:px-4 material:text-sm material:font-medium material:rounded-full",
        strong
          ? "bg-primary text-primary-foreground hover:brightness-95 active:brightness-90"
          : "text-primary ios:bg-primary/10 ios:active:bg-primary/20 material:hover:bg-primary/10 material:active:bg-primary/15",
        className
      )}
      {...props}
    />
  );
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
