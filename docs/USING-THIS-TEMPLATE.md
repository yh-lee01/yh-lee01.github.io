# Using this repository for your own site

The code is MIT-licensed (see `LICENSE`); the content is personal. Replace everything in the checklist before publishing.

## 1. Repository and GitHub Pages

1. Fork or copy the repository and name it `<your-username>.github.io` (or any name, see `baseurl` below).
2. Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main` or `master`; `.github/workflows/deploy.yml` builds and deploys.

## 2. Settings (`_config.yml`, top section)

| Key | Set to |
| --- | --- |
| `first_name`, `last_name` | your name (navbar, home title, footer, share metadata) |
| `description`, `keywords` | search/share description |
| `url` | `https://<your-username>.github.io` |
| `baseurl` | `""` for a user site, `"/repo-name"` for a project site |
| `og_image` | default share image, e.g. `assets/img/profile_pic.jpg` |
| `blog_name`, `blog_description` | blog page title and line under it |
| `scholar.last_name`, `scholar.first_name` | how your name appears in BibTeX, so it is bolded |

Leave the sections below "Jekyll settings" alone unless you are changing theme features.

## 3. Personal content to replace

| Replace | Where |
| --- | --- |
| Home text, status line | `_pages/about.md` |
| Profile photo | `assets/img/profile_pic.jpg` |
| Favicon initials | `assets/img/favicon.svg` (the `YL` text) |
| Email and profile links | `_data/socials.yml` |
| Co-author homepages | `_data/coauthors.yml` |
| Publications and thumbnails | `_bibliography/papers.bib`, `assets/img/publication_preview/` |
| Posts | `_posts/` |
| Projects and their images | `_projects/`, `assets/img/` |
| News | `_news/` |
| CV | `assets/pdf/*.pdf`, `_pages/cv.md` (`cv_pdf`, date) |
| README screenshots | `docs/images/` |

## 4. Look and feel

- Accent color: `--global-theme-color` / `--global-hover-color` in `_sass/site/_tokens.scss` (light and dark blocks). Update the `theme-color` meta colors in `_includes/head.liquid` if you change the background.
- Column width: `--reading-width` (keep 680–760px for comfortable reading).
- Fonts: `third_party_libraries.google_fonts` in `_config.yml` and `--font-sans` / `--font-mono`.
- Navigation: pages with `nav: true` and `nav_order` in `_pages/`.

See [DESIGN.md](DESIGN.md) for tokens and components and [CONTENT.md](CONTENT.md) for adding content.

## 5. Optional features

In `_config.yml`: `giscus` (comments), `newsletter`, analytics (`enable_google_analytics` …), `search_enabled`, `enable_darkmode`, `enable_math`, `enable_progressbar`, `back_to_top`.
