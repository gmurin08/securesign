# SecureSign (Alder Creek Digital) — Whitewash / Rebrand Plan (Documenso AGPL Fork)

This repo is a fork of Documenso. The goal is to **white-label the product as “SecureSign” by Alder Creek Digital** while staying **fully AGPL-3.0 compliant**.

This document is written as **instructions for Claude** to implement the rebrand safely and completely.

---

## 0) Non‑negotiables (AGPL compliance)

### Must keep
- Keep `LICENSE` (AGPL-3.0) unchanged.
- Keep upstream copyright headers.
- Do **not** remove attribution where it is legally required.

### Must add (network clause)
Because this is a web app, add a visible but not prominent “Source Code” link for users interacting with the app over the network:
- Add an **Open Source / Legal** page that clearly states:
  - SecureSign is based on Documenso
  - Licensed under AGPL-3.0
  - Source code URL

**Preferred locations**
- App navigation menu (mobile + desktop)
- Footer on auth pages and public pages
- `/open-source` or `/legal/open-source` route

### Repo-level notices
- Add a top-level `NOTICE` file (new).
- Update top-level `README.md` with:
  - Product name, branding
  - “Based on Documenso” statement
  - Source code link
  - AGPL statement

---

## 1) Branding specification (use these constants everywhere)

### Product / company
- Product name: **SecureSign**
- Company: **Alder Creek Digital**
- “Byline”: **SecureSign by Alder Creek Digital**
- Support email: (set as) `support@aldercreekdigital.com` (or placeholder if unknown)
- Marketing site: `https://securesign.aldercreekdigital.com` (or placeholder)
- Source code URL: `https://github.com/<org>/<repo>` (must be real & public)

### Visual identity
- Replace all Documenso logos/icons with SecureSign branding:
  - App logo (header, auth, nav)
  - Favicon set
  - App icons (PWA)
  - OpenGraph/social share image
  - Any badges or “premium” graphics that include Documenso identity (keep functionality, swap look)

### Terminology
Replace visible references of:
- “Documenso” → “SecureSign”
- “Documenso Docs” → “SecureSign Docs”
- “docs.documenso.com” links → new docs URL (or remove if not relevant)
- “Documenso Supporter / Pledge” assets → rebrand or remove if not appropriate for SecureSign

> Important: **Do not rename internal package scopes** like `@documenso/*` unless explicitly requested. It’s a massive change with high blast radius and is not required for user-facing rebranding.

---

## 2) Create a single source of truth for brand strings

Create a central brand config module and use it everywhere user-facing strings appear.

### New file (suggested)
- `apps/remix/app/lib/brand.ts` (or similar)

Export constants:
- `PRODUCT_NAME = "SecureSign"`
- `PRODUCT_BYLINE = "SecureSign by Alder Creek Digital"`
- `COMPANY_NAME = "Alder Creek Digital"`
- `SUPPORT_EMAIL = "support@aldercreekdigital.com"`
- `SOURCE_CODE_URL = "https://github.com/<org>/<repo>"`
- `DOCS_URL = "https://<your-docs-domain>"` (or remove)
- `LEGAL_URLS = { terms, privacy, openSource }`

Then update Remix components/pages/emails to reference these constants (or pass via env → loader if needed).

---

## 3) Primary rebrand targets (must update)

### A) Remix web app UI (end-user visible)
Path: `apps/remix/app/**`

Key goals:
- Replace all visible “Documenso” mentions.
- Update navigation logo and app title/metadata.
- Add the AGPL “Source Code” link.
- Update support/help links to SecureSign properties.

High-signal files to review/update (not exhaustive, but must check):
- `apps/remix/app/root.tsx`
  - Contains a visible string: “expired license instance of Documenso” → update.
  - Ensure any layout-level text uses brand constants.
- `apps/remix/app/components/general/app-nav-mobile.tsx`
  - Imports `@documenso/assets/logo.png` → ensure this shows SecureSign logo.
