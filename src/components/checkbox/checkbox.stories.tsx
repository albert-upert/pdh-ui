import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";
import type { FormEvent } from "react";
import { Checkbox } from "./checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Checkbox size",
    },
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    disabled: {
      control: "boolean",
      description: "Disable the checkbox",
    },
    onCheckedChange: {
      action: "checkedChange",
      description: "Callback when value changes",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    size: "md",
  },
  render: (args) => (
    <div className="gap-3 flex items-center">
      <Checkbox {...args} />
      <label className="text-sm font-normal text-foreground">
        Default Checkbox
      </label>
    </div>
  ),
};

export const MediumSize: Story = {
  render: () => (
    <div className="gap-4 flex flex-col">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Unchecked (Default)</h4>
        <div className="gap-3 flex items-center">
          <Checkbox size="md" />
          <label className="text-sm font-normal text-foreground">
            Medium Checkbox
          </label>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Checked</h4>
        <div className="gap-3 flex items-center">
          <Checkbox size="md" checked />
          <label className="text-sm font-normal text-foreground">
            Medium Checkbox
          </label>
        </div>
      </div>
    </div>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <div className="gap-4 flex flex-col">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Unchecked (Default)</h4>
        <div className="gap-3 flex items-center">
          <Checkbox size="sm" />
          <label className="text-sm font-normal text-foreground">
            Small Checkbox
          </label>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Checked</h4>
        <div className="gap-3 flex items-center">
          <Checkbox size="sm" checked />
          <label className="text-sm font-normal text-foreground">
            Small Checkbox
          </label>
        </div>
      </div>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div className="gap-3 flex items-center">
      <Checkbox defaultChecked />
      <label className="text-sm font-normal text-foreground">
        Checked Checkbox
      </label>
    </div>
  ),
};

export const Unchecked: Story = {
  render: () => (
    <div className="gap-3 flex items-center">
      <Checkbox />
      <label className="text-sm font-normal text-foreground">
        Unchecked Checkbox
      </label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="gap-4 flex flex-col">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Disabled Unchecked</h4>
        <div className="gap-3 flex items-center">
          <Checkbox disabled />
          <label className="text-sm font-normal text-muted-foreground">
            Disabled Checkbox
          </label>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Disabled Checked</h4>
        <div className="gap-3 flex items-center">
          <Checkbox disabled checked />
          <label className="text-sm font-normal text-muted-foreground">
            Disabled Checked
          </label>
        </div>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="gap-6 flex flex-col">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Medium (16px)</h3>
        <div className="gap-3 flex flex-col">
          <div className="gap-3 flex items-center">
            <Checkbox size="md" />
            <label className="text-sm font-normal text-foreground">
              Unchecked
            </label>
          </div>
          <div className="gap-3 flex items-center">
            <Checkbox size="md" checked />
            <label className="text-sm font-normal text-foreground">
              Checked
            </label>
          </div>
          <div className="gap-3 flex items-center">
            <Checkbox size="md" disabled />
            <label className="text-sm font-normal text-muted-foreground">
              Disabled
            </label>
          </div>
          <div className="gap-3 flex items-center">
            <Checkbox size="md" disabled checked />
            <label className="text-sm font-normal text-muted-foreground">
              Disabled Checked
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Small (14px)</h3>
        <div className="gap-3 flex flex-col">
          <div className="gap-3 flex items-center">
            <Checkbox size="sm" />
            <label className="text-sm font-normal text-foreground">
              Unchecked
            </label>
          </div>
          <div className="gap-3 flex items-center">
            <Checkbox size="sm" checked />
            <label className="text-sm font-normal text-foreground">
              Checked
            </label>
          </div>
          <div className="gap-3 flex items-center">
            <Checkbox size="sm" disabled />
            <label className="text-sm font-normal text-muted-foreground">
              Disabled
            </label>
          </div>
          <div className="gap-3 flex items-center">
            <Checkbox size="sm" disabled checked />
            <label className="text-sm font-normal text-muted-foreground">
              Disabled Checked
            </label>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="gap-6 grid grid-cols-2">
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Default State</h4>
        <div className="gap-3 flex items-center">
          <Checkbox />
          <label className="text-sm font-normal text-foreground">
            Unchecked
          </label>
        </div>
        <div className="gap-3 flex items-center">
          <Checkbox checked />
          <label className="text-sm font-normal text-foreground">Checked</label>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium">Disabled State</h4>
        <div className="gap-3 flex items-center">
          <Checkbox disabled />
          <label className="text-sm font-normal text-muted-foreground">
            Disabled
          </label>
        </div>
        <div className="gap-3 flex items-center">
          <Checkbox disabled checked />
          <label className="text-sm font-normal text-muted-foreground">
            Disabled Checked
          </label>
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="gap-4 flex flex-col">
        <div className="gap-3 flex items-center">
          <Checkbox checked={checked} onCheckedChange={setChecked} />
          <label className="text-sm font-normal text-foreground">
            {checked ? "Checked" : "Unchecked"}
          </label>
        </div>
        <button
          onClick={() => setChecked(!checked)}
          className="px-4 py-2 text-sm text-white rounded-md bg-primary"
        >
          Toggle Checkbox
        </button>
      </div>
    );
  },
};

