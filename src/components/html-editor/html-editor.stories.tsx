import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { HtmlEditor } from "./html-editor";

const meta = {
  title: "Components/HtmlEditor",
  component: HtmlEditor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story: React.FC) => (
      <div className="w-[700px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: "text",
      description: "Label above the editor",
    },
    helperText: {
      control: "text",
      description: "Helper text shown below",
    },
    disabled: {
      control: "boolean",
      description: "Disable the editor",
    },
    error: {
      control: "boolean",
      description: "Show error state",
    },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
  args: {
    value: "",
    onChange: () => {},
  },
} satisfies Meta<typeof HtmlEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Content",
    helperText: "",
    disabled: false,
    error: false,
  },
  render: (args) => {
    const [value, setValue] = useState("<p>Start typing here...</p>");
    return <HtmlEditor {...args} value={value} onChange={setValue} />;
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="w-[700px]">
        <HtmlEditor
          label="Email Body"
          helperText="Use {{name}} to insert recipient name"
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const ErrorState: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="w-[700px]">
        <HtmlEditor
          label="Content"
          error
          helperText="This field is required"
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[700px]">
      <HtmlEditor
        label="Content"
        disabled
        helperText="This field is read-only"
        value="<p>This content cannot be edited.</p>"
        onChange={() => undefined}
      />
    </div>
  ),
};

export const WithInitialContent: Story = {
  render: () => {
    const [value, setValue] = useState(
      `<h1>Welcome</h1><p>This is a <strong>rich text</strong> editor with <em>formatting</em> support.</p><ul><li>Bold, italic, underline</li><li>Headings H1–H6</li><li>Lists and alignment</li><li>Links and code blocks</li></ul>`
    );
    return (
      <div className="w-[700px]">
        <HtmlEditor
          label="Notification Template"
          helperText="Supports HTML formatting"
          value={value}
          onChange={setValue}
          minHeight="300px"
        />
      </div>
    );
  },
};
