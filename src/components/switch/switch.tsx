import { forwardRef, useCallback, useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps extends Omit<
  ComponentProps<"button">,
  "onChange"
> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * Gaya mengikuti Konsta UI `Toggle` (ToggleClasses/ToggleColors).
 * iOS: track 64x28, thumb pil 38x24. Material: track 52x32 berborder, thumb bulat yang membesar saat aktif.
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(checked || false);

    const handleClick = useCallback(() => {
      if (!disabled) {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onCheckedChange?.(newChecked);
      }
    }, [disabled, isChecked, onCheckedChange]);

    useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        data-slot="switch"
        data-state={isChecked ? "checked" : "unchecked"}
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "group peer relative inline-block shrink-0 cursor-pointer rounded-full align-middle transition-colors duration-300",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // iOS
          "ios:h-7 ios:w-16 ios:p-0.5",
          "ios:bg-black/10 ios:dark:bg-white/20 ios:data-[state=checked]:bg-primary",
          // Material
          "material:h-8 material:w-13 material:border-2",
          "material:border-muted-foreground material:bg-muted",
          "material:data-[state=checked]:border-primary material:data-[state=checked]:bg-primary",
          className
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute block rounded-full transition-all duration-300",
            // iOS: thumb pil putih, menggeser 22px
            "ios:top-0.5 ios:left-0.5 ios:h-6 ios:w-9.5 ios:bg-white ios:shadow-ios-thumb",
            "ios:group-data-[state=checked]:translate-x-5.5",
            // Material: thumb kecil saat mati, penuh saat aktif
            "material:top-0.5 material:left-0.5 material:size-6 material:scale-[0.666] material:bg-muted-foreground",
            "material:group-data-[state=checked]:translate-x-5 material:group-data-[state=checked]:scale-100",
            "material:group-data-[state=checked]:bg-primary-foreground"
          )}
        />
      </button>
    );
  }
);

Switch.displayName = "Switch";
