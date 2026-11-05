import { useState } from "react";
import type { ChangeEvent, ComponentProps } from "react";
import { glassIosClassName } from "@/components/glass";
import { ClearIcon, SearchIcon } from "@/components/icon";
import { cn } from "@/lib/utils";

export interface SearchbarProps extends Omit<ComponentProps<"input">, "size"> {
  /** Dipanggil saat tombol hapus ditekan. Pada mode terkendali, kosongkan `value` di sini. */
  onClear?: () => void;
  wrapperClassName?: string;
}

/**
 * Kolom pencarian (Konsta `Searchbar`).
 * iOS: kapsul kaca setinggi 44 px. Material: kapsul `muted` setinggi 48 px dengan ikon di kiri.
 */
export function Searchbar({
  className,
  wrapperClassName,
  value,
  defaultValue,
  onChange,
  onClear,
  placeholder = "Cari",
  disabled,
  ...props
}: SearchbarProps) {
  const [innerValue, setInnerValue] = useState(String(defaultValue ?? ""));
  const current = value !== undefined ? String(value) : innerValue;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInnerValue(event.target.value);
    onChange?.(event);
  };

  const handleClear = () => {
    setInnerValue("");
    onClear?.();
  };

  return (
    <div
      data-slot="searchbar"
      className={cn("relative flex w-full items-center", wrapperClassName)}
    >
      <div
        className={cn(
          "relative w-full rounded-full transition-all duration-300",
          glassIosClassName,
          "material:bg-muted"
        )}
      >
        <span className="inset-y-0 start-4 pointer-events-none absolute z-40 flex items-center text-foreground">
          <SearchIcon className="ios:size-4 material:size-5 opacity-45" />
        </span>
        <input
          type="search"
          data-slot="searchbar-input"
          value={current}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "py-2 relative z-30 block w-full appearance-none bg-transparent text-foreground outline-none placeholder:text-foreground/40 disabled:cursor-not-allowed disabled:opacity-50",
            "ios:h-11 ios:pr-9 ios:pl-10.5 ios:text-[17px]",
            "material:h-12 material:ps-12 material:pe-12",
            "[&::-webkit-search-cancel-button]:hidden",
            className
          )}
          {...props}
        />
        {current && !disabled && (
          <button
            type="button"
            aria-label="Hapus"
            onClick={handleClear}
            className="ios:end-2 ios:size-8 material:end-0 material:size-12 absolute top-1/2 z-40 flex -translate-y-1/2 cursor-pointer items-center justify-center text-foreground active:opacity-30"
          >
            <ClearIcon className="ios:size-3.5 material:size-6 opacity-45" />
          </button>
        )}
      </div>
    </div>
  );
}
