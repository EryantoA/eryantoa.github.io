# eryanto.dev — static site for GitHub Pages

Plain HTML/CSS/JS. No build step, no framework, no bundler. Copy the contents of
this folder to the root of your Pages branch and it deploys as-is.

The site is **bilingual**: Indonesian at the root, English mirrored under `en/`
with the same file names. Why it is mirrored files and not a generator:
[docs/adr/0001](docs/adr/0001-bilingual-cermin-file-statis.md). The words the
copy must use (project status, "Ketersediaan", …) are defined in
[CONTEXT.md](CONTEXT.md).

## Files

| File | Purpose |
|---|---|
| `index.html` | Home — outcome-first hero, marquees, projects in use, about, contact CTA |
| `projects.html` | All 12 projects: status badges, business-type filters kept in the URL hash |
| `project-fh-superapp.html` · `project-litera.html` · `project-openclaw.html` | Case studies — only for projects with real users |
| `contact.html` | WhatsApp first, then email / LinkedIn / GitHub, plus what to prepare |
| `privacy.html` / `terms.html` | Legal, with sticky contents rail |
| `en/*.html` | English mirror of every page above |
| `404.html` | Custom not-found page, both languages in one file (must keep this exact filename) |
| `styles.css` | All styling, one file, including the `@font-face` rules |
| `app.js` | Command palette / mobile menu, project filters — all progressive enhancement |
| `fonts/` | Self-hosted Space Grotesk, JetBrains Mono, Instrument Serif (`.ttf`) + their OFL licences |
| `favicon.svg` | Amber EA monogram |
| `CONTEXT.md` · `docs/adr/` | Glossary and recorded decisions |
| `.nojekyll` | Stops Jekyll from ignoring files that start with `_` |

## Editing copy — always two files

Every page exists twice: `x.html` (ID) and `en/x.html` (EN). A copy change, a new
project card or a header/palette/footer change must be made in both. Pages under
`en/` reach shared assets with `../` (`../styles.css`, `../app.js`,
`../favicon.svg`); links between pages stay relative within their own language.
The ID/EN switch in the header always points at the counterpart page.

## Project status — the honesty rule

Every project card carries exactly one status (see `CONTEXT.md`):

- **Dipakai di lapangan / In use** — used by people outside my household. Only
  these appear on the home page, and they get a case study.
- **Dipakai sendiri / Personal use** — used by me or my family. May get a case
  study; never featured on Home.
- **Project mandiri / Independent project** — built on my own initiative, no
  real users yet. No case study, no screenshot area, no link.

Where a project's code started from course material, the card says so
(`.origin`). Don't write claims the status doesn't support ("shipped", "in
production", client counts).

## Deploy

1. Create a repo. For a user site name it `USERNAME.github.io`; anything else
   becomes a project site at `USERNAME.github.io/REPO/`.
2. Push these files to the branch root (or `/docs`).
3. Settings → Pages → Source: that branch.

Every internal link is **relative** (`projects.html`, not `/projects.html`), so
the site works at both a root domain and a `/REPO/` subpath without changes.
`404.html` is the one exception — GitHub serves it for *any* missing path, so no
asset URL can be trusted. That page is therefore **fully self-contained**: its
CSS is inlined and every font has a system fallback. A small trailing script
prefixes its escape links and the `fonts/` URLs with the repo root on a project
site (`en` is never mistaken for a repo); if that guess is ever wrong the links
fall back to the domain root and the page still renders with fallback fonts.

## Before you publish — replace these

- `+62 812 0000 0000` and every `wa.me/6281200000000` link (each carries a
  pre-filled, URL-encoded opening message — keep the `?text=` part)
- `hello@eryanto.dev`
- `https://github.com/` and `https://linkedin.com/` profile URLs
- `og.png` — a 1200×630 share image (the design is in the mockup file, turn 8c)
- Screenshots for the three case studies: add a `<section>` with a `.gallery`
  of real `<img>`s (dummy or blurred personal data, explicit `width`/`height`,
  `loading="lazy"`). Never ship placeholder boxes.
- Once the domain is final, consider making the `hreflang` URLs absolute.

## What was fixed versus the mockup

- Sticky header is a direct child of `body` (sticky fails inside `overflow:hidden`)
- `backdrop-filter` has a `-webkit-` prefix and a solid-colour fallback
- `-webkit-text-stroke` outline type has a visible `color` fallback — without it
  the word disappears in browsers that don't support the stroke
- All marquees and the pulsing dot respect `prefers-reduced-motion`
- ⌘K ignores the shortcut while you're typing in a field; uses `<dialog>` for a
  real focus trap; Esc closes; focus returns to the trigger
- The palette lists every page and project; ↑↓ move between results and ⏎ in
  the search field opens the first match
- Nav collapses to a menu button under 900px; the button reuses the palette but
  focuses the first link, not the search field, so the phone keyboard stays shut
- Every control is a real `<a>` or `<button>`; tap targets are 44px
- Filters use `aria-pressed`, the result count is `aria-live`, and the active
  filter lives in the URL hash so it can be shared and Back restores it
- Legal pages use a single column of `<article>`s — CSS columns can split an item
- The footer is one row of five columns (brand, pages, services, legal,
  elsewhere) on every page. The mockup's grid declaration was invalid
  (`1.4fr` beside `repeat(auto-fit, …)`), so browsers dropped it and stacked
  the columns; under 900px the brand spans the row, under 600px links go 2×2
- No third-party requests: fonts are self-hosted, there are no forms, cookies or
  analytics

## Licence

Code: yours to reuse. Fonts: SIL Open Font License (see `fonts/OFL-*.txt`).
Client screenshots and client brand assets: not redistributable — see
`terms.html`.
