import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SearchIcon } from "@/components/icon";
import { Input } from "./input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[345px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: "select",
      options: ["lg", "md", "sm"],
      description: "Input size",
    },
    label: {
      control: "text",
      description: "Label above the input",
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
      description: "Disable the input",
    },
    prefix: {
      control: "text",
      description: "Text prefix inside the input (e.g. 'Rp')",
    },
    suffix: {
      control: "text",
      description: "Text suffix inside the input (e.g. 'Years')",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "HTML input type",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    helperText: "Helper text",
    size: "lg",
    error: false,
    disabled: false,
  },
};

export const LargeSize: Story = {
  render: () => (
    <div className="space-y-4">
      <Input
        size="lg"
        label="Label"
        placeholder="Placeholder"
        helperText="Helper text"
      />
      <Input
        size="lg"
        label="Label"
        placeholder="Placeholder"
        defaultValue="Filled value"
        helperText="Helper text"
      />
    </div>
  ),
};

export const MediumSize: Story = {
  render: () => (
    <div className="space-y-4">
      <Input
        size="md"
        label="Label"
        placeholder="Placeholder"
        helperText="Helper text"
      />
      <Input
        size="md"
        label="Label"
        placeholder="Placeholder"
        defaultValue="Filled value"
        helperText="Helper text"
      />
    </div>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <div className="space-y-4">
      <Input
        size="sm"
        label="Label"
        placeholder="Placeholder"
        helperText="Helper text"
      />
      <Input
        size="sm"
        label="Label"
        placeholder="Placeholder"
        defaultValue="Filled value"
        helperText="Helper text"
      />
    </div>
  ),
};

export const WithClearButton: Story = {
  render: () => {
    const [value, setValue] = useState("Sample text");
    return (
      <Input
        label="Label"
        placeholder="Placeholder"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
        helperText="Click × to clear"
      />
    );
  },
};

export const WithStartIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    helperText: "Helper text",
    size: "lg",
  },
  render: (args) => (
    <Input
      {...args}
      startIcon={<SearchIcon className="size-5 text-muted-foreground" />}
    />
  ),
};

export const WithEndIcon: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    helperText: "Helper text",
    size: "lg",
  },
  render: (args) => (
    <Input
      {...args}
      endIcon={<SearchIcon className="size-5 text-muted-foreground" />}
    />
  ),
};

export const WithPrefix: Story = {
  args: {
    label: "Amount",
    placeholder: "0.00",
    helperText: "Enter amount in Rupiah",
    prefix: "Rp",
    size: "lg",
  },
};

export const WithSuffix: Story = {
  args: {
    label: "Experience",
    placeholder: "0",
    helperText: "Years of experience",
    suffix: "Years",
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    helperText: "Helper text",
    disabled: true,
    size: "lg",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Email",
    placeholder: "name@example.com",
    helperText: "Please enter a valid email",
    error: true,
    size: "lg",
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 w-[800px]">
      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Large</h3>
        <div className="gap-4 grid grid-cols-3">
          <Input size="lg" label="Default" placeholder="Placeholder" />
          <Input
            size="lg"
            label="Filled"
            placeholder="Placeholder"
            defaultValue="User input"
          />
          <Input
            size="lg"
            label="Disabled"
            placeholder="Placeholder"
            disabled
          />
          <Input
            size="lg"
            label="Error Empty"
            placeholder="Placeholder"
            error
            helperText="Error message"
          />
          <Input
            size="lg"
            label="Error Filled"
            placeholder="Placeholder"
            defaultValue="Invalid"
            error
            helperText="Error message"
          />
          <Input size="lg" label="With Prefix" placeholder="0.00" prefix="Rp" />
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Medium</h3>
        <div className="gap-4 grid grid-cols-3">
          <Input size="md" label="Default" placeholder="Placeholder" />
          <Input
            size="md"
            label="Filled"
            placeholder="Placeholder"
            defaultValue="User input"
          />
          <Input
            size="md"
            label="Disabled"
            placeholder="Placeholder"
            disabled
          />
          <Input
            size="md"
            label="Error"
            placeholder="Placeholder"
            error
            helperText="Error message"
          />
          <Input size="md" label="With Suffix" placeholder="0" suffix="Years" />
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Small</h3>
        <div className="gap-4 grid grid-cols-3">
          <Input size="sm" label="Default" placeholder="Placeholder" />
          <Input
            size="sm"
            label="Filled"
            placeholder="Placeholder"
            defaultValue="User input"
          />
          <Input
            size="sm"
            label="Disabled"
            placeholder="Placeholder"
            disabled
          />
        </div>
      </div>
    </div>
  ),
};
