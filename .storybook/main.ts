import path from "path";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    // Remove library mode settings that conflict with Storybook dev server
    if (config.build) {
      delete config.build.lib;
      delete config.build.rollupOptions;
    }

    // Resolve tw-animate-css to its CSS file directly
    // (the package only exports under the "style" condition which Vite doesn't support)
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "tw-animate-css": path.resolve(
        __dirname,
        "../node_modules/tw-animate-css/dist/tw-animate.css"
      ),
    };

    // Vite 7 sets Cross-Origin-Opener-Policy: same-origin by default, which nullifies
    // event.source in postMessages from the preview iframe — breaking Storybook's
    // channel source verification and flooding the console with "unable to determine
    // the source of the event" errors.
    config.server = {
      ...config.server,
      headers: {
        ...config.server?.headers,
        "Cross-Origin-Opener-Policy": "unsafe-none",
      },
    };

    return config;
  },
};
export default config;
