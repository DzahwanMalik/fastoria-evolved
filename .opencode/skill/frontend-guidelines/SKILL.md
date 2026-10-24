---
name: frontend-guidelines
description: Use when writing or reviewing any Fastoria frontend code (React 19, TypeScript, Tailwind v4, Supabase). Enforces @/ path-alias imports, JSX.Element component return types, lucide-react icons, React Router declarative mode, and app-level loading/error gating before content renders. Triggers on new components, refactors, imports, icons, spinners, error screens, forms, and frontend code review.
---

# Frontend Guidelines

Non-negotiable rules for the Fastoria frontend. Apply them to every new file and to every file you touch. For component placement, also follow the `atomic-design` skill.

## Quick reference

| Area | Rule |
| --- | --- |
| Imports | Internal modules come from `@/...` (alias of `src/`) |
| Components | Function declaration returning `JSX.Element` |
| Icons | `lucide-react` only, imported by name |
| Boot | Loading and error are handled once in `App`, before pages render |
| Types | No `any`, no `enum`; `import type` for type-only imports |
| Styling | Semantic theme tokens only; Tailwind utilities, mobile-first from 360 px |

## 1. Imports

- `@` is an alias for `src/`. Import internal modules as `@/components/...`, `@/hooks/...`, `@/lib/...`, `@/types/...`.
- Never use `../` or `./` to reach another folder. A same-folder sibling may use `./` only when the import stays inside that folder.
- Never import through `src/...` or a long relative path.
- Use `import type` for types. `verbatimModuleSyntax` is enabled, so value imports of types are errors.
- Group imports in this order, separated by a blank line:
  1. React and external packages
  2. `@/` modules
  3. same-folder relative modules
  4. styles
- Import icons by name from `lucide-react`; never import the whole package.
- Do not add barrel `index.ts` files unless the folder already uses them.

```tsx
import { useState } from "react";
import type { JSX } from "react";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/atoms/Button";
import type { Competition } from "@/types/competition";
```

## 2. Components

- One component per file. Component files use `PascalCase.tsx`; route configuration modules (`router.tsx`) and non-component files use `camelCase.ts`.
- Use a named function declaration and a named export. Default-export only when a tool requires it.
- Destructure props in the signature. Declare `type Props` directly above the component.
- Every component returns `JSX.Element` explicitly. Never use `React.FC` or an inferred return type.
- React 19 types do not expose a global `JSX` namespace. Import it as a type: `import type { JSX } from "react"`.
- Type `children` as `ReactNode` and event handlers with the React event type you need, imported as types from `react`.
- Keep components focused. Extract a child, hook, or helper when a component owns more than one concern.
- Hooks live in `src/hooks`, start with `use`, and have explicit parameter and return types.
- No class components.

```tsx
import type { JSX } from "react";

import { ArrowRight } from "lucide-react";

type Props = {
  label: string;
  onClick: () => void;
};

export function CtaButton({ label, onClick }: Props): JSX.Element {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-2">
      {label}
      <ArrowRight aria-hidden="true" className="size-4" />
    </button>
  );
}
```

## 3. Icons

- Use `lucide-react` for every icon. Do not hand-write SVGs, use emoji as icons, or add icon fonts.
- Import the exact icons used: `import { Menu, X } from "lucide-react";`.
- Decorative icons get `aria-hidden="true"`. Icon-only buttons get an `aria-label`.
- Size icons with Tailwind (`className="size-4"`); color them with `text-*`. Do not hardcode `width`/`height` attributes.
- Icons inherit `currentColor`; never set `fill` unless the icon requires it.
- Use `LoaderCircle` for loading, `TriangleAlert` for errors, `CircleCheck` for success, and `Info` for neutral notices.

```tsx
<button type="button" aria-label="Tutup detail lomba">
  <X aria-hidden="true" className="size-5" />
</button>
```

## 4. Loading and error at app start

The first load is handled once, at the app root, before any content is displayed.

- `src/main.tsx` only mounts React. `src/App.tsx` owns the bootstrap gate.
- Bootstrap loads only what the whole app needs before first paint: the auth session and global CMS settings.
- Model bootstrap as a discriminated union. Never use a boolean pair such as `isLoading` plus `error`.

```ts
export type AppBootstrap =
  | { status: "loading" }
  | { status: "error"; message: string; retry: () => void }
  | { status: "ready" };
```

- Render the router and pages only in the `ready` state.
- While loading, render a full-viewport screen with a centered `LoaderCircle`, the text `Memuat…`, `role="status"`, and `aria-live="polite"`. Avoid layout shift.
- On failure, render a full-viewport error screen with a human-readable message, a retry button, and `role="alert"`. Never expose raw errors, stack traces, or Supabase details; log details in development only.
- Retry returns to `loading` and reruns bootstrap.
- A missing admin session is not a bootstrap error. It is a `ready` state; the `/admin/*` guard redirects to `/admin/login`.
- Do not add a second initial-load spinner inside pages. After bootstrap, use local pending/error state only for actions, forms, and route navigation.

