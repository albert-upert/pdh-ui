import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";
import type { FormEvent } from "react";
import { Switch } from "./switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the switch is on",
    },
    disabled: {
      control: "boolean",
      description: "Disable the switch",
    },
    onCheckedChange: {
      action: "checkedChange",
      description: "Callback when value changes",
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
  },
  render: (args) => <Switch {...args} />,
};

export const Checked: Story = {
  render: () => (
    <div className="gap-3 flex items-center">
      <Switch checked />
      <span className="text-sm font-semibold">Aktif</span>
    </div>
  ),
};

export const Unchecked: Story = {
  render: () => (
    <div className="gap-3 flex items-center">
      <Switch />
      <span className="text-sm font-semibold text-muted-foreground">
        Tidak Aktif
      </span>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="gap-3 flex items-center">
      <Switch disabled />
      <span className="text-sm font-semibold text-muted-foreground">
        Tidak Aktif
      </span>
    </div>
  ),
};

export const DisabledChecked: Story = {
  render: () => (
    <div className="gap-3 flex items-center">
      <Switch disabled checked />
      <span className="text-sm font-semibold text-muted-foreground">Aktif</span>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="gap-6 flex flex-col">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Default State</h3>
        <div className="gap-3 flex flex-col">
          <div className="gap-3 flex items-center">
            <Switch />
            <span className="text-sm font-semibold text-muted-foreground">
              Tidak Aktif
            </span>
          </div>
          <div className="gap-3 flex items-center">
            <Switch checked />
            <span className="text-sm font-semibold">Aktif</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Disabled State</h3>
        <div className="gap-3 flex flex-col">
          <div className="gap-3 flex items-center">
            <Switch disabled />
            <span className="text-sm font-semibold text-muted-foreground">
              Tidak Aktif
            </span>
          </div>
          <div className="gap-3 flex items-center">
            <Switch disabled checked />
            <span className="text-sm font-semibold text-muted-foreground">
              Aktif
            </span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <div className="gap-4 flex flex-col">
        <div className="gap-3 flex items-center">
          <Switch checked={checked} onCheckedChange={setChecked} />
          <span className="text-sm font-semibold">
            {checked ? "Aktif" : "Tidak Aktif"}
          </span>
        </div>
        <button
          onClick={() => setChecked(!checked)}
          className="px-4 py-2 text-sm text-white rounded-md bg-primary"
        >
          Toggle Switch
        </button>
      </div>
    );
  },
};

export const MultipleSwitches: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      soundEffects: false,
    });

    const handleChange = (key: keyof typeof settings) => {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div className="gap-4 flex flex-col">
        <h4 className="text-sm font-medium">Application Settings</h4>
        <div className="gap-8 flex items-center justify-between">
          <span className="text-sm font-normal text-foreground">
            Enable Notifications
          </span>
          <div className="gap-3 flex items-center">
            <Switch
              checked={settings.notifications}
              onCheckedChange={() => handleChange("notifications")}
            />
            <span className="w-24 text-sm font-semibold">
              {settings.notifications ? "Aktif" : "Tidak Aktif"}
            </span>
          </div>
        </div>
        <div className="gap-8 flex items-center justify-between">
          <span className="text-sm font-normal text-foreground">Dark Mode</span>
          <div className="gap-3 flex items-center">
            <Switch
              checked={settings.darkMode}
              onCheckedChange={() => handleChange("darkMode")}
            />
            <span className="w-24 text-sm font-semibold">
              {settings.darkMode ? "Aktif" : "Tidak Aktif"}
            </span>
          </div>
        </div>
        <div className="gap-8 flex items-center justify-between">
          <span className="text-sm font-normal text-foreground">Auto Save</span>
          <div className="gap-3 flex items-center">
            <Switch
              checked={settings.autoSave}
              onCheckedChange={() => handleChange("autoSave")}
            />
            <span className="w-24 text-sm font-semibold">
              {settings.autoSave ? "Aktif" : "Tidak Aktif"}
            </span>
          </div>
        </div>
        <div className="gap-8 flex items-center justify-between">
          <span className="text-sm font-normal text-foreground">
            Sound Effects
          </span>
          <div className="gap-3 flex items-center">
            <Switch
              checked={settings.soundEffects}
              onCheckedChange={() => handleChange("soundEffects")}
            />
            <span className="w-24 text-sm font-semibold">
              {settings.soundEffects ? "Aktif" : "Tidak Aktif"}
            </span>
          </div>
        </div>
      </div>
    );
  },
};

