import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRightIcon, CalendarIcon, CloseIcon } from "@/components/icon";
import { cn } from "@/lib/utils";
import { RangeCalendar } from "./range-calendar";

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export interface PresetOption {
  label: string;
  getValue: () => DateRange;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  className?: string;
  wrapperClassName?: string;
  showPresets?: boolean;
  presets?: Array<PresetOption>;
  numberOfMonths?: 1 | 2;
}

const DEFAULT_PRESETS: Array<PresetOption> = [
  {
    label: "Last 9 days",
    getValue: () => {
      const to = new Date();
      const from = new Date();
      from.setDate(from.getDate() - 9);
      return { from, to };
    },
  },
  {
    label: "Last 14 days",
    getValue: () => {
      const to = new Date();
      const from = new Date();
      from.setDate(from.getDate() - 14);
      return { from, to };
    },
  },
  {
    label: "Last 30 days",
    getValue: () => {
      const to = new Date();
      const from = new Date();
      from.setDate(from.getDate() - 30);
      return { from, to };
    },
  },
  {
    label: "Last 1 month",
    getValue: () => {
      const to = new Date();
      const from = new Date();
      from.setMonth(from.getMonth() - 1);
      return { from, to };
    },
  },
  {
    label: "Last 3 months",
    getValue: () => {
      const to = new Date();
      const from = new Date();
      from.setMonth(from.getMonth() - 3);
      return { from, to };
    },
  },
  {
    label: "Last 12 months",
    getValue: () => {
      const to = new Date();
      const from = new Date();
      from.setMonth(from.getMonth() - 12);
      return { from, to };
    },
  },
];

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Placeholder",
  disabled = false,
  error = false,
  helperText,
  label,
  className,
  wrapperClassName,
  showPresets = true,
  presets = DEFAULT_PRESETS,
  numberOfMonths = 2,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    value
  );
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleRangeChange = useCallback((range: DateRange | undefined) => {
    setSelectedRange(range);
    setActivePreset(null);
  }, []);

  const handlePresetClick = useCallback((preset: PresetOption) => {
    const range = preset.getValue();
    setSelectedRange(range);
    setActivePreset(preset.label);
  }, []);

  const handleApply = useCallback(() => {
    onChange?.(selectedRange);
    setOpen(false);
  }, [selectedRange, onChange]);

  const handleClear = useCallback(() => {
    setSelectedRange(undefined);
    setActivePreset(null);
  }, []);

  const formatDate = useCallback(
    (date: Date | undefined) => {
      if (!date) return placeholder;

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    },
    [placeholder]
  );

  const formattedFromDate = useMemo(
    () => (selectedRange?.from ? formatDate(selectedRange.from) : placeholder),
    [selectedRange?.from, formatDate, placeholder]
  );

  const formattedToDate = useMemo(
    () => (selectedRange?.to ? formatDate(selectedRange.to) : placeholder),
    [selectedRange?.to, formatDate, placeholder]
  );

  const displayValue = useMemo(() => {
    if (!selectedRange?.from && !selectedRange?.to) return placeholder;
    return `${formattedFromDate} - ${formattedToDate}`;
  }, [selectedRange, formattedFromDate, formattedToDate, placeholder]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    setSelectedRange(value);
  }, [value]);

  return (
    <div className={cn("gap-0.5 flex w-full flex-col", wrapperClassName)}>
      {label && (
        <label className="text-sm leading-[22px] text-foreground">
          {label}
        </label>
      )}

      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => !disabled && setOpen(!open)}
          disabled={disabled}
          className={cn(
            "h-10 bg-white flex w-full items-center overflow-hidden rounded-lg border transition-colors",
            error ? "border-destructive" : "border-input focus:border-ring",
            disabled && "cursor-not-allowed bg-muted opacity-50",
            className
          )}
        >
          <div className="gap-3 px-3 py-2 flex flex-1 items-center">
            <div className="gap-3 flex flex-1 items-center">
              <span
                className={cn(
                  "text-sm font-normal leading-[22px]",
                  selectedRange?.from
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {displayValue}
              </span>
            </div>
            <div className="gap-2 flex items-center justify-end">
              <CalendarIcon className="size-5 text-primary" />
            </div>
          </div>
        </button>

        {open && (
          <div
            ref={popoverRef}
            className={cn(
              "left-0 mt-1 bg-white absolute top-full z-50 flex items-start overflow-hidden rounded-xl border border-border shadow-[0px_16px_36px_0px_rgba(61,65,81,0.1)]",
              "animate-in fade-in-0 zoom-in-95"
            )}
          >
            {showPresets && (
              <div className="gap-0 p-4 flex h-[374px] w-[200px] flex-col border-r border-border">
                <div className="gap-1 flex w-[168px] flex-col">
                  {presets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handlePresetClick(preset)}
                      className={cn(
                        "p-2 text-base leading-6 w-full rounded-lg text-left transition-colors",
                        activePreset === preset.label
                          ? "bg-red-50 text-red-500"
                          : "bg-white text-foreground hover:bg-muted"
                      )}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col">
              <div className="flex border-b border-border">
                <RangeCalendar
                  selected={selectedRange}
                  onSelect={handleRangeChange}
                  numberOfMonths={numberOfMonths}
                  className="p-4"
                />
              </div>

              <div className="p-4 flex w-full items-center justify-between">
                <div className="gap-2 flex items-center">
                  <div className="h-10 bg-white px-3 flex w-[150px] items-center overflow-hidden rounded-lg border border-input">
                    <span
                      className={cn(
                        "text-sm flex-1 leading-[22px]",
                        selectedRange?.from
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {formattedFromDate}
                    </span>
                    {selectedRange?.from && (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedRange((prev) => ({
                            from: undefined,
                            to: prev?.to,
                          }))
                        }
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <CloseIcon className="size-4" />
                      </button>
                    )}
                  </div>

                  <ArrowRightIcon className="size-5 text-muted-foreground" />

                  <div className="h-10 bg-white px-3 flex w-[150px] items-center overflow-hidden rounded-lg border border-input">
                    <span
                      className={cn(
                        "text-sm flex-1 leading-[22px]",
                        selectedRange?.to
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {formattedToDate}
                    </span>
                    {selectedRange?.to && (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedRange((prev) => ({
                            from: prev?.from,
                            to: undefined,
                          }))
                        }
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <CloseIcon className="size-4" />
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-3 py-2 text-sm font-normal leading-[22px] text-red-500 hover:text-red-400"
                  >
                    Clear
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleApply}
                  className="h-10 px-4 py-2 text-base leading-6 font-normal rounded-lg bg-red-500 text-primary-foreground transition-colors hover:bg-red-400"
                >
                  Atur Tanggal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {helperText && (
        <span
          className={cn(
            "text-xs leading-5",
            error ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}