- Routes containing docs/support links:
  - `apps/remix/app/routes/_authenticated+/o.$orgUrl.support.tsx`
  - `apps/remix/app/routes/_authenticated+/admin+/organisations.$id.tsx`
  - `apps/remix/app/routes/_authenticated+/t.$teamUrl+/settings.tokens.tsx`
- Any “About”, “Support”, “Settings”, “Billing” pages that mention Documenso.

Implementation approach:
1. Replace hard-coded “Documenso” strings with `PRODUCT_NAME`/`PRODUCT_BYLINE`.
2. Ensure it is visible without auth (login page) and with auth (app shell).

---

### B) Email templates (end-user visible)
Primary paths:
- `packages/email/templates/*.tsx`
- Also check:
  - `packages/lib/server-only/email/**`
  - `packages/lib/server-only/2fa/email/**`
  - `packages/lib/jobs/definitions/emails/**`

Goals:
- Replace “Documenso” branding in email headers, footers, and copy.
- Replace links to Documenso docs or domains.
- Ensure sender/subject lines reference SecureSign.
- Include Open Source notice if you want (not required), but at least do not claim Documenso.

Deliverables:
- Update common layout components used by emails (if present).
- Update per-template copy:
  - invitations
  - password reset
  - confirmations
  - org/team events
  - document signing notifications

---

### C) Translations (Lingui PO files)
Path:
- `packages/lib/translations/*/web.po`

These contain many “Documenso” strings in multiple languages.

Goals:
- Replace “Documenso” → “SecureSign” consistently in all locales.
- Do **not** break placeholders: keep `{organisationName}`, `{teamName}`, `{0}`, etc.
- Avoid touching translated text except for the product name unless you know the language.

Practical strategy:
- Safe bulk replace **only** the literal “Documenso” token in `msgid` and `msgstr`.
- Repeat for all locales.

---

### D) Public assets (favicons, logos, OG images, manifests)
There are multiple places where Documenso branding assets live.

**1) Remix public assets**
Path:
- `apps/remix/public/**`
  - `apps/remix/public/site.webmanifest` (currently name/short_name are Documenso)
  - `apps/remix/public/*favicon*`, `apple-touch-icon`, `android-chrome-*`
  - `apps/remix/public/opengraph-image.jpg`
  - `apps/remix/public/static/logo.png` and other static images

**2) Shared assets package**
Path:
- `packages/assets/**`
  - `packages/assets/logo.png`, `logo_icon.png`, icon set, OG image
  - `packages/assets/site.webmanifest`
  - `packages/assets/documenso-supporter-pledge.pdf` (decide: remove from product, or rebrand)

Goals:
- Replace all icons with SecureSign equivalents.
- Update PWA manifest fields: `name`, `short_name`.
- Ensure any imported assets in UI point to SecureSign graphics.
- Update `opengraph-image.jpg` to SecureSign.

---

### E) Documentation site (if you ship it)
Path:
- `apps/documentation/**`

High priority files:
- `apps/documentation/theme.config.tsx` (contains “Documenso Docs”)
- `apps/documentation/next.config.ts` and metadata
- `apps/documentation/public/**` icons/OG image

Goals:
- Rename docs branding to SecureSign.
- Update internal links pointing at `docs.documenso.com`.
- Ensure docs site header/logo says SecureSign.
- Keep licensing pages intact (AGPL statement + source).

---

### F) OpenPage API app (if user-facing)
Path:
- `apps/openpage-api/**`

Goals:
- Update public titles/descriptions/branding.
- Ensure any OpenAPI metadata references SecureSign (title, description, contact).
- Update docs links/domains.

---

## 4) Secondary targets (recommended)

### A) Top-level README and community files
Files:
- `README.md`
- `CODE_OF_CONDUCT.md`
- `CONTRIBUTING.md`
- `MANIFEST.md`
- `SIGNING.md`
- `CLA.md`
- `AGENTS.md`

