import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import viteTsConfigPaths from "vite-tsconfig-paths";

const componentEntries: Record<string, string> = {
  // Main barrel export
  index: resolve(__dirname, "src/components/index.ts"),
  // Utility exports
  "lib/utils": resolve(__dirname, "src/lib/utils.ts"),
  // Individual component entry points
  "accordion/index": resolve(__dirname, "src/components/accordion/index.ts"),
  "breadcrumb/index": resolve(__dirname, "src/components/breadcrumb/index.ts"),
  "button/index": resolve(__dirname, "src/components/button/index.ts"),
  "calendar/index": resolve(__dirname, "src/components/calendar/index.ts"),
  "callout/index": resolve(__dirname, "src/components/callout/index.ts"),
  "card/index": resolve(__dirname, "src/components/card/index.ts"),
  "chart/index": resolve(__dirname, "src/components/chart/index.ts"),
  "checkbox/index": resolve(__dirname, "src/components/checkbox/index.ts"),
  "date-picker/index": resolve(
    __dirname,
    "src/components/date-picker/index.ts"
  ),
  "dialog/index": resolve(__dirname, "src/components/dialog/index.ts"),
  "dropdown/index": resolve(__dirname, "src/components/dropdown/index.ts"),
  "file-upload/index": resolve(
    __dirname,
    "src/components/file-upload/index.ts"
  ),
  "html-editor/index": resolve(
    __dirname,
    "src/components/html-editor/index.ts"
  ),
  "icon/index": resolve(__dirname, "src/components/icon/index.ts"),
  "input/index": resolve(__dirname, "src/components/input/index.ts"),
  "link/index": resolve(__dirname, "src/components/link/index.ts"),
  "loading/index": resolve(__dirname, "src/components/loading/index.ts"),
  "pagination/index": resolve(__dirname, "src/components/pagination/index.ts"),
  "radio/index": resolve(__dirname, "src/components/radio/index.ts"),
  "separator/index": resolve(__dirname, "src/components/separator/index.ts"),
  "signature-pad/index": resolve(
    __dirname,
    "src/components/signature-pad/index.ts"
  ),
  "switch/index": resolve(__dirname, "src/components/switch/index.ts"),
  "table/index": resolve(__dirname, "src/components/table/index.ts"),
  "tabs/index": resolve(__dirname, "src/components/tabs/index.ts"),
  "tags/index": resolve(__dirname, "src/components/tags/index.ts"),
  "textarea/index": resolve(__dirname, "src/components/textarea/index.ts"),
  "toast/index": resolve(__dirname, "src/components/toast/index.ts"),
  "tooltip/index": resolve(__dirname, "src/components/tooltip/index.ts"),
  "stepper/index": resolve(__dirname, "src/components/stepper/index.ts"),
  "typography/index": resolve(__dirname, "src/components/typography/index.ts"),
  // Komponen mobile (gaya Konsta)
  "actions/index": resolve(__dirname, "src/components/actions/index.ts"),
  "badge/index": resolve(__dirname, "src/components/badge/index.ts"),
  "block/index": resolve(__dirname, "src/components/block/index.ts"),
  "fab/index": resolve(__dirname, "src/components/fab/index.ts"),
  "panel/index": resolve(__dirname, "src/components/panel/index.ts"),
  "popover/index": resolve(__dirname, "src/components/popover/index.ts"),
  "searchbar/index": resolve(__dirname, "src/components/searchbar/index.ts"),
  "glass/index": resolve(__dirname, "src/components/glass/index.ts"),
  "list/index": resolve(__dirname, "src/components/list/index.ts"),
  "navbar/index": resolve(__dirname, "src/components/navbar/index.ts"),
  "page/index": resolve(__dirname, "src/components/page/index.ts"),
  "sheet/index": resolve(__dirname, "src/components/sheet/index.ts"),
  "tabbar/index": resolve(__dirname, "src/components/tabbar/index.ts"),
  "toolbar/index": resolve(__dirname, "src/components/toolbar/index.ts"),
};

export default defineConfig({
  plugins: [
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    react(),
    dts({
      include: [
        "src/components/**/*.ts",
        "src/components/**/*.tsx",
        "src/lib/utils.ts",
      ],
      exclude: ["src/**/*.stories.tsx", "src/**/*.test.tsx"],
      outDir: "dist",
      tsconfigPath: "./tsconfig.json",
    }),
  ],
  build: {
    lib: {
      entry: componentEntries,
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        /^react\//,
        /^react-dom\//,
        "recharts",
        /^recharts\//,
        "@tanstack/react-router",
        /^@tanstack\/react-router\//,
        /^@tiptap\//,
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "styles.css";
          return assetInfo.name ?? "";
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    target: "es2022",
    minify: "esbuild",
    cssMinify: true,
  },
});
