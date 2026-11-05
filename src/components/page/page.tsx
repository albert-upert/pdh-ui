import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Halaman penuh (Konsta `Page`): iOS berlatar abu-abu muda, Material berlatar `background`. */
export function Page({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="page"
      className={cn(
        "relative h-full w-full overflow-auto text-foreground ios:bg-muted material:bg-background",
        className
      )}
      {...props}
    />
  );
}
