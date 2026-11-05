import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Textarea } from "./textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story: React.FC) => (
      <div className="w-[331px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: "text",
      description: "Label above the textarea",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    helperText: {
      control: "text",
      description: "Helper text shown below",
    },
    error: {
      control: "boolean",
      description: "Show error styling",
    },
    disabled: {
      control: "boolean",
      description: "Disable the textarea",
    },
    showCount: {
      control: "boolean",
      description: "Show character count",
    },
    maxLength: {
      control: "number",
      description: "Maximum character length",
    },
    rows: {
      control: "number",
      description: "Number of visible rows",
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    helperText: "Helper text",
    error: false,
    disabled: false,
    showCount: false,
  },
};

export const WithValue: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    defaultValue:
      "This is some text content that the user has entered into the textarea.",
    helperText: "Helper text",
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: "Message",
    placeholder: "Enter your message...",
    maxLength: 100,
    showCount: true,
    helperText: "Helper text",
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <Textarea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const ErrorState: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    error: true,
    helperText: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    disabled: true,
    helperText: "Helper text",
  },
};

export const WithClearButton: Story = {
  render: () => {
    const [value, setValue] = useState("Existing content that can be cleared");
    return (
      <div className="w-[331px]">
        <Textarea
          label="Notes"
          placeholder="Enter notes..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue("")}
          helperText="Click × to clear"
        />
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <Textarea
        label="Default"
        placeholder="Placeholder"
        helperText="Helper text"
      />
      <Textarea
        label="Filled"
        placeholder="Placeholder"
        defaultValue="User content"
        helperText="Helper text"
      />
      <Textarea
        label="Error"
        placeholder="Placeholder"
        error
        helperText="Error message"
      />
      <Textarea
        label="Disabled"
        placeholder="Placeholder"
        disabled
        helperText="Helper text"
      />
    </div>
  ),
};
