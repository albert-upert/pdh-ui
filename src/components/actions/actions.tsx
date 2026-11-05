import { Dialog as ActionsPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { glassIosClassName } from "@/components/glass";
import { cn } from "@/lib/utils";

/** Action sheet (Konsta `Actions`), dibangun di atas Radix Dialog. */
export function Actions({
  ...props
}: ComponentProps<typeof ActionsPrimitive.Root>) {
  return <ActionsPrimitive.Root data-slot="actions" {...props} />;
}

export function ActionsTrigger({
  ...props
}: ComponentProps<typeof ActionsPrimitive.Trigger>) {
  return <ActionsPrimitive.Trigger data-slot="actions-trigger" {...props} />;
}

/**
 * Isi action sheet. iOS: kelompok tombol berupa kapsul kaca yang melayang.
 * Material: panel bawah `rounded-t-2xl`. Beri `ActionsTitle` agar terbaca oleh pembaca layar.
 */
export function ActionsContent({
  className,
  children,
  ...props
}: ComponentProps<typeof ActionsPrimitive.Content>) {
  return (
    <ActionsPrimitive.Portal>
      <ActionsPrimitive.Overlay
        data-slot="actions-overlay"
        className="inset-0 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed z-40 duration-300"
      />
      <ActionsPrimitive.Content
        data-slot="actions-content"
        className={cn(
          "inset-x-0 bottom-0 max-w-md fixed z-50 mx-auto w-full overflow-hidden outline-none",
          "ios:px-4 ios:pt-4 ios:pb-[max(16px,env(safe-area-inset-bottom,0px))]",
          "material:rounded-t-2xl material:bg-card material:pb-safe",
          "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom duration-300",
          className
        )}
        {...props}
      >
        {children}
      </ActionsPrimitive.Content>
    </ActionsPrimitive.Portal>
  );
}

/** Judul tersembunyi untuk pembaca layar (wajib oleh Radix). */
export function ActionsTitle({
  className,
  ...props
}: ComponentProps<typeof ActionsPrimitive.Title>) {
  return (
    <ActionsPrimitive.Title
      data-slot="actions-title"
      className={cn("sr-only", className)}
      {...props}
    />
  );
}

/** Kelompok tombol. iOS: kapsul kaca bersudut bulat. Material: blok dengan garis pemisah. */
export function ActionsGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="actions-group"
      className={cn(
        "relative",
        "ios:mt-2 ios:first:mt-0 ios:overflow-hidden ios:rounded-4xl",
        glassIosClassName,
        "material:border-b material:border-border material:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

/** Teks penjelasan di atas tombol. */
export function ActionsLabel({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="actions-label"
      className={cn(
        "px-4 relative z-10 flex w-full items-center overflow-hidden border-b border-border last:border-b-0",
        "ios:h-14 ios:text-sm ios:justify-center ios:text-muted-foreground",
        "material:h-12 material:text-sm material:font-medium material:justify-start material:text-primary",
        className
      )}
      {...props}
    />
  );
}

export interface ActionsButtonProps extends ComponentProps<"button"> {
  /** Teks tebal. */
  bold?: boolean;
  /** Tetap terbuka setelah ditekan. Bawaan: menutup sheet. */
  keepOpen?: boolean;
}

/** Tombol aksi. Menutup sheet saat ditekan kecuali `keepOpen`. */
export function ActionsButton({
  className,
  bold = false,
  keepOpen = false,
  ...props
}: ActionsButtonProps) {
  const button = (
    <button
      type="button"
      data-slot="actions-button"
      className={cn(
        "px-4 relative z-10 flex w-full cursor-pointer items-center overflow-hidden border-b border-border select-none last:border-b-0",
        "ios:h-14 ios:active:bg-black/10 ios:dark:active:bg-white/5 ios:justify-center ios:text-[17px] ios:text-primary",
        "material:h-12 material:justify-start material:text-foreground material:hover:bg-foreground/5 material:active:bg-foreground/10",
        bold && "ios:font-semibold material:font-medium",
        "disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    />
  );

  if (keepOpen) return button;
  return <ActionsPrimitive.Close asChild>{button}</ActionsPrimitive.Close>;
}
