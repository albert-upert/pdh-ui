import type { Meta, StoryObj } from "@storybook/react";
import type { CalendarEvent } from "./calendar";
import { CalendarSchedule } from "./calendar";

const meta = {
  title: "Components/Calendar",
  component: CalendarSchedule,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultView: {
      control: "select",
      options: ["daily", "weekly", "monthly", "yearly"],
    },
  },
} satisfies Meta<typeof CalendarSchedule>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Sample Events ──────────────────────────────────────────────────

function createDate(dayOffset: number, hour: number, minute: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d;
}

const sampleEvents: Array<CalendarEvent> = [
  {
    id: "1",
    title: "Proyek Multi Disiplin-CS7-2024 [2705]",
    startTime: createDate(0, 10, 0),
    endTime: createDate(0, 11, 40),
  },
  {
    id: "2",
    title: "Pemrograman Berbasis Objek-CS3-2024 [1802]",
    startTime: createDate(0, 13, 0),
    endTime: createDate(0, 14, 40),
  },
  {
    id: "3",
    title: "Basis Data Lanjutan-CS5-2024 [2103]",
    startTime: createDate(0, 15, 0),
    endTime: createDate(0, 16, 40),
  },
  {
    id: "4",
    title: "Struktur Data-CS2-2024 [1501]",
    startTime: createDate(1, 8, 0),
    endTime: createDate(1, 9, 40),
  },
  {
    id: "5",
    title: "Algoritma dan Pemrograman-CS1-2024 [1201]",
    startTime: createDate(1, 10, 0),
    endTime: createDate(1, 11, 40),
  },
  {
    id: "6",
    title: "Kalkulus II-MA2-2024 [0802]",
    startTime: createDate(2, 9, 0),
    endTime: createDate(2, 10, 40),
  },
  {
    id: "7",
    title: "Jaringan Komputer-CS6-2024 [2401]",
    startTime: createDate(2, 13, 0),
    endTime: createDate(2, 14, 40),
  },
  {
    id: "8",
    title: "Sistem Operasi-CS4-2024 [2001]",
    startTime: createDate(3, 8, 0),
    endTime: createDate(3, 9, 40),
  },
  {
    id: "9",
    title: "Rekayasa Perangkat Lunak-CS8-2024 [3001]",
    startTime: createDate(4, 10, 0),
    endTime: createDate(4, 11, 40),
  },
  {
    id: "10",
    title: "Matematika Diskrit-MA3-2024 [0901]",
    startTime: createDate(5, 8, 0),
    endTime: createDate(5, 9, 40),
  },
];

// ── Stories ─────────────────────────────────────────────────────────

export const Daily: Story = {
  args: {
    title: "Jadwal Kuliah Mahasiswa",
    events: sampleEvents,
    defaultView: "daily",
  },
};

export const Weekly: Story = {
  args: {
    title: "Jadwal Kuliah Mahasiswa",
    events: sampleEvents,
    defaultView: "weekly",
  },
};

export const Monthly: Story = {
  args: {
    title: "Jadwal Kuliah Mahasiswa",
    events: sampleEvents,
    defaultView: "monthly",
  },
};

export const Yearly: Story = {
  args: {
    title: "Jadwal Kuliah Mahasiswa",
    events: sampleEvents,
    defaultView: "yearly",
  },
};

export const Empty: Story = {
  args: {
    title: "Jadwal Kuliah Mahasiswa",
    events: [],
    defaultView: "daily",
  },
};

export const WithEventClick: Story = {
  args: {
    title: "Jadwal Kuliah Mahasiswa",
    events: sampleEvents,
    defaultView: "weekly",
    onEventClick: (event: CalendarEvent) => {
      alert(`Event clicked: ${event.title}`);
    },
  },
};