export const RealWorldExample: Story = {
  render: () => {
    const [privacySettings, setPrivacySettings] = useState({
      profileVisibility: true,
      showEmail: false,
      allowMessages: true,
      shareActivity: false,
    });

    const handleChange = (key: keyof typeof privacySettings) => {
      setPrivacySettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div className="space-y-6 w-[500px]">
        <h3 className="text-lg font-semibold">Privacy Settings</h3>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-border">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-sm font-medium">Profile Visibility</h4>
                <p className="text-xs text-muted-foreground">
                  Allow others to view your profile
                </p>
              </div>
              <div className="gap-3 flex items-center">
                <Switch
                  checked={privacySettings.profileVisibility}
                  onCheckedChange={() => handleChange("profileVisibility")}
                />
                <span className="w-24 text-sm font-semibold">
                  {privacySettings.profileVisibility ? "Aktif" : "Tidak Aktif"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-border">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-sm font-medium">Show Email Address</h4>
                <p className="text-xs text-muted-foreground">
                  Display your email on your public profile
                </p>
              </div>
              <div className="gap-3 flex items-center">
                <Switch
                  checked={privacySettings.showEmail}
                  onCheckedChange={() => handleChange("showEmail")}
                />
                <span className="w-24 text-sm font-semibold">
                  {privacySettings.showEmail ? "Aktif" : "Tidak Aktif"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-border">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-sm font-medium">Allow Messages</h4>
                <p className="text-xs text-muted-foreground">
                  Let other users send you direct messages
                </p>
              </div>
              <div className="gap-3 flex items-center">
                <Switch
                  checked={privacySettings.allowMessages}
                  onCheckedChange={() => handleChange("allowMessages")}
                />
                <span className="w-24 text-sm font-semibold">
                  {privacySettings.allowMessages ? "Aktif" : "Tidak Aktif"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-border">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-sm font-medium">Share Activity</h4>
                <p className="text-xs text-muted-foreground">
                  Share your activity status with connections
                </p>
              </div>
              <div className="gap-3 flex items-center">
                <Switch
                  checked={privacySettings.shareActivity}
                  onCheckedChange={() => handleChange("shareActivity")}
                />
                <span className="w-24 text-sm font-semibold">
                  {privacySettings.shareActivity ? "Aktif" : "Tidak Aktif"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      emailNotifications: true,
      pushNotifications: false,
      weeklyDigest: true,
    });

    const handleSubmit = useCallback((event: FormEvent) => {
      event.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    }, []);

    return (
      <div className="w-[400px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notification Preferences</h3>

            <div className="flex items-center justify-between">
              <label className="text-sm font-normal text-foreground">
                Email Notifications
              </label>
              <div className="gap-3 flex items-center">
                <Switch
                  checked={formData.emailNotifications}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      emailNotifications: checked,
                    }))
                  }
                />
                <span className="w-24 text-sm font-semibold">
                  {formData.emailNotifications ? "Aktif" : "Tidak Aktif"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-normal text-foreground">
                Push Notifications
              </label>
              <div className="gap-3 flex items-center">
                <Switch
                  checked={formData.pushNotifications}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      pushNotifications: checked,
                    }))
                  }
                />
                <span className="w-24 text-sm font-semibold">
                  {formData.pushNotifications ? "Aktif" : "Tidak Aktif"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-normal text-foreground">
                Weekly Digest
              </label>
              <div className="gap-3 flex items-center">
                <Switch
                  checked={formData.weeklyDigest}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, weeklyDigest: checked }))
                  }
                />
                <span className="w-24 text-sm font-semibold">
                  {formData.weeklyDigest ? "Aktif" : "Tidak Aktif"}
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 text-sm text-white w-full rounded-md bg-primary"
          >
            Save Preferences
          </button>
        </form>
      </div>
    );
  },
};

export const AllVariations: Story = {
  render: () => (
    <div className="space-y-8 w-[600px]">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">All Switch Variations</h3>

        <div className="gap-6 grid grid-cols-2">
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              OFF (Unchecked)
            </h4>
            <div className="gap-3 flex items-center">
              <Switch />
              <span className="text-sm font-semibold text-muted-foreground">
                Tidak Aktif
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              ON (Checked)
            </h4>
            <div className="gap-3 flex items-center">
              <Switch checked />
              <span className="text-sm font-semibold">Aktif</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              OFF - Disabled
            </h4>
            <div className="gap-3 flex items-center">
              <Switch disabled />
              <span className="text-sm font-semibold text-muted-foreground">
                Tidak Aktif
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              ON - Disabled
            </h4>
            <div className="gap-3 flex items-center">
              <Switch disabled checked />
              <span className="text-sm font-semibold text-muted-foreground">
                Aktif
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
