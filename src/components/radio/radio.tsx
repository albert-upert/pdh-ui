import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import type { ChangeEvent, ComponentProps } from "react";
import { CheckIcon } from "@/components/icon";
import { cn } from "@/lib/utils";

export const radioVariants = cva(
  // Konsta: iOS 22px border 1px, Material 20px border 2px
  "peer relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ios:border material:border-2",
  {
    variants: {
      size: {
        sm: "material:size-4 ios:size-[18px]",
        md: "ios:size-5.5 material:size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface RadioProps
  extends
    Omit<ComponentProps<"input">, "size" | "type">,
    VariantProps<typeof radioVariants> {
  onValueChange?: (checked: boolean) => void;
  /** Elemen pembungkus. Bawaan `div`, aman dipakai di dalam `<ListItem label>`. */
  component?: "label" | "div";
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      size,
      checked,
      onChange,
      onValueChange,
      component = "div",
      disabled,
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = useState(checked || false);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.target.checked;
        setIsChecked(newChecked);
        onValueChange?.(newChecked);
        onChange?.(event);
      },
      [onValueChange, onChange]
    );

    useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    const Wrapper = component;

    return (
      <Wrapper className="relative inline-flex items-center">
        <input
          ref={ref}
          type="radio"
          className="peer absolute opacity-0"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        <div
          data-slot="radio"
          className={cn(
            radioVariants({ size }),
            isChecked
              ? "border-primary bg-transparent"
              : "ios:border-black/30 ios:dark:border-white/30 bg-transparent material:border-muted-foreground",
            disabled && "opacity-50",
            className
          )}
        >
          {isChecked && (
            <>
              {/* iOS: tanda centang primary */}
              <CheckIcon
                className={cn(
                  "hidden text-primary ios:block",
                  size === "sm" ? "size-3" : "size-3.5"
                )}
                strokeWidth={3}
              />
              {/* Material: titik primary */}
              <div
                className={cn(
                  "hidden rounded-full bg-primary material:block",
                  size === "sm" ? "size-2" : "size-3"
                )}
              />
            </>
          )}
        </div>
      </Wrapper>
    );
  }
);

Radio.displayName = "Radio";

export interface RadioGroupProps extends ComponentProps<"div"> {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, children, value, onValueChange, disabled, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = useState(value || "");

    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleValueChange = useCallback((itemValue: string) => {
      setSelectedValue(itemValue);
      onValueChange?.(itemValue);
    }, []);

    return (
      <div
        ref={ref}
        role="radiogroup"
        className={cn("gap-2 flex flex-col", className)}
        {...props}
      >
        {Children.map(children, (child) => {
          if (
            isValidElement<RadioGroupItemProps>(child) &&
            child.type === RadioGroupItem
          ) {
            return cloneElement(child, {
              ...child.props,
              checked: child.props.value === selectedValue,
              onValueChange: () => handleValueChange(child.props.value),
              disabled: disabled || child.props.disabled,
            });
          }
          return child;
        })}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps extends RadioProps {
  value: string;
  label?: string;
}

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, label, size, value, ...props }, ref) => {
    return (
      <label className="gap-2 flex cursor-pointer items-center">
        <Radio
          ref={ref}
          size={size}
          className={className}
          value={value}
          {...props}
        />
        {label && (
          <span className="text-sm font-normal text-foreground">{label}</span>
        )}
      </label>
    );
  }
);

RadioGroupItem.displayName = "RadioGroupItem";
