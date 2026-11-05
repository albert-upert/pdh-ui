# pdh-ui

Private React component library for the PDH design system.

## Prerequisites

- React 19+
- Tailwind CSS v4+
- Node.js 18+

## Installation

Install directly from the GitHub repository:

```bash
# Using pnpm
pnpm add git+https://github.com/albert-upert/pdh-ui.git

# Using npm
npm install git+https://github.com/albert-upert/pdh-ui.git

# Using yarn
yarn add git+https://github.com/albert-upert/pdh-ui.git
```

To pin a specific version or branch:

```bash
# Pin to a tag
pnpm add git+https://github.com/albert-upert/pdh-ui.git#v0.1.0

# Pin to a branch
pnpm add git+https://github.com/albert-upert/pdh-ui.git#main

# Pin to a commit
pnpm add git+https://github.com/albert-upert/pdh-ui.git#abc1234
```

## Setup

### 1. Import Styles

Add the library's design tokens CSS to your app's entry point (e.g., `main.tsx` or `App.tsx`):

```tsx
import "pdh-ui/styles.css";
```

### 2. Configure Tailwind CSS

The library uses Tailwind CSS v4 with CSS custom properties. Add the library's source files to your Tailwind configuration so utility classes used by components are included:

```css
/* In your app's main CSS file */
@import "tailwindcss";
@source "../node_modules/pdh-ui/dist/**/*.js";
```

## Usage

### Deep imports (recommended for optimal bundle size)

```tsx
import { Button } from "pdh-ui/button";
import { Input } from "pdh-ui/input";
import { Card, CardHeader, CardContent } from "pdh-ui/card";
import { Dialog, DialogContent, DialogHeader } from "pdh-ui/dialog";
import { AdminIcon, SearchIcon } from "pdh-ui/icon";
import { cn } from "pdh-ui/lib/utils";
```

### Barrel import (imports all components)

```tsx
import { Button, Input, Card } from "pdh-ui";
```

## Platform style (iOS / Material)

