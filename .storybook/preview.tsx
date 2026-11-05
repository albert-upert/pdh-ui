import type { Decorator, Preview } from "@storybook/react";
import { useEffect } from "react";
import "./storybook.css";

// The brand themes of src/styles.css: data-theme on <html> swaps the brand scale (and primary) of every
// component. "red" is the default and sets no attribute.
const THEMES = [
  { value: "red", title: "Red (default)" },
  { value: "green-pear", title: "Green Pear" },
  { value: "honolulu-blue", title: "Honolulu Blue" },
] as const;

// Platform style (Konsta): data-ui on <html> activates the `ios:` / `material:` variants.
const UI_STYLES = [
  { value: "ios", title: "iOS" },
  { value: "material", title: "Material" },
] as const;

const withUiStyle: Decorator = (Story, context) => {
  const ui = String(context.globals.ui ?? "ios");

  useEffect(() => {
    document.documentElement.setAttribute("data-ui", ui);
  }, [ui]);

  return <Story />;
};

const withTheme: Decorator = (Story, context) => {
  const theme = String(context.globals.theme ?? "red");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "red") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return <Story />;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Brand theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: THEMES.map(({ value, title }) => ({ value, title })),
        dynamicTitle: true,
      },
    },
    ui: {
      description: "Platform style",
      toolbar: {
        title: "Style",
        icon: "mobile",
        items: UI_STYLES.map(({ value, title }) => ({ value, title })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "red",
    ui: "ios",
  },
  decorators: [withTheme, withUiStyle],
};

export default preview;
