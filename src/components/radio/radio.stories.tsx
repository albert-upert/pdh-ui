import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";
import type { FormEvent } from "react";
import { Radio, RadioGroup, RadioGroupItem } from "./radio";

const meta = {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Radio button size",
    },
    checked: {
      control: "boolean",
      description: "Whether this radio is selected",
    },
    disabled: {
      control: "boolean",
      description: "Disable the radio button",
    },
    onValueChange: {
      action: "valueChange",
      description: "Callback when selection changes",
    },
  },
} satisfies Meta<typeof Radio>;

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
      <Radio {...args} />
      <label className="text-sm font-normal text-foreground">
        Default Radio
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
          <Radio size="md" />
          <label className="text-sm font-normal text-foreground">
            Medium Radio
          </label>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Checked</h4>
        <div className="gap-3 flex items-center">
          <Radio size="md" checked />
          <label className="text-sm font-normal text-foreground">
            Medium Radio
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
          <Radio size="sm" />
          <label className="text-sm font-normal text-foreground">
            Small Radio
          </label>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Checked</h4>
        <div className="gap-3 flex items-center">
          <Radio size="sm" checked />
          <label className="text-sm font-normal text-foreground">
            Small Radio
          </label>
        </div>
      </div>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div className="gap-3 flex items-center">
      <Radio checked />
      <label className="text-sm font-normal text-foreground">
        Checked Radio
      </label>
    </div>
  ),
};

export const Unchecked: Story = {
  render: () => (
    <div className="gap-3 flex items-center">
      <Radio />
      <label className="text-sm font-normal text-foreground">
        Unchecked Radio
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
          <Radio disabled />
          <label className="text-sm font-normal text-muted-foreground">
            Disabled Radio
          </label>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Disabled Checked</h4>
        <div className="gap-3 flex items-center">
          <Radio disabled checked />
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
            <Radio size="md" />
            <label className="text-sm font-normal text-foreground">
              Unchecked
            </label>
          </div>
          <div className="gap-3 flex items-center">
            <Radio size="md" checked />
            <label className="text-sm font-normal text-foreground">
              Checked
            </label>
          </div>
          <div className="gap-3 flex items-center">
            <Radio size="md" disabled />
            <label className="text-sm font-normal text-muted-foreground">
              Disabled
            </label>
          </div>
          <div className="gap-3 flex items-center">
            <Radio size="md" disabled checked />
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
            <Radio size="sm" />
            <label className="text-sm font-normal text-foreground">
              Unchecked
            </label>
          </div>
          <div className="gap-3 flex items-center">
            <Radio size="sm" checked />
            <label className="text-sm font-normal text-foreground">
              Checked
            </label>
          </div>
          <div className="gap-3 flex items-center">
            <Radio size="sm" disabled />
            <label className="text-sm font-normal text-muted-foreground">
              Disabled
            </label>
          </div>
          <div className="gap-3 flex items-center">
            <Radio size="sm" disabled checked />
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
          <Radio />
          <label className="text-sm font-normal text-foreground">
            Unchecked
          </label>
        </div>
        <div className="gap-3 flex items-center">
          <Radio checked />
          <label className="text-sm font-normal text-foreground">Checked</label>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium">Disabled State</h4>
        <div className="gap-3 flex items-center">
          <Radio disabled />
          <label className="text-sm font-normal text-muted-foreground">
            Disabled
          </label>
        </div>
        <div className="gap-3 flex items-center">
          <Radio disabled checked />
          <label className="text-sm font-normal text-muted-foreground">
            Disabled Checked
          </label>
        </div>
      </div>
    </div>
  ),
};

export const RadioGroupExample: Story = {
  render: () => {
    const [value, setValue] = useState("option1");
    return (
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Select an option</h4>
        <RadioGroup value={value} onValueChange={setValue}>
          <RadioGroupItem value="option1" label="Option 1" />
          <RadioGroupItem value="option2" label="Option 2" />
          <RadioGroupItem value="option3" label="Option 3" />
        </RadioGroup>
        <p className="text-sm text-muted-foreground">
          Selected: <strong>{value}</strong>
        </p>
      </div>
    );
  },
};

