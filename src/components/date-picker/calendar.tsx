import { useCallback, useMemo, useState } from "react";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/dropdown";
import {
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@/components/icon";
import { cn } from "@/lib/utils";

interface CalendarProps {
  selected: Date | null;
  onSelect?: (date: Date | null) => void;
  className?: string;
}

const DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function Calendar({ selected, onSelect, className }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(
    selected ? selected.getMonth() : new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    selected ? selected.getFullYear() : new Date().getFullYear()
  );

  const today = useMemo(() => new Date(), []);

  const isToday = useCallback(
    (date: Date) => {
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    },
    [today]
  );

  const isSelected = useCallback(
    (date: Date) => {
      if (!selected) return false;
      return (
        date.getDate() === selected.getDate() &&
        date.getMonth() === selected.getMonth() &&
        date.getFullYear() === selected.getFullYear()
      );
    },
    [selected]
  );

  const getDaysInMonth = useCallback((month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  }, []);

  const getFirstDayOfMonth = useCallback((month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  }, []);

  const handlePreviousMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  }, [currentMonth]);

  const handleNextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  }, [currentMonth]);

  const handleMonthSelect = useCallback((index: number) => {
    setCurrentMonth(index);
  }, []);

  const handleYearSelect = useCallback((year: number) => {
    setCurrentYear(year);
  }, []);

  const handleDateSelect = useCallback(
    (date: Date) => {
      onSelect?.(date);
    },
    [onSelect]
  );

  const yearOptions = useMemo(
    () => Array.from({ length: 11 }, (_, i) => currentYear - 5 + i),
    [currentYear]
  );

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInMonth(
      currentMonth === 0 ? 11 : currentMonth - 1,
      currentMonth === 0 ? currentYear - 1 : currentYear
    );

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <button
          key={`prev-${day}`}
          type="button"
          disabled
          className="size-8 p-2.5 flex items-center justify-center rounded-lg"
        >
          <span className="text-sm font-normal text-center leading-[22px] text-input">
            {day}
          </span>
        </button>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isTodayDate = isToday(date);
      const isSelectedDate = isSelected(date);

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateSelect(date)}
          className={cn(
            "size-8 gap-2.5 p-2.5 relative flex flex-col items-center justify-center rounded-lg transition-colors hover:bg-muted",
            isSelectedDate && "bg-red-400 hover:bg-red-400/90"
          )}
        >
          <span
            className={cn(
              "text-sm font-normal text-center leading-[22px] text-foreground",
              isSelectedDate && "text-primary-foreground"
            )}
          >
            {day}
          </span>
          {isTodayDate && !isSelectedDate && (
            <div className="size-1 absolute bottom-[2px] left-1/2 -translate-x-1/2 rounded-full bg-red-500" />
          )}
        </button>
      );
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push(
        <button
          key={`next-${day}`}
          type="button"
          disabled
          className="size-8 p-2.5 flex items-center justify-center rounded-lg"
        >
          <span className="text-sm font-normal text-center leading-[22px] text-input">
            {day}
          </span>
        </button>
      );
    }

    return days;
  }, [
    currentMonth,
    currentYear,
    getDaysInMonth,
    getFirstDayOfMonth,
    handleDateSelect,
    isSelected,
    isToday,
  ]);

  return (
    <div
      className={cn(
        "gap-4 sm:w-[308px] flex h-auto w-full flex-col",
        className
      )}
    >
      <div className="gap-4 sm:gap-10 flex items-center">
        <div className="gap-7 flex items-center">
          <button
            type="button"
            onClick={handlePreviousMonth}
            className="size-5 flex items-center justify-center transition-opacity hover:opacity-70"
          >
            <CaretLeftIcon className="size-5 text-foreground" />
          </button>
          <Dropdown>
            <DropdownTrigger asChild>
              <button
                type="button"
                className="p-0 h-auto w-[82px] border-none bg-transparent shadow-none hover:opacity-70 focus:ring-0"
              >
                <div className="gap-1 flex items-center">
                  <p className="text-sm font-bold w-[66px] text-center leading-[22px] whitespace-pre-wrap text-foreground">
                    {MONTHS[currentMonth]}
                  </p>
                  <CaretDownIcon className="size-3 text-foreground" />
                </div>
              </button>
            </DropdownTrigger>
            <DropdownContent className="max-h-[200px]">
              {MONTHS.map((month, index) => (
                <DropdownItem
                  key={index}
                  onSelect={() => handleMonthSelect(index)}
                  className={cn(
                    "text-sm font-normal cursor-pointer leading-[22px]",
                    index === currentMonth &&
                      "bg-red-500 text-primary-foreground hover:bg-red-500 hover:text-primary-foreground focus:bg-red-500 focus:text-primary-foreground"
                  )}
                >
                  {month}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
          <button
            type="button"
            onClick={handleNextMonth}
            className="size-5 flex items-center justify-center transition-opacity hover:opacity-70"
          >
            <CaretRightIcon className="size-5 text-foreground" />
          </button>
        </div>
        <Dropdown>
          <DropdownTrigger asChild>
            <button
              type="button"
              className="p-0 h-auto w-auto border-none bg-transparent shadow-none hover:opacity-70 focus:ring-0"
            >
              <div className="gap-1 flex items-center">
                <p className="text-sm font-bold text-center leading-[22px] text-foreground">
                  {currentYear}
                </p>
                <CaretDownIcon className="size-3 text-foreground" />
              </div>
            </button>
          </DropdownTrigger>
          <DropdownContent className="max-h-[200px]">
            {yearOptions.map((year) => (
              <DropdownItem
                key={year}
                onSelect={() => handleYearSelect(year)}
                className={cn(
                  "text-sm font-normal cursor-pointer leading-[22px]",
                  year === currentYear &&
                    "bg-red-500 text-primary-foreground hover:bg-red-500 hover:text-primary-foreground focus:bg-red-500 focus:text-primary-foreground"
                )}
              >
                {year}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
      </div>

      <div className="gap-2 flex flex-col">
        <div className="gap-2 flex w-full">
          {DAYS.map((day) => (
            <div
              key={day}
              className="size-8 p-2.5 flex items-center justify-center bg-background"
            >
              <p className="text-sm font-bold leading-[22px] text-foreground">
                {day}
              </p>
            </div>
          ))}
        </div>

        <div className="gap-2 sm:w-[272px] grid w-full grid-cols-7">
          {calendarDays}
        </div>
      </div>
    </div>
  );
}
