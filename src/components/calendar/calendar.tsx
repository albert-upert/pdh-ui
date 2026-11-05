import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/dropdown";
import {
  CaretDownIcon,
  CircleChevronLeftIcon,
  CircleChevronRightIcon,
  SearchIcon,
  TimerIcon,
} from "@/components/icon";
import { Input } from "@/components/input";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  color?: string;
}

export type CalendarView = "daily" | "weekly" | "monthly" | "yearly";

export interface CalendarScheduleProps {
  title?: string;
  events?: Array<CalendarEvent>;
  defaultView?: CalendarView;
  defaultDate?: Date;
  onViewChange?: (view: CalendarView) => void;
  onDateChange?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  searchPlaceholder?: string;
  className?: string;
}

// ── Constants ──────────────────────────────────────────────────────

const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const DAYS_SHORT = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
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

const VIEW_LABELS: Record<CalendarView, string> = {
  daily: "Perhari",
  weekly: "Perminggu",
  monthly: "Perbulan",
  yearly: "Pertahun",
};

const TODAY_LABELS: Record<CalendarView, string> = {
  daily: "Hari Ini",
  weekly: "Minggu Ini",
  monthly: "Bulan Ini",
  yearly: "Tahun Ini",
};

const HOURS = Array.from({ length: 12 }, (_, i) => i + 7);

// ── Helpers ────────────────────────────────────────────────────────

function formatTime(date: Date): string {
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${h}.${m}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month: number, year: number): number {
  return new Date(year, month, 1).getDay();
}

// ── CalendarEventCard ──────────────────────────────────────────────

function CalendarEventCard({
  event,
  onClick,
  className,
}: {
  event: CalendarEvent;
  onClick?: (event: CalendarEvent) => void;
  className?: string;
}) {
  // White suits a caller's own event colour; the default brand colour takes the theme's foreground.
  const eventText = event.color ? "text-white" : "text-primary-foreground";

  return (
    <button
      type="button"
      data-slot="calendar-event-card"
      onClick={() => onClick?.(event)}
      className={cn(
        "gap-1.5 p-2 flex w-full flex-col items-start rounded-lg text-left shadow-[0px_4px_8px_0px_rgba(61,65,81,0.2)]",
        className
      )}
      style={{ backgroundColor: event.color ?? "var(--red-400)" }}
    >
      <p
        className={cn("font-bold w-full text-[10px] leading-[12px]", eventText)}
      >
        {event.title}
      </p>
      <div className={cn("gap-1 flex items-center", eventText)}>
        <TimerIcon className="size-3" />
        <span className="font-normal text-[10px] leading-[12px]">
          {formatTime(event.startTime)} - {formatTime(event.endTime)}
        </span>
      </div>
    </button>
  );
}

// ── CalendarHeader ─────────────────────────────────────────────────