export const MultipleCheckboxes: Story = {
  render: () => {
    const [options, setOptions] = useState({
      option1: false,
      option2: true,
      option3: false,
      option4: true,
    });

    const handleChange = (key: keyof typeof options) => {
      setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div className="gap-3 flex flex-col">
        <h4 className="text-sm font-medium">Select your preferences</h4>
        <div className="gap-3 flex items-center">
          <Checkbox
            checked={options.option1}
            onCheckedChange={() => handleChange("option1")}
          />
          <label className="text-sm font-normal text-foreground">
            Receive email notifications
          </label>
        </div>
        <div className="gap-3 flex items-center">
          <Checkbox
            checked={options.option2}
            onCheckedChange={() => handleChange("option2")}
          />
          <label className="text-sm font-normal text-foreground">
            Enable two-factor authentication
          </label>
        </div>
        <div className="gap-3 flex items-center">
          <Checkbox
            checked={options.option3}
            onCheckedChange={() => handleChange("option3")}
          />
          <label className="text-sm font-normal text-foreground">
            Subscribe to newsletter
          </label>
        </div>
        <div className="gap-3 flex items-center">
          <Checkbox
            checked={options.option4}
            onCheckedChange={() => handleChange("option4")}
          />
          <label className="text-sm font-normal text-foreground">
            Accept terms and conditions
          </label>
        </div>
      </div>
    );
  },
};

export const RealWorldExample: Story = {
  render: () => {
    const [tasks, setTasks] = useState([
      { id: 1, text: "Complete project proposal", done: false },
      { id: 2, text: "Review pull requests", done: true },
      { id: 3, text: "Update documentation", done: false },
      { id: 4, text: "Prepare presentation slides", done: true },
      { id: 5, text: "Send weekly report", done: false },
    ]);

    const handleTaskChange = (id: number) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, done: !task.done } : task
        )
      );
    };

    const completedCount = tasks.filter((t) => t.done).length;

    return (
      <div className="space-y-4 w-[400px]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Task List</h3>
          <span className="text-sm text-muted-foreground">
            {completedCount} of {tasks.length} completed
          </span>
        </div>

        <div className="gap-3 flex flex-col">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="gap-3 bg-white p-3 flex items-center rounded-lg border border-border"
            >
              <Checkbox
                checked={task.done}
                onCheckedChange={() => handleTaskChange(task.id)}
              />
              <label
                className={`text-sm font-normal flex-1 ${
                  task.done
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                }`}
              >
                {task.text}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      agreeToTerms: false,
      subscribeNewsletter: false,
      enableNotifications: true,
    });

    const handleSubmit = useCallback((event: FormEvent) => {
      event.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    }, []);

    return (
      <div className="w-[400px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preferences</h3>

            <div className="gap-3 flex items-start">
              <Checkbox
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
                }
              />
              <label className="text-sm font-normal text-foreground">
                I agree to the terms and conditions and privacy policy
              </label>
            </div>

            <div className="gap-3 flex items-center">
              <Checkbox
                checked={formData.subscribeNewsletter}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    subscribeNewsletter: checked,
                  }))
                }
              />
              <label className="text-sm font-normal text-foreground">
                Subscribe to our newsletter
              </label>
            </div>

            <div className="gap-3 flex items-center">
              <Checkbox
                checked={formData.enableNotifications}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    enableNotifications: checked,
                  }))
                }
              />
              <label className="text-sm font-normal text-foreground">
                Enable push notifications
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={!formData.agreeToTerms}
            className="px-4 py-2 text-sm text-white w-full rounded-md bg-primary disabled:opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    );
  },
};

export const AllVariations: Story = {
  render: () => (
    <div className="space-y-8 w-[800px]">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">All Checkbox Variations</h3>

        <div className="gap-6 grid grid-cols-4">
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              MD - Unchecked
            </h4>
            <Checkbox size="md" />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              MD - Checked
            </h4>
            <Checkbox size="md" checked />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              MD - Disabled
            </h4>
            <Checkbox size="md" disabled />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              MD - Disabled Checked
            </h4>
            <Checkbox size="md" disabled checked />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              SM - Unchecked
            </h4>
            <Checkbox size="sm" />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              SM - Checked
            </h4>
            <Checkbox size="sm" checked />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              SM - Disabled
            </h4>
            <Checkbox size="sm" disabled />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              SM - Disabled Checked
            </h4>
            <Checkbox size="sm" disabled checked />
          </div>
        </div>
      </div>
    </div>
  ),
};
