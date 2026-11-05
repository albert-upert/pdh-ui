import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";

import { Button } from "@/components/button";
import { SignaturePad, type SignaturePadRef } from "./signature-pad";

const meta = {
  title: "Components/SignaturePad",
  component: SignaturePad,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    penColor: {
      control: "color",
      description: "Stroke color of the signature",
    },
    width: {
      control: "number",
      description: "Canvas width in pixels",
    },
    height: {
      control: "number",
      description: "Canvas height in pixels",
    },
    disabled: {
      control: "boolean",
      description: "Disable drawing on the canvas",
    },
    className: {
      control: false,
    },
  },
} satisfies Meta<typeof SignaturePad>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 400,
    height: 200,
    penColor: "#000000",
    disabled: false,
  },
};

// Pen Color Stories
export const BlackPen: Story = {
  args: { width: 400, height: 200, penColor: "#000000" },
};

export const BluePen: Story = {
  args: { width: 400, height: 200, penColor: "#2563eb" },
};

// Size Stories
export const Large: Story = {
  args: { width: 500, height: 250, penColor: "#000000" },
};

export const Compact: Story = {
  args: { width: 280, height: 140, penColor: "#000000" },
};

// State Stories
export const Disabled: Story = {
  args: { width: 400, height: 200, disabled: true },
};

// Interactive Stories
export const WithControls: Story = {
  args: {
    width: 400,
    height: 200,
    penColor: "#000000",
  },
  render: (args) => {
    const sigRef = useRef<SignaturePadRef>(null);
    const [preview, setPreview] = useState<string | null>(null);

    return (
      <div className="gap-3 flex flex-col">
        <SignaturePad ref={sigRef} {...args} />
        <div className="gap-3 flex">
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              sigRef.current?.clear();
              setPreview(null);
            }}
          >
            Clear
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => setPreview(sigRef.current?.getSignature() ?? null)}
          >
            Get Signature
          </Button>
        </div>
        {preview && (
          <img
            src={preview}
            alt="Signature preview"
            className="w-100 rounded-md border"
          />
        )}
      </div>
    );
  },
};

// All Pen Colors Showcase
export const AllPenColors: Story = {
  render: () => (
    <div className="gap-4 flex flex-wrap">
      <SignaturePad width={200} height={120} penColor="#000000" />
      <SignaturePad width={200} height={120} penColor="#2563eb" />
      <SignaturePad width={200} height={120} penColor="#dc2626" />
    </div>
  ),
};

export const DisabledVsEnabled: Story = {
  render: () => (
    <div className="gap-4 flex flex-wrap items-center">
      <SignaturePad width={200} height={120} />
      <SignaturePad width={200} height={120} disabled />
    </div>
  ),
};