function CalendarHeader({
  title,
  view,
  currentDate,
  searchValue,
  searchPlaceholder,
  onViewChange,
  onTodayClick,
  onPrev,
  onNext,
  onSearchChange,
}: {
  title: string;
  view: CalendarView;
  currentDate: Date;
  searchValue: string;
  searchPlaceholder: string;
  onViewChange: (view: CalendarView) => void;
  onTodayClick: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSearchChange: (value: string) => void;
}) {
  const dateLabel = useMemo(() => {
    if (view === "yearly") {
      return String(currentDate.getFullYear());
    }
    return `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  }, [view, currentDate]);

  return (
    <div
      data-slot="calendar-header"
      className="gap-5 from-white p-5 flex items-center rounded-t-xl border border-border bg-gradient-to-r to-[var(--red-50)]"
    >
      <p className="text-base font-bold w-[215px] leading-[24px] text-foreground">
        {title}
      </p>

      <div className="gap-5 flex items-center">
        <Button variant="secondary" size="lg" onClick={onTodayClick}>
          {TODAY_LABELS[view]}
        </Button>

        <div className="w-16 gap-5 flex items-center justify-center">
          <button
            type="button"
            onClick={onPrev}
            className="transition-opacity hover:opacity-70"
          >
            <CircleChevronLeftIcon className="size-5" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="transition-opacity hover:opacity-70"
          >
            <CircleChevronRightIcon className="size-5" />
          </button>
        </div>

        <span className="text-sm font-normal leading-[22px] text-foreground">
          {dateLabel}
        </span>
      </div>

      <div className="gap-5 ml-auto flex items-center">
        <Input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onClear={searchValue ? () => onSearchChange("") : undefined}
          placeholder={searchPlaceholder}
          endIcon={<SearchIcon />}
          size="lg"
          wrapperClassName="w-[345px]"
        />

        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="secondary" size="lg">
              {VIEW_LABELS[view]}
              <CaretDownIcon className="size-4" />
            </Button>
          </DropdownTrigger>
          <DropdownContent>
            {(Object.entries(VIEW_LABELS) as Array<[CalendarView, string]>).map(
              ([key, label]) => (
                <DropdownItem
                  key={key}
                  onSelect={() => onViewChange(key)}
                  className={cn(
                    key === view && "font-bold bg-[var(--red-50)] text-primary"
                  )}
                >
                  {label}
                </DropdownItem>
              )
            )}
          </DropdownContent>
        </Dropdown>
      </div>
    </div>
  );
}

// ── CalendarDailyView ──────────────────────────────────────────────

function CalendarDailyView({
  currentDate,
  events,
  onEventClick,
}: {
  currentDate: Date;
  events: Array<CalendarEvent>;
  onEventClick?: (event: CalendarEvent) => void;
}) {
  const today = useMemo(() => new Date(), []);
  const isCurrentDay = useMemo(
    () => isSameDay(currentDate, today),
    [currentDate, today]
  );

  const dayEvents = useMemo(
    () => events.filter((e) => isSameDay(e.startTime, currentDate)),
    [events, currentDate]
  );

  const dayName = DAYS[currentDate.getDay()];
  const dayNumber = currentDate.getDate();

  return (
    <div
      data-slot="calendar-daily-view"
      className="bg-white flex overflow-hidden rounded-b-xl border border-t-0 border-border"
    >
      {/* Time column */}
      <div className="flex w-[100px] shrink-0 flex-col border-r border-border bg-[var(--gray-200)]">
        <div className="h-16 px-3 flex items-center justify-center border-b border-border">
          <span className="text-sm font-normal leading-[22px] text-foreground">
            GMT +7
          </span>
        </div>
        {HOURS.map((hour) => (
          <div key={hour} className="flex flex-col">
            <div className="h-[22px] border-b border-border" />
            <div className="px-3 flex h-[22px] items-center justify-center border-b border-border">
              <span className="text-sm font-bold leading-[22px] text-foreground">
                {String(hour).padStart(2, "0")}:00
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Day column */}
      <div className="relative flex flex-1 flex-col">
        <div
          className={cn(
            "h-16 p-3 flex flex-col items-center justify-center border-b border-border",
            isCurrentDay ? "bg-[var(--red-50)]" : "bg-white"
          )}
        >
          <span className="text-xs font-normal leading-[20px] text-foreground">
            {dayName}
          </span>
          <span className="text-sm font-bold leading-[22px] text-foreground">
            {dayNumber}
          </span>
        </div>
        {HOURS.map((hour) => (
          <div key={hour} className="flex flex-col">
            <div className="h-[22px] border-b border-border" />
            <div className="h-[22px] border-b border-border" />
          </div>
        ))}

        {/* Events overlay */}
        {dayEvents.map((event) => {
          const startHour =
            event.startTime.getHours() + event.startTime.getMinutes() / 60;
          const endHour =
            event.endTime.getHours() + event.endTime.getMinutes() / 60;
          const top = 64 + (startHour - 7) * 44;
          const height = (endHour - startHour) * 44;

          return (
            <div
              key={event.id}
              className="left-1 right-1 absolute"
              style={{ top: `${top}px`, height: `${height}px` }}
            >
              <CalendarEventCard
                event={event}
                onClick={onEventClick}
                className="h-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── CalendarWeeklyView ─────────────────────────────────────────────

function CalendarWeeklyView({
  currentDate,
  events,
  onEventClick,
}: {
  currentDate: Date;
  events: Array<CalendarEvent>;
  onEventClick?: (event: CalendarEvent) => void;
}) {
  const today = useMemo(() => new Date(), []);
  const weekStart = useMemo(() => getWeekStart(currentDate), [currentDate]);

  const weekDays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const d = new Date(weekStart);
        d.setDate(d.getDate() + i);
        return d;
      }),
    [weekStart]
  );

  return (
    <div
      data-slot="calendar-weekly-view"
      className="bg-white flex overflow-hidden rounded-b-xl border border-t-0 border-border"
    >
      {/* Time column */}
      <div className="flex w-[100px] shrink-0 flex-col border-r border-border bg-[var(--gray-200)]">
        <div className="h-16 px-3 flex items-center justify-center border-b border-border">
          <span className="text-sm font-normal leading-[22px] text-foreground">
            GMT +7
          </span>
        </div>
        {HOURS.map((hour) => (
          <div key={hour} className="flex flex-col">
            <div className="h-[22px] border-b border-border" />
            <div className="px-3 flex h-[22px] items-center justify-center border-b border-border">
              <span className="text-sm font-bold leading-[22px] text-foreground">
                {String(hour).padStart(2, "0")}:00
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Day columns */}
      {weekDays.map((day, i) => {
        const isToday = isSameDay(day, today);
        const dayEvents = events.filter((e) => isSameDay(e.startTime, day));

        return (
          <div
            key={i}
            className="relative flex flex-1 flex-col border-r border-border last:border-r-0"
          >
            <div
              className={cn(
                "h-16 p-3 flex flex-col items-center justify-center border-b border-border",
                isToday ? "bg-[var(--red-50)]" : "bg-white"
              )}
            >
              <span className="text-xs font-normal leading-[20px] text-foreground">
                {DAYS[day.getDay()]}
              </span>
              <span className="text-sm font-bold leading-[22px] text-foreground">
                {day.getDate()}
              </span>
            </div>
            {HOURS.map((hour) => (
              <div key={hour} className="flex flex-col">
                <div className="h-[22px] border-b border-border" />
                <div className="h-[22px] border-b border-border" />
              </div>
            ))}

            {/* Events overlay */}
            {dayEvents.map((event) => {
              const startHour =
                event.startTime.getHours() + event.startTime.getMinutes() / 60;
              const endHour =
                event.endTime.getHours() + event.endTime.getMinutes() / 60;
              const top = 64 + (startHour - 7) * 44;
              const height = (endHour - startHour) * 44;

              return (
                <div
                  key={event.id}
                  className="left-0.5 right-0.5 absolute"
                  style={{ top: `${top}px`, height: `${height}px` }}
                >
                  <CalendarEventCard
                    event={event}
                    onClick={onEventClick}
                    className="h-full"
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// ── CalendarMonthlyView ────────────────────────────────────────────

function CalendarMonthlyView({
  currentDate,
  events,
  onEventClick,
}: {
  currentDate: Date;
  events: Array<CalendarEvent>;
  onEventClick?: (event: CalendarEvent) => void;
}) {
  const today = useMemo(() => new Date(), []);
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const calendarWeeks = useMemo(() => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const daysInPrevMonth = getDaysInMonth(
      month === 0 ? 11 : month - 1,
      month === 0 ? year - 1 : year
    );

    const cells: Array<{ date: Date; isCurrentMonth: boolean }> = [];

    // Previous month fill
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      cells.push({
        date: new Date(
          month === 0 ? year - 1 : year,
          month === 0 ? 11 : month - 1,
          day
        ),
        isCurrentMonth: false,
      });
    }

    // Current month
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
      });
    }

    // Next month fill
    const remaining = 42 - cells.length;
    for (let day = 1; day <= remaining; day++) {
      cells.push({
        date: new Date(
          month === 11 ? year + 1 : year,
          month === 11 ? 0 : month + 1,
          day
        ),
        isCurrentMonth: false,
      });
    }

    // Group into weeks
    const weeks: Array<typeof cells> = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }

    return weeks;
  }, [month, year]);

  return (
    <div
      data-slot="calendar-monthly-view"
      className="bg-white overflow-hidden rounded-b-xl border border-t-0 border-border"
    >
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-border">
        {DAYS.map((day) => (
          <div
            key={day}
            className="p-3 flex items-center justify-center border-r border-border last:border-r-0"
          >
            <span className="text-xs font-bold leading-[20px] text-foreground">
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Weeks */}
      {calendarWeeks.map((week, wi) => (
        <div
          key={wi}
          className="grid min-h-[120px] grid-cols-7 border-b border-border last:border-b-0"
        >
          {week.map((cell, di) => {
            const isToday = isSameDay(cell.date, today);
            const dayEvents = events.filter((e) =>
              isSameDay(e.startTime, cell.date)
            );

            return (
              <div
                key={di}
                className={cn(
                  "p-2 flex flex-col border-r border-border last:border-r-0",
                  !cell.isCurrentMonth && "bg-[var(--gray-200)]"
                )}
              >
                <span
                  className={cn(
                    "mb-1 text-sm font-normal leading-[22px]",
                    !cell.isCurrentMonth
                      ? "text-[var(--gray-500)]"
                      : "text-foreground",
                    isToday &&
                      "size-6 inline-flex items-center justify-center rounded-full bg-[var(--red-400)] text-primary-foreground"
                  )}
                >
                  {cell.date.getDate()}
                </span>
                <div className="gap-1 flex flex-col">
                  {dayEvents.slice(0, 3).map((event) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => onEventClick?.(event)}
                      className="gap-1 rounded px-1 py-0.5 flex items-center truncate text-left transition-colors hover:bg-[var(--red-50)]"
                    >
                      <div
                        className="size-1.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor: event.color ?? "var(--red-400)",
                        }}
                      />
                      <span className="font-normal truncate text-[10px] leading-[12px] text-foreground">
                        {event.title}
                      </span>
                    </button>
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="px-1 font-normal text-[10px] leading-[12px] text-[var(--gray-600)]">
                      +{dayEvents.length - 3} lainnya
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ── CalendarYearlyView ─────────────────────────────────────────────

function MiniCalendar({
  month,
  year,
  events,
}: {
  month: number;
  year: number;
  events: Array<CalendarEvent>;
}) {
  const today = useMemo(() => new Date(), []);

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const daysInPrevMonth = getDaysInMonth(
      month === 0 ? 11 : month - 1,
      month === 0 ? year - 1 : year
    );

    const days: Array<{
      day: number;
      isCurrentMonth: boolean;
      date: Date;
    }> = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      days.push({
        day: d,
        isCurrentMonth: false,
        date: new Date(
          month === 0 ? year - 1 : year,
          month === 0 ? 11 : month - 1,
          d
        ),
      });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push({
        day: d,
        isCurrentMonth: true,
        date: new Date(year, month, d),
      });
    }

    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      days.push({
        day: d,
        isCurrentMonth: false,
        date: new Date(
          month === 11 ? year + 1 : year,
          month === 11 ? 0 : month + 1,
          d
        ),
      });
    }

    return days;
  }, [month, year]);

  return (
    <div className="gap-1 flex flex-col">
      <p className="text-xs font-bold leading-[20px] text-foreground">
        {MONTHS[month]}
      </p>
      <div className="gap-0 grid grid-cols-7">
        {DAYS_SHORT.map((d) => (
          <div key={d} className="size-6 flex items-center justify-center">
            <span className="font-bold text-[10px] leading-[12px] text-foreground">
              {d}
            </span>
          </div>
        ))}
        {calendarDays.map((cell, i) => {
          const isToday = isSameDay(cell.date, today);
          const hasEvent = events.some((e) =>
            isSameDay(e.startTime, cell.date)
          );

          return (
            <div
              key={i}
              className={cn(
                "size-6 flex items-center justify-center",
                isToday && "rounded-full bg-[var(--red-400)]"
              )}
            >
              <span
                className={cn(
                  "font-normal text-[10px] leading-[12px]",
                  !cell.isCurrentMonth
                    ? "text-[var(--gray-400)]"
                    : isToday
                      ? "font-bold text-primary-foreground"
                      : hasEvent
                        ? "font-bold text-[var(--red-400)]"
                        : "text-foreground"
                )}
              >
                {cell.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalendarYearlyView({
  currentDate,
  events,
}: {
  currentDate: Date;
  events: Array<CalendarEvent>;
}) {
  const year = currentDate.getFullYear();

  return (
    <div
      data-slot="calendar-yearly-view"
      className="gap-8 bg-white p-6 grid grid-cols-3 overflow-hidden rounded-b-xl border border-t-0 border-border"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <MiniCalendar key={i} month={i} year={year} events={events} />
      ))}
    </div>
  );
}

// ── CalendarSchedule (Main) ────────────────────────────────────────

export function CalendarSchedule({
  title = "Jadwal Kuliah Mahasiswa",
  events = [],
  defaultView = "daily",
  defaultDate,
  onViewChange,
  onDateChange,
  onEventClick,
  searchPlaceholder = "Placeholder",
  className,
}: CalendarScheduleProps) {
  const [view, setView] = useState<CalendarView>(defaultView);
  const [currentDate, setCurrentDate] = useState<Date>(
    defaultDate ?? new Date()
  );
  const [searchValue, setSearchValue] = useState("");

  const filteredEvents = useMemo(() => {
    if (!searchValue.trim()) return events;
    const lower = searchValue.toLowerCase();
    return events.filter((e) => e.title.toLowerCase().includes(lower));
  }, [events, searchValue]);

  const handleViewChange = useCallback(
    (newView: CalendarView) => {
      setView(newView);
      onViewChange?.(newView);
    },
    [onViewChange]
  );

  const handleDateChange = useCallback(
    (date: Date) => {
      setCurrentDate(date);
      onDateChange?.(date);
    },
    [onDateChange]
  );

  const handleTodayClick = useCallback(() => {
    handleDateChange(new Date());
  }, [handleDateChange]);

  const handlePrev = useCallback(() => {
    const d = new Date(currentDate);
    if (view === "daily") {
      d.setDate(d.getDate() - 1);
    } else if (view === "weekly") {
      d.setDate(d.getDate() - 7);
    } else if (view === "monthly") {
      d.setMonth(d.getMonth() - 1);
    } else {
      d.setFullYear(d.getFullYear() - 1);
    }
    handleDateChange(d);
  }, [currentDate, view, handleDateChange]);

  const handleNext = useCallback(() => {
    const d = new Date(currentDate);
    if (view === "daily") {
      d.setDate(d.getDate() + 1);
    } else if (view === "weekly") {
      d.setDate(d.getDate() + 7);
    } else if (view === "monthly") {
      d.setMonth(d.getMonth() + 1);
    } else {
      d.setFullYear(d.getFullYear() + 1);
    }
    handleDateChange(d);
  }, [currentDate, view, handleDateChange]);

  return (
    <div data-slot="calendar-schedule" className={cn("w-full", className)}>
      <CalendarHeader
        title={title}
        view={view}
        currentDate={currentDate}
        searchValue={searchValue}
        searchPlaceholder={searchPlaceholder}
        onViewChange={handleViewChange}
        onTodayClick={handleTodayClick}
        onPrev={handlePrev}
        onNext={handleNext}
        onSearchChange={setSearchValue}
      />

      {view === "daily" && (
        <CalendarDailyView
          currentDate={currentDate}
          events={filteredEvents}
          onEventClick={onEventClick}
        />
      )}
      {view === "weekly" && (
        <CalendarWeeklyView
          currentDate={currentDate}
          events={filteredEvents}
          onEventClick={onEventClick}
        />
      )}
      {view === "monthly" && (
        <CalendarMonthlyView
          currentDate={currentDate}
          events={filteredEvents}
          onEventClick={onEventClick}
        />
      )}
      {view === "yearly" && (
        <CalendarYearlyView currentDate={currentDate} events={filteredEvents} />
      )}
    </div>
  );
}
