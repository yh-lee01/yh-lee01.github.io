# Design guide

The site's look comes from a small set of tokens and shared components. Change a token or a component once and every page follows.

## Principles

- **One column.** Every page uses `--reading-width` (720px); the navigation and footer align to it. Distill's contents list hangs in the left margin on wide screens.
- **Quiet lists.** Lists are rows separated by 1px dividers: no cards, shadows or hover movement. Hover changes color only.
- **Few sizes.** Use the type and spacing steps below; do not add one-off values.
- **Both themes.** Every color is a token with a light and a dark value.

## Tokens

`_sass/site/_tokens.scss`

| Group | Tokens |
| --- | --- |
| Type | `--fs-xs` 12 · `--fs-sm` 14 · `--fs-base` 16 · `--fs-prose` 17 (long text) · `--fs-md` 18 (item titles) · `--fs-lg` 22 (section headings) · `--fs-xl` 26 (article headings) · `--fs-h1` 32–40 |
| Spacing | `--sp-1` 4 · `--sp-2` 8 · `--sp-3` 12 · `--sp-4` 16 · `--sp-5` 24 · `--sp-6` 32 · `--sp-7` 48 · `--sp-8` 64 |
| Layout | `--reading-width` 720px · `--nav-height` 59px · `--date-col` · `--radius-sm` · `--radius-lg` |
| Color | `--global-*` (text, background, accent, divider…), `--accent-subtle-*`, `--tag-*` (news labels), `--image-dim` (dark-mode image dimming) |

Font: Inter (text) and IBM Plex Mono (code), loaded from Google Fonts (`third_party_libraries.google_fonts` in `_config.yml`).

## Style files

`assets/css/main.scss` loads the upstream al-folio/Distill/icon styles, then `_sass/_custom.scss`, which loads `_sass/site/`:

| File | Owns |
| --- | --- |
| `_tokens.scss` | tokens (above) |
| `_foundation.scss` | base type, links, page header, markdown content rules, tags, navigation, progress bar, back-to-top, copy buttons, footer |
| `_home.scss` | profile header, status line, home section headings |
| `_collections.scss` | dated lists, blog cards, publications, projects, CV |
| `_reading.scss` | long-form pages, Distill title/byline/contents/appendix, paper card, section links, math |

Edit the file that owns the component instead of appending overrides elsewhere; keep a component's responsive rules next to it.

## Components

| Component | Markup | Used on |
| --- | --- | --- |
| Page header (title · count or action · description · divider) | `_includes/page_header.liquid` | publications, projects, blog, news, archives, CV, project pages |
| Dated list `.date-list` | `_includes/news.liquid`, `_layouts/archive.liquid` | home news, news, tag/category/year archives |
| Blog card `.post-card` | `_pages/blog.md` | blog |
| Publication row | `_layouts/bib.liquid` (jekyll-scholar) | publications, home |
| Project row `.project-item` | `_includes/projects.liquid` | projects |
| Home section `.section-head` | `_layouts/about.liquid` | home |
| Paper card `.paper-card` | `_layouts/distill.liquid` (`paper:` front matter) | paper-review posts |
| Back link `.back-link` | archive, page and Distill layouts | archives, project pages, posts |
| Footer | `_includes/footer.liquid` | every page |

Page header options: `count: papers | projects | posts | documents` for an automatic count, or `action_url` + `action_text` for a button (CV).

## Scripts

| File | Does |
| --- | --- |
| `assets/js/toc-spy.js` | marks the Distill contents entry for the section being read |
| `assets/js/heading-anchors.js` | adds a `#` after headings in posts/project pages that copies the section link |
| `assets/js/copy_code.js` | labeled "Copy" button on code and BibTeX blocks (upstream file, adjusted) |

## Upstream quirks handled here

These are easy to reintroduce; keep the fixes in mind when editing.

- **CSS minifier**: jekyll-minifier's CSS pass rewrote `calc(var(--nav-height) …)` into invalid CSS, so `compress_css: false` in `_config.yml`. CI fails if `var( -` appears in the built CSS.
- **Colors on spans/divs**: al-folio sets `color` on every `span`/`div`, so inherited colors do not reach them. Set the color on the element itself.
- **Navbar opacity**: upstream fades the whole navbar (text included); `#navbar { opacity: 1 }` keeps only the background translucent.
- **Theme icon offset**: upstream pads the theme icon down by 12px; `html #light-toggle .ti { padding: 0 }` removes it while keeping upstream's show/hide of the three icons.
- **Distill grid**: `d-article` is a grid, so the absolutely positioned contents list needs `grid-area: auto; align-self: stretch` to span the article and stay sticky.
- **Markdown vs components**: content rules target direct children (`.post > article > h2`, `ul:not([class])`) so component headings and lists keep their own spacing.

## Checking changes

1. `bin/site check`: production build plus the CSS integrity check CI runs.
2. Look at home, publications, projects (list and a project), blog (list, a post, a tag page), news, CV and 404.
3. Widths 1600 / 1440 / 1280 / 1024 / 768 / 390 / 320, light and dark.
4. Interactions: mobile menu, contents list while scrolling, section links, Abstract/BibTeX and copy, search (`Ctrl K`), theme toggle.
5. On Windows or with "always show scrollbars", nothing should show a horizontal scrollbar except long equations on phones.
