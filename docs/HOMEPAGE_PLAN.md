# HomePage Implementation Plan

Tracking plan for replacing the mock `src/pages/HomePage.tsx` with the full public landing page defined in `docs/PRD.md` §7.

## Context

- **Current state:** `HomePage` is a 25-line placeholder with hardcoded copy and a link to `/admin/login`.
- **Target:** one-page landing page composed of CMS-driven sections, anchor navigation, category filtering, and a competition detail modal.
- **Key rules:** all copy comes from the CMS; missing data is hidden, never rendered as empty or `null`; mobile-first from 360 px with no horizontal scroll; external links open in a new tab.
- **Related tracks:** `src/App.tsx` currently has no bootstrap gate and `@supabase/supabase-js` is not installed. Both must land before HomePage can load CMS content.

Legend: `[ ]` pending · `[~]` in progress · `[x]` done.

## Phase 0 — Prerequisites (blockers)

- [x] Install and configure `@supabase/supabase-js`; add `src/lib/supabase.ts` with a single shared client.
- [x] Generate Supabase database types and add them to `src/types` (no hand-written row duplicates).
- [x] Add the app bootstrap gate in `src/App.tsx` (`loading` / `error` / `ready`) with `AppLoading` and `AppError` organisms, per frontend guidelines.
- [x] Confirm the CMS tables/columns needed by the landing page: event settings, timeline, social links, categories, competitions (image, fee, type, registration/guidebook links).
- [ ] Confirm the registration date fields used to derive the countdown phases. **Blocked:** timeline has no event-day field (see findings).

### Phase 0 findings

- `event_settings` is a single row with `event_name`, `event_description`, `prize_pool`, `venue_name`, `address`, `logo_url`, plus JSONB arrays `contact`, `timeline`, and `social_media`.
- `timeline` items use `{ step, title, description, start_date, end_date }`. Current steps: `OPEN REGISTRATION` (2026-10-25 → 2027-01-04), `TECHNICAL MEETING` (2027-01-04), `CLOSE REGISTRATION` (2027-01-04). There is no `HARI H` / event-day step.
- `categories` has 6 rows (`slug`, `label`); `competitions` has 19 rows with nullable `category_id`, nullable `image_url`, and nullable `teams` (non-null = team competition, null = individu).
- Public `SELECT` RLS is enabled for `event_settings`, `categories`, and `competitions`; `admins` is limited to the authenticated user's own row.
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` already exist in `.env.local` (the key is a publishable key).
- Bootstrap currently verifies the auth session and the settings query. Phase 1 can lift the loaded settings into shared state to avoid a second request.
- `tsconfig.app.json` does not enable `"strict": true` despite the frontend guidelines; enabling it may surface existing errors and should be handled separately.

## Phase 1 — Shared types and data access

- [ ] Define landing-page view types in `src/types` (event settings, timeline item, category, competition, social link).
- [ ] Add zod schemas in `src/lib` for the CMS payloads; derive types with `z.infer`.
- [ ] Add `src/hooks/useLandingContent.ts` that loads settings, timeline, categories, and competitions in one place.
- [ ] Return a discriminated union state (`loading` / `error` / `ready`) and expose a retry.
- [ ] Add pure helpers in `src/lib` for:
  - [ ] Countdown phase (before open, open, closed, event passed).
  - [ ] Timeline item status (Selesai / Berlangsung / Segera).
  - [ ] Rupiah and Indonesian date formatting.
  - [ ] Safe external URL handling.

## Phase 2 — Landing sections

Keep `HomePage` a thin composition; each section lives in `src/components/organisms` and is rendered only when it has data.

- [ ] **Marquee** — important dates and total prize; links to registration when available.
- [ ] **Header** — logo, anchor nav, CTA, accessible mobile menu toggle.
- [ ] **Hero** — event name, short description, date, location, prize, live countdown, `Daftar` and `Lihat Cabang Lomba` actions.
- [ ] **Tentang** — description plus key figures (19 cabang, 6 kategori, hadiah, 45 tahun) derived from CMS data where possible.
- [ ] **Timeline** — stages with derived status badges.
- [ ] **Cabang Lomba** — category tabs, in-page filtering, competition cards (image, title, fee, individu/tim badge).
- [ ] **Detail lomba** — modal with description, category, fee, type, guidebook and registration links; Escape close and focus return.
- [ ] **Hadiah** — total prize.
- [ ] **Lokasi & Kontak** — address, Google Maps button, WhatsApp link.
- [ ] **Footer** — logo, social links, contact, copyright, back to top.

## Phase 3 — Behavior and state

- [ ] Countdown updates automatically and switches phase exactly per PRD §9; when the event has passed, show `Acara telah berlangsung`.
- [ ] Registration CTA reflects phase: disabled with a clear reason when closed or the link is missing.
- [ ] Category filter runs client-side without changing the route.
- [ ] Competition modal reuses filtered data, scrolls internally on small screens, and returns focus to the trigger.
- [ ] Anchor links (`#tentang`, `#timeline`, `#cabang-lomba`, `#lokasi`) work from the header and mobile menu.
- [ ] Hide every optional field that is missing (no placeholders, dashes, or broken buttons).
- [ ] All external links use `target="_blank"` and `rel="noreferrer"`.

## Phase 4 — Visual, responsive, and accessibility polish

- [ ] Use only semantic theme tokens from `src/global.css`; no raw palette or hex values.
- [ ] Poster typography for headings, monospace labels, stickers/marquee; simplify decorative elements on mobile.
- [ ] Verify layout at 360 px, 768 px, and desktop with no horizontal scroll.
- [ ] Semantic landmarks (`header`, `main`, `section`, `footer`), one `h1`, correct heading order.
- [ ] Icon-only controls have `aria-label`; decorative icons use `aria-hidden="true"`.
- [ ] Modal has `role="dialog"` and an accessible name.
- [ ] Countdown and async feedback use `aria-live`.
- [ ] Visible focus states preserved.

## Phase 5 — Cleanup and verification

- [ ] Remove the mock copy, the `Mock Landing Page` label, and the hardcoded admin link from `HomePage`.
- [ ] Ensure `HomePage` contains composition only (no inline data fetching or large JSX blocks).
- [ ] Run `npm run build` and `npm run lint`; fix anything introduced.
- [ ] Manually verify the PRD "Aturan tampilan" and §10 Definition of Done for the landing page.

## HomePage definition of done

- [ ] Content is fully editable from the CMS without a redeploy.
- [ ] All stored competitions render and filter by category.
- [ ] Individu/Tim badges match the data.
- [ ] Countdown moves through all four states correctly.
- [ ] Landing page is a single route; navigation uses anchors and detail is a modal.
- [ ] No empty data, dead links, or broken buttons are visible to visitors.
- [ ] Layout is clean at 360 px, 768 px, and desktop.
- [ ] Build and lint pass.

## Notes / open questions

- Confirm whether "19 cabang / 6 kategori / 45 tahun" should be CMS fields or computed (competition count, category count, fixed anniversary number).
- Confirm the exact CMS columns for registration open/close and event date before building the countdown.
- `@supabase/supabase-js` must be added; it is not currently in `package.json`.