Goals:
- Replace Documenso branding in headings and copy where it represents the product name.
- Preserve upstream references where appropriate (history/attribution).
- Add SecureSign positioning + “fork of Documenso” statement.
- Add AGPL “source available here” statement.

---

### B) Deployment / Docker naming (optional)
Paths:
- `docker/**` (`docker/development/compose.yml`, `docker/production/compose.yml`, etc.)
- `.env.example` database URLs use `documenso` user/db names

This is mostly internal and not user-facing. You may keep as-is to reduce risk.
If you rename:
- Update service names, database names, and any hard-coded references consistently.

---

### C) GitHub / CI metadata
Paths:
- `.github/**`

Update:
- Repo name references in badges, workflows, release names, Docker image names, etc.

---

## 5) Replacement map (what to replace with what)

### Required
- `Documenso` → `SecureSign`
- `Documenso Docs` → `SecureSign Docs`
- `docs.documenso.com` → `<your-docs-domain>` (or remove)
- “Documenso account” → “SecureSign account”
- “Documenso sign in page” → “SecureSign sign in page”

### Keep (do NOT rebrand unless requested)
- Internal package scopes: `@documenso/*`
- Database user/db names (`documenso`) unless you intentionally rename
- Code comments referencing upstream implementation (ok to leave)

---

## 6) How to implement safely (suggested workflow for Claude)

### Phase 1 — Branding constants + UI source link
1. Add `brand.ts` constants (Remix).
2. Add “Source Code (AGPL-3.0)” link on public facing pages
3. Update `apps/remix/public/site.webmanifest` name/short_name.
4. Replace primary logo import usage so UI shows SecureSign.

### Phase 2 — Bulk string replacements (user-visible)
1. Replace “Documenso” in Remix UI copy (prioritize auth pages, nav, settings, support).
2. Replace “Documenso” in email templates and subjects.
3. Replace “Documenso” in translations (`packages/lib/translations/*/web.po`) without altering placeholders.

### Phase 3 — Asset refresh
1. Swap icons/logos/OG images in:
   - `packages/assets/**`
   - `apps/remix/public/**`
   - `apps/documentation/public/**` (if applicable)
2. Validate that the app renders the new icon set.

### Phase 4 — Docs + API app branding
1. Update `apps/documentation/theme.config.tsx` and any title/metadata.
2. Update `apps/openpage-api/**` metadata and branding.

### Phase 5 — Repo hygiene + notices
1. Add `NOTICE`.
2. Update `README.md` with:
   - “SecureSign by Alder Creek Digital”
   - fork attribution
   - AGPL statement
   - source link

---

## 7) Acceptance checklist (definition of done)

### UI
- No visible “Documenso” in:
  - app shell
  - auth screens
  - settings/support pages
  - error banners
- App nav shows SecureSign name/logo.
- A “Source Code (AGPL-3.0)” link is visible to users (authed + unauth).

### Emails
- All outbound emails say SecureSign (subjects + body).
- Links point to SecureSign domains.
- No Documenso logo appears.

### Translations
- Product name updated across all locales (at least the literal token).

### Assets
- Favicons and app icons are SecureSign.
- PWA manifest shows SecureSign.
- OG image is SecureSign.

### Legal/Compliance
- `LICENSE` unchanged.
- `NOTICE` exists.
- README includes AGPL + source link.
- In-app open-source/source link exists (AGPL network clause satisfied).

---

## 8) Quick commands Claude can use for auditing

From repo root:
- Find remaining Documenso references:
  - `rg -n "Documenso|documenso" .`
- Check brand strings in translations:
  - `rg -n "Documenso" packages/lib/translations`
- Check docs links:
  - `rg -n "docs\\.documenso\\.com" .`

Stop only when the remaining matches are:
- internal package names (`@documenso/*`)
- historical attribution in NOTICE/README (intentional)


