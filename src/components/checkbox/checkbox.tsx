import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { forwardRef, useEffect, useRef, useState } from "react";
import type { ChangeEvent, ComponentProps } from "react";
import { CheckIcon } from "@/components/icon";
import { cn } from "@/lib/utils";

export const checkboxVariants = cva(
  // Konsta: iOS bulat 22px berborder 1px, Material persegi 18px berborder 2px
  "text-white flex shrink-0 items-center justify-center transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 ios:rounded-full ios:border material:rounded-sm material:border-2",
  {
    variants: {
      size: {
        sm: "material:size-4 ios:size-[18px]",
        md: "ios:size-5.5 material:size-4.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface CheckboxProps
  extends
    Omit<ComponentProps<"input">, "size" | "type">,
    VariantProps<typeof checkboxVariants> {
  onCheckedChange?: (checked: boolean) => void;
  /** Keadaan setengah terpilih (garis datar). Mengabaikan tanda centang selama aktif. */
  indeterminate?: boolean;
  /**
   * Elemen pembungkus. Gunakan `"div"` bila checkbox berada di dalam `<label>`
   * lain, mis. `media` pada `<ListItem label>`.
   */
  component?: "label" | "div";
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size,
      checked,
      defaultChecked,
      indeterminate = false,
      component = "label",
      onChange,
      onCheckedChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = useState(
      checked ?? defaultChecked ?? false
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (checked !== undefined) setIsChecked(checked);
    }, [checked]);

    useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setIsChecked(event.target.checked);
      onCheckedChange?.(event.target.checked);
      onChange?.(event);
    };

    const filled = isChecked || indeterminate;
    const Wrapper = component;

    return (
      <Wrapper
        data-slot="checkbox"
        className={cn(
          "relative inline-flex cursor-pointer align-middle",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <input
          ref={(el) => {
            inputRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
          }}
          type="checkbox"
          className="peer inset-0 m-0 absolute size-full cursor-[inherit] opacity-0"
          checked={isChecked}
          disabled={disabled}
          aria-checked={indeterminate ? "mixed" : isChecked}
          onChange={handleChange}
          {...props}
        />
        <i
          aria-hidden="true"
          data-slot="checkbox-box"
          className={cn(
            checkboxVariants({ size }),
            filled
              ? "border-primary bg-primary"
              : "ios:border-black/30 ios:dark:border-white/30 bg-transparent material:border-muted-foreground",
            className
          )}
        >
          {indeterminate ? (
            <span className="h-0.5 bg-white w-3/4 ios:rounded-full" />
          ) : (
            <CheckIcon
              className={cn(
                "transition-opacity",
                isChecked ? "opacity-100" : "opacity-0",
                size === "sm" ? "size-[10px]" : "size-3"
              )}
              strokeWidth={3}
            />
          )}
        </i>
      </Wrapper>
    );
  }
);

Checkbox.displayName = "Checkbox";