Component styling is adapted from [Konsta UI](https://github.com/konstaui/konsta) (MIT, see `NOTICE.md`)
and comes in two flavours. The `data-ui` attribute on `<html>` (or any ancestor element) picks one:

```html
<html data-ui="ios">
  <!-- default when the attribute is absent -->
  <html data-ui="material"></html>
</html>
```

Inside components, platform-specific classes use the `ios:` and `material:` Tailwind variants
(for example `ios:rounded-sm material:rounded-lg`). Classes without a prefix apply to both.
Colors always come from the design tokens (`--primary`, `--background`, `--card`, ...), so the
`data-theme` brand themes (`green-pear`, `honolulu-blue`) work in both styles.

The mobile components (`Page`, `Navbar`, `Toolbar`, `Tabbar`, `Sheet`, `List`, `Glass`, `Block`, `Badge`, `Fab`, `Searchbar`, `Actions`, `Popover`, `Panel`) use the
`pt-safe` / `pb-safe` / `px-safe` utilities for notches and home indicators; add
`<meta name="viewport" content="viewport-fit=cover">` to make `env(safe-area-inset-*)` work.

## Available Components

| Component  | Import Path          | Description                                                                |
| ---------- | -------------------- | -------------------------------------------------------------------------- |
| Accordion  | `pdh-ui/accordion`   | Collapsible content sections                                               |
| Breadcrumb | `pdh-ui/breadcrumb`  | Navigation breadcrumb trail                                                |
| Button     | `pdh-ui/button`      | Button with multiple variants                                              |
| Calendar   | `pdh-ui/calendar`    | Schedule calendar with daily/weekly/monthly/yearly views                   |
| Callout    | `pdh-ui/callout`     | Informational callout box                                                  |
| Card       | `pdh-ui/card`        | Card container with header/content                                         |
| Chart      | `pdh-ui/chart`       | Chart components (powered by recharts)                                     |
| Checkbox   | `pdh-ui/checkbox`    | Checkbox input                                                             |
| DatePicker | `pdh-ui/date-picker` | Date picker with calendar, range, time, year                               |
| Dialog     | `pdh-ui/dialog`      | Modal dialog                                                               |
| Dropdown   | `pdh-ui/dropdown`    | Dropdown select menu                                                       |
| FileUpload | `pdh-ui/file-upload` | File upload component                                                      |
| Icon       | `pdh-ui/icon`        | 114 SVG icon components                                                    |
| Input      | `pdh-ui/input`       | Text input field                                                           |
| Link       | `pdh-ui/link`        | Styled anchor link                                                         |
| Loading    | `pdh-ui/loading`     | Loading indicator                                                          |
| Pagination | `pdh-ui/pagination`  | Page navigation                                                            |
| Radio      | `pdh-ui/radio`       | Radio button input                                                         |
| Separator  | `pdh-ui/separator`   | Visual separator line                                                      |
| Switch     | `pdh-ui/switch`      | Toggle switch                                                              |
| Table      | `pdh-ui/table`       | Data table with actions                                                    |
| Tabs       | `pdh-ui/tabs`        | Tab navigation                                                             |
| Tags       | `pdh-ui/tags`        | Tag/badge labels                                                           |
| Textarea   | `pdh-ui/textarea`    | Multi-line text input                                                      |
| Toast      | `pdh-ui/toast`       | Toast notifications (powered by sonner)                                    |
| Tooltip    | `pdh-ui/tooltip`     | Tooltip popover                                                            |
| Typography | `pdh-ui/typography`  | Typography component with variants                                         |
| Actions    | `pdh-ui/actions`     | Action sheet: `Actions`, `ActionsContent`, `ActionsGroup`, `ActionsButton` |
| Badge      | `pdh-ui/badge`       | Small count / status badge                                                 |
| Block      | `pdh-ui/block`       | Content block: `Block`, `BlockTitle`                                       |
| Fab        | `pdh-ui/fab`         | Floating action button                                                     |
| Panel      | `pdh-ui/panel`       | Side panel (Radix Dialog)                                                  |
| Popover    | `pdh-ui/popover`     | Popover (Radix Popover)                                                    |
| Searchbar  | `pdh-ui/searchbar`   | Search field with clear button                                             |
| Glass      | `pdh-ui/glass`       | Glass surface (iOS blur) / card surface (Material)                         |
| List       | `pdh-ui/list`        | Mobile list: `List`, `ListItem`, `ListGroupTitle`                          |
| Navbar     | `pdh-ui/navbar`      | Mobile top bar                                                             |
| Page       | `pdh-ui/page`        | Full-height mobile page container                                          |
| Sheet      | `pdh-ui/sheet`       | Bottom sheet (Radix Dialog)                                                |
| Tabbar     | `pdh-ui/tabbar`      | Mobile tab bar: `Tabbar`, `TabbarLink`                                     |
| Toolbar    | `pdh-ui/toolbar`     | Mobile bottom/top bar: `Toolbar`, `ToolbarPane`                            |

## Development

```bash
# Install dependencies
pnpm install

# Run Storybook for component development
pnpm storybook

# Build the library
pnpm build

# Type check
pnpm typecheck

# Lint
pnpm lint

# Format
pnpm format
```

## Deploying Storybook

Build the static Storybook site and deploy the output to any static hosting provider.

### Build

```bash
pnpm build-storybook
```

This generates a static site in the `storybook-static/` directory.

### Deploy to GitHub Pages

1. Build Storybook:

```bash
pnpm build-storybook
```

2. Deploy using `gh-pages` (install once with `pnpm add -D gh-pages`):

```bash
npx gh-pages -d storybook-static
```

The Storybook will be available at `https://<username>.github.io/<repo>/`.

### Deploy to Vercel

1. Import the repository on [vercel.com](https://vercel.com)
2. Set the following build settings:
   - **Build Command:** `pnpm build-storybook`
   - **Output Directory:** `storybook-static`
3. Deploy

### Deploy to Netlify

1. Import the repository on [netlify.com](https://netlify.com)
2. Set the following build settings:
   - **Build Command:** `pnpm build-storybook`
   - **Publish Directory:** `storybook-static`
3. Deploy

### Deploy via Docker

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build-storybook

FROM nginx:alpine
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t pdh-storybook .
docker run -p 8080:80 pdh-storybook
```

## Updating the Library

After making changes to components:

1. Commit your changes — the pre-commit hook will automatically build `dist/` and include it in the commit
2. Push to GitHub
3. In consumer projects, run `pnpm update pdh-ui` to pull the latest version
