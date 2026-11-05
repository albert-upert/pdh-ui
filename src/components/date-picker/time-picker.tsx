import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { ClockIcon } from "@/components/icon";
import { cn } from "@/lib/utils";
import { TimePickerPanel } from "./time-picker-panel";

export interface TimePickerProps {
  value?: { hours: number; minutes: number };
  onChange?: (time: { hours: number; minutes: number } | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  className?: string;
  wrapperClassName?: string;
  defaultHours?: number;
  defaultMinutes?: number;
  editable?: boolean;
}

const MAX_TIME_DIGITS = 4;

const toTimeDigits = (text: string) =>
  text.replace(/\D/g, "").slice(0, MAX_TIME_DIGITS);

const formatTimeDigits = (digits: string) =>
  digits.length <= 2 ? digits : `${digits.slice(0, 2)}:${digits.slice(2)}`;

const getTimeDigitsError = (digits: string) => {
  if (digits.length >= 2 && Number(digits.slice(0, 2)) > 23) {
    return "Jam tidak boleh lebih dari 23";
  }

  if (digits.length === MAX_TIME_DIGITS && Number(digits.slice(2)) > 59) {
    return "Menit tidak boleh lebih dari 59";
  }

  return null;
};

const parseTimeDigits = (digits: string) => {
  if (digits.length < MAX_TIME_DIGITS) return undefined;

  const hours = Number(digits.slice(0, 2));
  const minutes = Number(digits.slice(2));

  if (hours > 23 || minutes > 59) return undefined;

  return { hours, minutes };
};

export function TimePicker({
  value,
  onChange,
  placeholder = "hh:mm",
  disabled = false,
  error = false,
  helperText,
  label,
  className,
  wrapperClassName,
  defaultHours = 9,
  defaultMinutes = 0,
  editable = false,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<
    { hours: number; minutes: number } | undefined
  >(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleTimeChange = useCallback(
    (hours: number, minutes: number) => {
      const newTime = { hours, minutes };
      setSelectedTime(newTime);
      onChange?.(newTime);
    },
    [onChange]
  );

  const formatTime = useCallback(
    (time: { hours: number; minutes: number } | undefined) => {
      if (!time) return "";
      const hours = String(time.hours).padStart(2, "0");
      const minutes = String(time.minutes).padStart(2, "0");
      return `${hours}:${minutes}`;
    },
    []
  );

  const formattedTime = useMemo(
    () => (selectedTime ? formatTime(selectedTime) : placeholder),
    [selectedTime, formatTime, placeholder]
  );

  const [draft, setDraft] = useState(() => formatTime(value));
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    setSelectedTime(value);
  }, [value]);

  useEffect(() => {
    setDraft(formatTime(selectedTime));
    setValidationMessage(null);
  }, [selectedTime, formatTime]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const digits = toTimeDigits(event.target.value);

      setDraft(formatTimeDigits(digits));
      setValidationMessage(getTimeDigitsError(digits));

      const parsed = parseTimeDigits(digits);

      if (parsed) {
        setSelectedTime(parsed);
        onChange?.(parsed);
      }
    },
    [onChange]
  );

  const handleInputBlur = useCallback(() => {
    // The draft snaps back to the last committed time, so the field no longer
    // shows anything invalid and the message must go with it.
    setDraft(formatTime(selectedTime));
    setValidationMessage(null);
  }, [formatTime, selectedTime]);

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

  const hasError = error || validationMessage !== null;
  const displayedHelperText = validationMessage ?? helperText;

  return (
    <div className={cn("gap-0.5 flex w-full flex-col", wrapperClassName)}>
      {label && (
        <label className="text-sm leading-[22px] text-foreground">
          {label}
        </label>
      )}

      <div ref={containerRef} className="relative">
        {editable ? (
          <div
            className={cn(
              "h-10 bg-white flex w-full items-center overflow-hidden rounded-lg border transition-colors",
              hasError
                ? "border-destructive"
                : "border-input focus-within:border-ring",
              disabled && "cursor-not-allowed bg-muted opacity-50",
              className
            )}
          >
            <div className="gap-3 px-3 py-2 flex flex-1 items-center">
              <input
                type="text"
                inputMode="numeric"
                value={draft}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder={placeholder}
                disabled={disabled}
                className="text-sm min-w-0 font-normal w-full flex-1 border-0 bg-transparent leading-[22px] text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
              />

              <button
                type="button"
                onClick={() => !disabled && setOpen(!open)}
                disabled={disabled}
                aria-label="Buka pilihan waktu"
                className="shrink-0 disabled:cursor-not-allowed"
              >
                <ClockIcon className="size-5 text-primary" />
              </button>
            </div>
          </div>
        ) : (
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
                    selectedTime ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {formattedTime}
                </span>
              </div>
              <div className="gap-2 flex flex-1 items-center justify-end">
                <ClockIcon className="size-5 text-primary" />
              </div>
            </div>
          </button>
        )}

        {open && (
          <div
            ref={popoverRef}
            className={cn(
              "left-0 mt-1 bg-white absolute top-full z-60 flex flex-col items-start overflow-hidden rounded-xl border border-border shadow-[0px_16px_36px_0px_rgba(61,65,81,0.1)]",
              "animate-in fade-in-0 zoom-in-95"
            )}
          >
            <TimePickerPanel
              hours={selectedTime?.hours ?? defaultHours}
              minutes={selectedTime?.minutes ?? defaultMinutes}
              onChange={handleTimeChange}
              className="p-4"
            />
          </div>
        )}
      </div>

      {displayedHelperText && (
        <span
          className={cn(
            "text-xs leading-5",
            hasError ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {displayedHelperText}
        </span>
      )}
    </div>
  );
}
