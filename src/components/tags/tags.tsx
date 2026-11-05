import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import Typography from "@/components/typography/typography";
import { cn } from "@/lib/utils";

export const tagVariants = cva(
  "font-normal inline-flex items-center justify-center whitespace-nowrap transition-colors",
  {
    variants: {
      color: {
        red: "",
        green: "",
        "green-light": "",
        yellow: "",
        blue: "",
        lavender: "",
        peach: "",
        gray: "",
      },
      type: {
        monochrome: "border-0 bg-transparent",
        "with-border": "bg-white border-[1.5px]",
        filled: "",
      },
      size: {
        // xl = Chip Konsta: iOS h-7 rounded-full, Material h-8 rounded-lg
        xl: "px-3 text-sm ios:h-7 material:h-8",
        lg: "px-2 py-1.5 text-xs leading-5",
        md: "px-2 py-1 leading-3 text-[10px]",
      },
      rounded: {
        default: "ios:rounded-full material:rounded-lg",
        pill: "rounded-full",
      },
    },
    compoundVariants: [
      // Red color variants
      {
        color: "red",
        type: "monochrome",
        className: "bg-danger-bg text-danger",
      },
      {
        color: "red",
        type: "with-border",
        className: "border-danger-border text-danger-border",
      },
      {
        color: "red",
        type: "filled",
        className: "text-white bg-danger-border",
      },
      // Green color variants
      {
        color: "green",
        type: "monochrome",
        className: "text-[#98a725]",
      },
      {
        color: "green",
        type: "with-border",
        className: "border-[#98a725] text-[#98a725]",
      },
      {
        color: "green",
        type: "filled",
        className: "bg-[#d0de68] text-[#262626]",
      },
      // Green light color variants
      {
        color: "green-light",
        type: "monochrome",
        className: "text-[#98a725]",
      },
      {
        color: "green-light",
        type: "with-border",
        className: "border-[#fafbee] text-[#98a725]",
      },
      {
        color: "green-light",
        type: "filled",
        className: "bg-[#fafbee] text-[#98a725]",
      },
      // Yellow color variants
      {
        color: "yellow",
        type: "monochrome",
        className: "bg-[#FFFBEB] text-[#F5A623]",
      },
      {
        color: "yellow",
        type: "with-border",
        className: "border-[#E6C530] bg-[#FEF3C0] text-[#F5A623]",
      },
      {
        color: "yellow",
        type: "filled",
        className: "bg-[#fdd835] text-foreground",
      },
      // Blue color variants
      {
        color: "blue",
        type: "monochrome",
        className: "bg-blue-50 text-[#0065a3]",
      },
      {
        color: "blue",
        type: "with-border",
        className: "border-[#0097f5] bg-blue-50 text-[#0065a3]",
      },
      {
        color: "blue",
        type: "filled",
        className: "text-white bg-[#0097f5]",
      },
      // lavender variant
      {
        color: "lavender",
        type: "monochrome",
        className: "bg-[#F0B2F0] text-[#004B7A]",
      },
      // peach variant
      {
        color: "peach",
        type: "monochrome",
        className: "bg-[#FFDAC5] text-[#DA621C]",
      },
      // gray variant
      {
        color: "gray",
        type: "monochrome",
        className: "bg-gray-400 text-gray-800",
      },
    ],
    defaultVariants: {
      color: "red",
      type: "with-border",
      size: "xl",
      rounded: "default",
    },
  }
);

export interface TagProps
  extends
    Omit<ComponentProps<"span">, "color">,
    VariantProps<typeof tagVariants> {}

export function Tag({
  className,
  color,
  type,
  size,
  rounded,
  ...props
}: TagProps) {
  return (
    <span
      data-slot="tag"
      className={cn(tagVariants({ color, type, size, rounded }), className)}
      {...props}
    />
  );
}

// Semester Tag Component
const semesterColors: Record<string, string> = {
  "1": "#e64325",
  "2": "#e64325",
  "3": "#e64325",
  "4": "#e64325",
  "5": "#e64325",
  "6": "#e64325",
  "7": "#e64325",
  "8": "#e64325",
  pendek: "#e64325",
};

export interface SemesterTagProps extends ComponentProps<"div"> {
  semester: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "pendek";
}

export function SemesterTag({
  semester,
  className,
  ...props
}: SemesterTagProps) {
  const color = semesterColors[semester];
  const label = semester === "pendek" ? "Sem Dek" : `Semester ${semester}`;

  return (
    <div
      className={cn(
        "border-white bg-white px-2 py-1.5 inline-flex items-center justify-center rounded-full border-[1.5px]",
        className
      )}
      style={{ color }}
      {...props}
    >
      <Typography variant="caption" className="font-medium text-center" as="p">
        {label}
      </Typography>
    </div>
  );
}

// IPK Tag Component
export interface IpkTagProps extends ComponentProps<"div"> {
  ipk: string;
  disabled?: boolean;
  iconSrc?: string;
}

export function IpkTag({
  ipk,
  disabled = false,
  iconSrc,
  className,
  ...props
}: IpkTagProps) {
  return (
    <div className={cn("gap-2 inline-flex items-center", className)} {...props}>
      {iconSrc && (
        <div className="size-8 relative shrink-0">
          <img
            src={iconSrc}
            alt="IPK Icon"
            className="size-full object-cover"
          />
        </div>
      )}
      <Typography
        variant="body-medium"
        className={disabled ? "text-white" : "text-primary"}
        as="span"
      >
        {ipk}
      </Typography>
    </div>
  );
}
