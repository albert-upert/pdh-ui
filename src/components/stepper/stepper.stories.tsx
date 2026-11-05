import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/button";
import Typography from "@/components/typography/typography";
import { Stepper } from "./stepper";

const meta = {
  title: "Components/Stepper",
  component: Stepper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    steps: [
      { label: "Informasi Dasar" },
      { label: "Konfigurasi Pertanyaan" },
      { label: "Broadcast & Reminder" },
      { label: "Tinjau & Simpan" },
    ],
    currentStep: 0,
  },
  argTypes: {
    currentStep: {
      control: { type: "number", min: 0, max: 5, step: 1 },
      description: "Index step yang sedang aktif (0-indexed)",
    },
    steps: {
      control: false,
      description: "Daftar step yang ditampilkan",
    },
    onStepClick: {
      control: false,
      description:
        "Callback saat step yang sudah completed diklik. Kalau tidak diisi, step tidak bisa diklik sama sekali.",
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps = [
  { label: "Informasi Dasar" },
  { label: "Konfigurasi Pertanyaan" },
  { label: "Broadcast & Reminder" },
  { label: "Tinjau & Simpan" },
];

export const Default: Story = {
  args: { steps: defaultSteps, currentStep: 0 },
  render: (args) => (
    <div className="w-full">
      <Stepper {...args} />
    </div>
  ),
};

// Step Position Variants
export const FirstStepActive: Story = {
  args: { steps: defaultSteps, currentStep: 0 },
  render: (args) => (
    <div className="w-[700px]">
      <Stepper {...args} />
    </div>
  ),
};

export const MiddleStepActive: Story = {
  args: { steps: defaultSteps, currentStep: 1 },
  render: (args) => (
    <div className="w-[700px]">
      <Stepper {...args} />
    </div>
  ),
};

export const ThirdStepActive: Story = {
  args: { steps: defaultSteps, currentStep: 2 },
  render: (args) => (
    <div className="w-[700px]">
      <Stepper {...args} />
    </div>
  ),
};

export const LastStepActive: Story = {
  args: { steps: defaultSteps, currentStep: 3 },
  render: (args) => (
    <div className="w-[700px]">
      <Stepper {...args} />
    </div>
  ),
};

// Step Count Variants
export const TwoSteps: Story = {
  args: {
    steps: [{ label: "Isi Data" }, { label: "Konfirmasi" }],
    currentStep: 0,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Stepper {...args} />
    </div>
  ),
};

export const SixSteps: Story = {
  args: {
    steps: [
      { label: "Informasi Dasar" },
      { label: "Konfigurasi Pertanyaan" },
      { label: "Broadcast & Reminder" },
      { label: "Tinjau & Simpan" },
      { label: "Publikasi" },
      { label: "Selesai" },
    ],
    currentStep: 2,
  },
  render: (args) => (
    <div className="w-[900px]">
      <Stepper {...args} />
    </div>
  ),
};

export const LongLabels: Story = {
  args: {
    steps: [
      { label: "Informasi Dasar Kuesioner yang Sangat Panjang" },
      { label: "Konfigurasi Pertanyaan dan Jawaban" },
      { label: "Tinjau & Simpan" },
    ],
    currentStep: 1,
  },
  render: (args) => (
    <div className="w-[700px]">
      <Stepper {...args} />
    </div>
  ),
};

// Comparison of all step states
export const AllStates: Story = {
  render: () => (
    <div className="gap-8 flex flex-col">
      <div>
        <Typography variant="h6" className="mb-4">
          Stepper States
        </Typography>
        <div className="gap-6 flex flex-col">
          <div>
            <Typography variant="body-small-bold" className="mb-2">
              Step 1 aktif (belum ada yang selesai)
            </Typography>
            <div className="w-[700px]">
              <Stepper steps={defaultSteps} currentStep={0} />
            </div>
          </div>
          <div>
            <Typography variant="body-small-bold" className="mb-2">
              Step 3 aktif (2 step sebelumnya selesai)
            </Typography>
            <div className="w-[700px]">
              <Stepper steps={defaultSteps} currentStep={2} />
            </div>
          </div>
          <div>
            <Typography variant="body-small-bold" className="mb-2">
              Step terakhir aktif (semua sebelumnya selesai)
            </Typography>
            <div className="w-[700px]">
              <Stepper steps={defaultSteps} currentStep={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Clickable — hanya step yang sudah completed yang bisa diklik untuk balik
export const ClickableCompletedSteps: Story = {
  render: function Render() {
    const [currentStep, setCurrentStep] = useState(2);

    return (
      <div className="gap-4 flex flex-col">
        <div className="w-[700px]">
          <Stepper
            steps={defaultSteps}
            currentStep={currentStep}
            onStepClick={(index) => setCurrentStep(index)}
          />
        </div>
        <Typography variant="body-small" className="text-gray-500">
          Klik step 1 atau 2 (yang sudah selesai) untuk kembali ke step
          tersebut. Step 4 (belum tercapai) tidak bisa diklik.
        </Typography>
      </div>
    );
  },
};

// Non-clickable — default behavior kalau onStepClick tidak diisi
export const NonClickable: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 2,
  },
  render: (args) => (
    <div className="gap-4 flex flex-col">
      <div className="w-[700px]">
        <Stepper {...args} />
      </div>
      <Typography variant="body-small" className="text-gray-500">
        Tanpa prop `onStepClick`, semua step (termasuk yang completed) tidak
        bisa diklik — navigasi hanya lewat tombol Selanjutnya/Kembali.
      </Typography>
    </div>
  ),
};

// Real-world usage example — Tambah Kuesioner form dengan konten per step
export const TambahKuesionerExample: Story = {
  render: function Render() {
    const steps = [
      { label: "Informasi Dasar" },
      { label: "Konfigurasi Pertanyaan" },
      { label: "Broadcast & Reminder" },
      { label: "Tinjau & Simpan" },
    ];
    const [currentStep, setCurrentStep] = useState(0);

    const stepContent = [
      <div key="0" className="gap-4 flex flex-col">
        <div>
          <Typography variant="body-small-bold" className="mb-1">
            Nama Kuesioner
          </Typography>
          <input
            className="px-3 py-2 text-sm w-full rounded-md border border-gray-300"
            placeholder="Contoh: Evaluasi RPS Semester Genap 2025"
          />
        </div>
        <div>
          <Typography variant="body-small-bold" className="mb-1">
            Jenis Kuesioner
          </Typography>
          <select className="px-3 py-2 text-sm w-full rounded-md border border-gray-300">
            <option>-Pilih jenis kuesioner-</option>
          </select>
        </div>
      </div>,
      <Typography key="1" variant="body-small" className="text-gray-600">
        Form konfigurasi pertanyaan akan tampil di sini.
      </Typography>,
      <Typography key="2" variant="body-small" className="text-gray-600">
        Pengaturan broadcast & reminder akan tampil di sini.
      </Typography>,
      <Typography key="3" variant="body-small" className="text-gray-600">
        Ringkasan kuesioner untuk ditinjau sebelum disimpan.
      </Typography>,
    ];

    const isLastStep = currentStep === steps.length - 1;

    return (
      <div className="bg-white p-6 w-[700px] rounded-lg border border-gray-200">
        <Typography variant="h6" className="mb-1">
          Tambah Kuesioner
        </Typography>
        <Typography variant="body-small" className="mb-6 text-gray-500">
          Buat kuesioner baru untuk mengumpulkan umpan balik.
        </Typography>

        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={(index) => setCurrentStep(index)}
        />

        <div className="my-6 min-h-32">{stepContent[currentStep]}</div>

        <div className="flex justify-between">
          <Button
            variant="secondary"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          >
            Kembali
          </Button>
          <Button
            disabled={isLastStep}
            onClick={() =>
              setCurrentStep((s) => Math.min(steps.length - 1, s + 1))
            }
          >
            {isLastStep ? "Simpan" : "Selanjutnya"}
          </Button>
        </div>
      </div>
    );
  },
};