Target shape once the bootstrap hook and router exist:

```tsx
import type { JSX } from "react";

import { BrowserRouter } from "react-router";

import { AppError } from "@/components/organisms/AppError";
import { AppLoading } from "@/components/organisms/AppLoading";
import { useAppBootstrap } from "@/hooks/useAppBootstrap";
import { AppRoutes } from "@/router";

export function App(): JSX.Element {
  const bootstrap = useAppBootstrap();

  if (bootstrap.status === "loading") return <AppLoading />;
  if (bootstrap.status === "error") {
    return <AppError message={bootstrap.message} onRetry={bootstrap.retry} />;
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
```

## 5. TypeScript

- Strict mode is on. Do not use `any`; use `unknown` and narrow with type guards.
- `erasableSyntaxOnly` is on. Do not use `enum`, `namespace`, or constructor parameter properties. Use `as const` objects plus union types.
- Do not use non-null assertions (`!`) except on the root element mount.
- Prefer `type` for props, state, and unions. Use `interface` only when declaration merging is required.
- Use `satisfies` for config objects that must keep literal types.
- Keep `noUnusedLocals` and `noUnusedParameters` clean; remove unused code instead of silencing it.
- Handle every member of a union; no silent fallthrough.

```ts
export const competitionTypes = ["individu", "tim"] as const;

export type CompetitionType = (typeof competitionTypes)[number];
```

## 6. Styling and theme

All color and typography comes from the semantic tokens in `src/global.css`, which holds the Tailwind import, the `@theme` tokens, and one small base layer for page defaults. Do not add component CSS, CSS-in-JS, `tailwind.config.js`, or per-component stylesheets. The app is dark-only; do not add `dark:` variants or light-mode fallbacks.

### 6.1 Colors

The brand palette is exactly five colors: Crayola `#306EF9`, Fiery Rose `#FF4E78`, Arctic Lime `#CAFB12`, Russian Violet `#2D1D44`, and White `#FFFFFF`. Neutrals below are derived only from Russian Violet and White (shade or alpha); never introduce another hue.

Never use raw palette utilities (`bg-slate-950`, `text-lime-300`, `text-white`) or hex arbitrary values for app UI. Use the semantic tokens below.

| Token | Utilities | Value | Use |
| --- | --- | --- | --- |
| `background` | `bg-background` | `#2D1D44` | Page base (Russian Violet) |
| `background-deep` | `bg-background-deep` | `#241733` | Sunken areas, sidebar, footer |
| `surface` | `bg-surface` | `rgb(255 255 255 / 0.06)` | Cards, panels, inputs |
| `surface-raised` | `bg-surface-raised` | `rgb(255 255 255 / 0.10)` | Hover, popovers, nested panels |
| `border` | `border-border` | `rgb(255 255 255 / 0.16)` | Dividers and outlines |
| `foreground` | `text-foreground` | `#FFFFFF` | Primary copy |
| `foreground-muted` | `text-foreground-muted` | `rgb(255 255 255 / 0.72)` | Secondary copy, hints |
| `primary` | `bg-primary` | `#CAFB12` | Main CTA, active nav, accents (Arctic Lime) |
| `primary-foreground` | `text-primary-foreground` | `#2D1D44` | Text and icons on primary |
| `secondary` | `bg-secondary` | `#FF4E78` | Secondary CTA, stickers, dates (Fiery Rose) |
| `secondary-foreground` | `text-secondary-foreground` | `#FFFFFF` | Text and icons on secondary |
| `accent` | `bg-accent` | `#306EF9` | Links, tabs, info panels (Crayola) |
| `accent-foreground` | `text-accent-foreground` | `#FFFFFF` | Text and icons on accent |
| `success` | `text-success` | `#CAFB12` | Success and completed states |
| `success-foreground` | `text-success-foreground` | `#2D1D44` | Text and icons on success |
| `danger` | `text-danger` | `#FF4E78` | Errors and destructive actions |
| `danger-foreground` | `text-danger-foreground` | `#FFFFFF` | Text and icons on danger |
| `ring` | `ring-ring` | `#CAFB12` | Focus ring |
| `overlay` | `bg-overlay` | `rgb(36 23 51 / 0.8)` | Modal backdrop |

- Always pair a filled surface with its `-foreground` token: `bg-primary text-primary-foreground`.
- Build hover and active states with opacity modifiers on the same token (`hover:bg-primary/90`), not with new colors.
- Body copy uses `foreground` and `foreground-muted`; `primary`, `secondary`, and `accent` are for emphasis, labels, and surfaces.
- Page roots inherit `bg-background text-foreground` from the base layer. Add a background class only when a section differs from the page.
- `ring-ring` is the focus color. Never remove outlines without an accessible replacement.

