import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CaretDownIcon, CaretUpIcon } from "@/components/icon";
import { cn } from "@/lib/utils";

interface TimePickerPanelProps {
  hours: number;
  minutes: number;
  onChange: (hours: number, minutes: number) => void;
  className?: string;
}

const ITEM_HEIGHT = 44;

function useTimeScroll(initialValue: number, offset: number) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback(
    (value: number) => {
      if (scrollRef.current) {
        const index = Math.max(0, value - offset);
        scrollRef.current.scrollTop = index * ITEM_HEIGHT;
      }
    },
    [offset]
  );

  useEffect(() => {
    scrollTo(initialValue);
  }, [initialValue, scrollTo]);

  return { scrollRef, scrollTo };
}

export function TimePickerPanel({
  hours,
  minutes,
  onChange,
  className,
}: TimePickerPanelProps) {
  const [selectedHour, setSelectedHour] = useState(hours);
  const [selectedMinute, setSelectedMinute] = useState(minutes);

  const { scrollRef: hourScrollRef, scrollTo: scrollToHour } = useTimeScroll(
    selectedHour,
    9
  );
  const { scrollRef: minuteScrollRef, scrollTo: scrollToMinute } =
    useTimeScroll(selectedMinute, 30);

  // Sync with prop changes
  useEffect(() => {
    setSelectedHour(hours);
    setSelectedMinute(minutes);
  }, [hours, minutes]);

  const handleHourChange = useCallback(
    (newHour: number) => {
      setSelectedHour(newHour);
      onChange(newHour, selectedMinute);
    },
    [onChange, selectedMinute]
  );

  const handleMinuteChange = useCallback(
    (newMinute: number) => {
      setSelectedMinute(newMinute);
      onChange(selectedHour, newMinute);
    },
    [onChange, selectedHour]
  );

  const incrementHour = useCallback(() => {
    const newHour = selectedHour === 23 ? 0 : selectedHour + 1;
    handleHourChange(newHour);
    scrollToHour(newHour);
  }, [selectedHour, handleHourChange, scrollToHour]);

  const decrementHour = useCallback(() => {
    const newHour = selectedHour === 0 ? 23 : selectedHour - 1;
    handleHourChange(newHour);
    scrollToHour(newHour);
  }, [selectedHour, handleHourChange, scrollToHour]);

  const incrementMinute = useCallback(() => {
    const newMinute = selectedMinute === 59 ? 0 : selectedMinute + 1;
    handleMinuteChange(newMinute);
    scrollToMinute(newMinute);
  }, [selectedMinute, handleMinuteChange, scrollToMinute]);

  const decrementMinute = useCallback(() => {
    const newMinute = selectedMinute === 0 ? 59 : selectedMinute - 1;
    handleMinuteChange(newMinute);
    scrollToMinute(newMinute);
  }, [selectedMinute, handleMinuteChange, scrollToMinute]);

  const hours24 = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const minutes60 = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

  return (
    <div
      className={cn(
        "gap-2 sm:w-[161px] flex h-[303px] w-full items-center justify-center overflow-hidden bg-background",
        className
      )}
    >
      <div className="gap-2 flex shrink-0 flex-col">
        <button
          type="button"
          onClick={decrementHour}
          className="h-9 w-14 flex items-center justify-center rounded-lg transition-colors hover:bg-muted"
        >
          <CaretUpIcon className="size-5 text-foreground" />
        </button>

        <div
          ref={hourScrollRef}
          className="scrollbar-hide gap-2 flex h-[176px] flex-col overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {hours24.map((hour) => (
            <button
              key={hour}
              type="button"
              onClick={() => handleHourChange(hour)}
              className={cn(
                "h-9 w-14 px-4 py-2 flex shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-muted",
                selectedHour === hour && "bg-red-50"
              )}
            >
              <p
                className={cn(
                  "text-sm font-bold leading-[22px]",
                  selectedHour === hour ? "text-red-500" : "text-foreground"
                )}
              >
                {String(hour).padStart(2, "0")}
              </p>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={incrementHour}
          className="h-9 w-14 flex items-center justify-center rounded-lg transition-colors hover:bg-muted"
        >
          <CaretDownIcon className="size-5 text-foreground" />
        </button>
      </div>

      <div className="px-0 py-2 flex shrink-0 items-center justify-center">
        <p className="text-sm font-bold leading-[22px] text-foreground">:</p>
      </div>

      <div className="gap-2 flex shrink-0 flex-col">
        <button
          type="button"
          onClick={decrementMinute}
          className="h-9 w-14 flex items-center justify-center rounded-lg transition-colors hover:bg-muted"
        >
          <CaretUpIcon className="size-5 text-foreground" />
        </button>

        <div
          ref={minuteScrollRef}
          className="scrollbar-hide gap-2 flex h-[176px] flex-col overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {minutes60.map((minute) => (
            <button
              key={minute}
              type="button"
              onClick={() => handleMinuteChange(minute)}
              className={cn(
                "h-9 w-14 px-4 py-2 flex shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-muted",
                selectedMinute === minute && "bg-red-50"
              )}
            >
              <p
                className={cn(
                  "text-sm font-bold leading-[22px]",
                  selectedMinute === minute ? "text-red-500" : "text-foreground"
                )}
              >
                {String(minute).padStart(2, "0")}
              </p>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={incrementMinute}
          className="h-9 w-14 flex items-center justify-center rounded-lg transition-colors hover:bg-muted"
        >
          <CaretDownIcon className="size-5 text-foreground" />
        </button>
      </div>
    </div>
  );
}
