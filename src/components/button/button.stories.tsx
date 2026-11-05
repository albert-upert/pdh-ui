import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRightIcon, DownloadIcon, PlusIcon } from "@/components/icon";
import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "destructive",
        "outline",
        "ghost",
      ],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["lg", "md", "icon", "icon-md"],
      description: "Button size",
    },
    disabled: {
      control: "boolean",
      description: "Disable the button",
    },
    children: {
      control: "text",
      description: "Button label text",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "primary",
    size: "lg",
    disabled: false,
  },
};

// Variant Stories
export const Primary: Story = {
  args: { children: "Button", variant: "primary", size: "lg" },
};

export const Secondary: Story = {
  args: { children: "Button", variant: "secondary", size: "lg" },
};

export const Tertiary: Story = {
  args: { children: "Button", variant: "tertiary", size: "lg" },
};

export const Destructive: Story = {
  args: { children: "Delete", variant: "destructive", size: "lg" },
};

export const Outline: Story = {
  args: { children: "Button", variant: "outline", size: "lg" },
};

export const Ghost: Story = {
  args: { children: "Button", variant: "ghost", size: "lg" },
};

// Size Stories
export const Large: Story = {
  args: { children: "Large Button", size: "lg" },
};

export const Medium: Story = {
  args: { children: "Medium Button", size: "md" },
};

// State Stories
export const Disabled: Story = {
  args: { children: "Disabled", disabled: true, variant: "primary" },
};

export const DisabledSecondary: Story = {
  args: { children: "Disabled", disabled: true, variant: "secondary" },
};

// Icon Button Stories
export const IconButton: Story = {
  args: { size: "icon", variant: "primary", children: undefined },
  render: (args) => (
    <Button {...args}>
      <PlusIcon />
    </Button>
  ),
};

export const IconMedium: Story = {
  args: { size: "icon-md", variant: "outline", children: undefined },
  render: (args) => (
    <Button {...args}>
      <DownloadIcon />
    </Button>
  ),
};

// With Icon Stories
export const WithLeadingIcon: Story = {
  args: { children: "Download", variant: "primary", size: "lg" },
  render: (args) => (
    <Button {...args}>
      <DownloadIcon />
      {args.children}
    </Button>
  ),
};

export const WithTrailingIcon: Story = {
  args: { children: "Continue", variant: "primary", size: "lg" },
  render: (args) => (
    <Button {...args}>
      {args.children}
      <ArrowRightIcon />
    </Button>
  ),
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div className="gap-3 flex flex-wrap">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="gap-3 flex flex-wrap items-center">
      <Button size="lg">Large</Button>
      <Button size="md">Medium</Button>
      <Button size="icon">
        <PlusIcon />
      </Button>
      <Button size="icon-md">
        <PlusIcon />
      </Button>
    </div>
  ),
};