### 6.2 Typography

| Token | Utilities | Family | Use |
| --- | --- | --- | --- |
| `sans` | `font-sans` | Calibri → Carlito | Body copy and UI (base default) |
| `display` | `font-display` | Anybody | Poster headings |
| `outline` | `font-outline` | Monoton | Decorative lined headings |
| `mono` | `font-mono` | System monospace | Labels, eyebrows, timers, stickers |

- Fonts are loaded once in `index.html` from Google Fonts. Never add `@import url(...)` for fonts to CSS.
- Calibri is the body face; Carlito is loaded as its metric-compatible fallback for devices without Calibri. Keep both in `--font-sans`.
- Do not repeat `font-sans` on every element; the base layer already applies it.
- Poster headings use `font-display font-black uppercase`, tight leading (`leading-none` or `leading-[0.9]`), and `font-stretch-expanded` from `sm:` upward. Keep them short.
- `font-outline` is only for decorative section headings. Never use it for body copy, labels, buttons, or text that must be read at small sizes.
- Labels, eyebrows, timers, and sticker text use `font-mono uppercase` with wide `tracking-*`. The PRD requires monospace labels, so do not replace them with Calibri or Anybody.

### 6.3 Layout and utilities

- Build mobile-first from 360 px, then add `sm:`, `md:`, and `lg:` overrides. Never allow horizontal scrolling.
- Use `size-*` for square icons and controls, and `gap-*` for spacing between siblings.
- Never construct class names from fragments. Map state to complete class strings.
- Use arbitrary values only when the design reference requires an exact value.
- Keep focus styles visible; the base layer provides the ring, so do not remove it.

## 7. Forms and validation

- Use `react-hook-form` with `zodResolver` and a zod schema. Derive types with `z.infer`.
- Define the schema once and reuse it for both the form and the Supabase payload. Do not duplicate validation rules.
- Normalize input in the schema (for example `.trim()`) and convert empty optional fields to `null` before sending them to Supabase.
- Show field errors next to the field and wire `aria-invalid` and `aria-describedby`.
- Disable submit while `isSubmitting` and show a `LoaderCircle` in the button.
- Admin forms must warn before leaving with unsaved changes.

## 8. Data and content

- Create one Supabase client in `src/lib/supabase.ts` and import it everywhere.
- Use generated database types; do not hand-write duplicate row types.
- Hide missing optional content. Never render `null`, `undefined`, empty strings, or placeholder dashes to visitors.
- Public copy comes from the CMS, not hardcoded constants.
- External links use `target="_blank"` and `rel="noreferrer"`.
- User-facing copy is Indonesian. Code identifiers, comments, and file names are English.

## 9. Routing and accessibility

- `/` is the landing page and `*` renders the public 404 screen; `/admin/*` requires a session; the 404 screen links back to `/`.
- Use React Router declarative mode (`BrowserRouter`, `Routes`, `Route`); do not use `createBrowserRouter` or `RouterProvider`.
- Landing navigation uses anchors (`#tentang`, `#timeline`, `#cabang-lomba`, `#lokasi`). Competition detail is a modal, not a route.
- Use `Link`/`NavLink` for internal routes, `<a>` for external URLs and anchors.
- Route guards run only after bootstrap reaches `ready`.
- Use semantic elements: `button` for actions, `a` for navigation, `label` for inputs.
- Icon-only controls need `aria-label`. Images need `alt`; decorative images use `alt=""`.
- Modals need `role="dialog"`, an accessible name, Escape handling, and focus return to the trigger.
- Async feedback uses `aria-live`.

## 10. File layout

| Path | Purpose |
| --- | --- |
| `src/components/atoms` | Primitive UI with no business logic |
| `src/components/molecules` | Small compositions of atoms |
| `src/components/organisms` | Feature-level sections |
| `src/components/templates` | Page layouts and shells |
| `src/pages` | Route-level screens |
| `src/router.tsx` | Declarative route tree (`AppRoutes`) |
| `src/hooks` | Reusable React hooks |
| `src/lib` | Supabase client, schemas, pure helpers |
| `src/types` | Shared types |
| `src/assets` | Static assets |

Do not add new top-level folders inside `src` without a concrete need.

## 11. Verification

Run both commands after changes and fix anything you introduced:

```bash
npm run build
npm run lint
```

Before finishing, confirm:

- Internal imports use `@/` and types use `import type`.
- Components import `JSX` from `react` and declare `JSX.Element`; they avoid `React.FC`.
- Icons come from `lucide-react` with correct accessibility attributes.
- The bootstrap gate covers loading and error before any content renders.
- No `any`, no `enum`, no ad-hoc CSS.
- Missing CMS data is hidden, not rendered as empty output.
- Build and lint pass.