export const RadioGroupSmallSize: Story = {
  render: () => {
    const [value, setValue] = useState("small1");
    return (
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Select size (Small)</h4>
        <RadioGroup value={value} onValueChange={setValue}>
          <RadioGroupItem value="small1" label="Small Option 1" size="sm" />
          <RadioGroupItem value="small2" label="Small Option 2" size="sm" />
          <RadioGroupItem value="small3" label="Small Option 3" size="sm" />
        </RadioGroup>
      </div>
    );
  },
};

export const RadioGroupDisabled: Story = {
  render: () => {
    const [value, setValue] = useState("disabled1");
    return (
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Disabled Group</h4>
        <RadioGroup value={value} onValueChange={setValue} disabled>
          <RadioGroupItem value="disabled1" label="Disabled Option 1" />
          <RadioGroupItem value="disabled2" label="Disabled Option 2" />
          <RadioGroupItem value="disabled3" label="Disabled Option 3" />
        </RadioGroup>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState("option1");
    const options = ["option1", "option2", "option3"];

    return (
      <div className="gap-4 flex flex-col">
        <RadioGroup value={selected} onValueChange={setSelected}>
          <RadioGroupItem value="option1" label="Option 1" />
          <RadioGroupItem value="option2" label="Option 2" />
          <RadioGroupItem value="option3" label="Option 3" />
        </RadioGroup>

        <div className="gap-2 flex">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className="px-4 py-2 text-sm text-white rounded-md bg-primary"
            >
              Select {option}
            </button>
          ))}
        </div>
      </div>
    );
  },
};

export const RealWorldExample: Story = {
  render: () => {
    const [paymentMethod, setPaymentMethod] = useState("credit-card");

    return (
      <div className="space-y-6 w-[400px]">
        <h3 className="text-lg font-semibold">Payment Method</h3>

        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
          <div className="gap-3 flex flex-col">
            <div className="bg-white p-4 rounded-lg border border-border">
              <RadioGroupItem
                value="credit-card"
                label="Credit Card"
                size="md"
              />
              <p className="mt-1 ml-7 text-xs text-muted-foreground">
                Pay with Visa, Mastercard, or American Express
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-border">
              <RadioGroupItem value="bank-transfer" label="Bank Transfer" />
              <p className="mt-1 ml-7 text-xs text-muted-foreground">
                Transfer directly from your bank account
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-border">
              <RadioGroupItem value="e-wallet" label="E-Wallet" />
              <p className="mt-1 ml-7 text-xs text-muted-foreground">
                Pay using GoPay, OVO, or Dana
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-border">
              <RadioGroupItem value="cash" label="Cash on Delivery" />
              <p className="mt-1 ml-7 text-xs text-muted-foreground">
                Pay when you receive your order
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      shippingMethod: "standard",
      contactPreference: "email",
    });

    const handleSubmit = useCallback((event: FormEvent) => {
      event.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    }, []);

    return (
      <div className="w-[400px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Shipping Method</h4>
            <RadioGroup
              value={formData.shippingMethod}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, shippingMethod: value }))
              }
            >
              <RadioGroupItem value="standard" label="Standard (3-5 days)" />
              <RadioGroupItem value="express" label="Express (1-2 days)" />
              <RadioGroupItem value="overnight" label="Overnight" />
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Contact Preference</h4>
            <RadioGroup
              value={formData.contactPreference}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, contactPreference: value }))
              }
            >
              <RadioGroupItem value="email" label="Email" />
              <RadioGroupItem value="phone" label="Phone" />
              <RadioGroupItem value="sms" label="SMS" />
            </RadioGroup>
          </div>

          <button
            type="submit"
            className="px-4 py-2 text-sm text-white w-full rounded-md bg-primary"
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
        <h3 className="text-lg font-semibold">All Radio Variations</h3>

        <div className="gap-6 grid grid-cols-4">
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              MD - Unchecked
            </h4>
            <Radio size="md" />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              MD - Checked
            </h4>
            <Radio size="md" checked />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              MD - Disabled
            </h4>
            <Radio size="md" disabled />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              MD - Disabled Checked
            </h4>
            <Radio size="md" disabled checked />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              SM - Unchecked
            </h4>
            <Radio size="sm" />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              SM - Checked
            </h4>
            <Radio size="sm" checked />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              SM - Disabled
            </h4>
            <Radio size="sm" disabled />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              SM - Disabled Checked
            </h4>
            <Radio size="sm" disabled checked />
          </div>
        </div>
      </div>
    </div>
  ),
};
