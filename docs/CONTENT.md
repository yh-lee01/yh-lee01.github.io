# Content guide

How to add and update each kind of content. Every example below uses fields the templates actually read.
Run `bin/site serve` while editing; pages rebuild on save.

- [Home page](#home-page)
- [Blog posts](#blog-posts)
- [Publications](#publications)
- [Projects](#projects)
- [News](#news)
- [CV](#cv)
- [Links and co-authors](#links-and-co-authors)
- [Writing tips](#writing-tips)

## Home page

`_pages/about.md`

```yaml
---
layout: about
permalink: /
subtitle: >
  Senior Undergraduate, Computer Science and Engineering, <a href="https://www.skku.edu">Sungkyunkwan University</a>
status: Seeking graduate research positions for Fall 2027   # accent line with a dot; delete to hide
profile:
  image: profile_pic.jpg        # file in assets/img/
selected_papers: true           # shows BibTeX entries with selected = {true}
social: true                    # the email · GitHub · LinkedIn · CV line
announcements:
  enabled: true
  limit: 8                      # news items on the home page; "All news →" appears only when there are more
---

Introduction in Markdown. `## research interests` and other `##` headings get the home section style.
```

## Blog posts

Create `_posts/YYYY-MM-DD-short-title.md`. The URL becomes `/blog/YYYY/short-title/`.

```yaml
---
layout: distill                 # Distill article: title, byline, side contents, appendix
title: Flow Matching for Generative Modeling
description: One or two sentences. Shown under the title, in the blog list and in link previews.
date: 2026-04-04
categories: [paper-review]      # first one is the label on the blog card ("Paper review")
tags: [flow-matching, generative-models]   # first three show on the card
authors:
  - name: Yohan Lee
    url: https://yh-lee01.github.io
    affiliations:
      name: Sungkyunkwan University
paper:                          # optional: "paper reviewed" card + reference in the appendix
  title: Flow Matching for Generative Modeling
  authors: Y. Lipman, R. T. Q. Chen, H. Ben-Hamu, M. Nickel, M. Le
  venue: ICLR 2023
  url: https://arxiv.org/abs/2210.02747
toc:                            # contents list; names must match the ## headings exactly
  - name: Overview
  - name: Summary
related_posts: true
---

## Overview
...
```

- The contents list sits beside the article on wide screens (1280px+), follows the scroll and marks the current section; on smaller screens it appears above the article.
- Every `##`/`###` heading gets a `#` link that copies a link to that section.
- Reading time is computed automatically.
- Images: `{% include figure.liquid path="assets/img/my-figure.png" caption="…" %}`.
- A regular (non-Distill) post also works with `layout: post`.

## Publications

Add an entry to `_bibliography/papers.bib`. Standard BibTeX fields plus these extras:

```bibtex
@article{lee2026scfm,
  title      = {Generate and Calibrate: Spectral Contrastive Flow Matching for Audio-Visual Sound Separation},
  author     = {Lee*, Yohan and Oh*, Sujung and Ko, Gaeun and Lee†, Sangmin},
  journal    = {Under review},
  year       = {2026},
  abstract   = {Shown behind the "Abstract" button.},
  bibtex_show = {true},          % "BibTeX" button with a copy button
  selected   = {true},           % also listed on the home page
  preview    = {scfm.jpg},       % thumbnail in assets/img/publication_preview/
  annotation = {* Equal contribution<br>† Corresponding author},  % the (i) tooltip after the authors
  pdf        = {paper.pdf},      % file in assets/pdf/ or a full URL
  arxiv      = {2401.00000},
  code       = {https://github.com/…},
  website    = {https://…},
}
```

- Your own name is bolded using `scholar.last_name` / `scholar.first_name` in `_config.yml`.
- `*`, `†` after a name become superscripts.
- Co-author names link to the URLs in `_data/coauthors.yml`.
- More button fields: `html`, `slides`, `poster`, `video`, `supp`, `blog`, `award`/`award_name`.
- The count in the page header updates itself. The filter box and year headings appear once there are 5 or more papers.
- Thumbnails read best as a cropped key figure (about 3:2), not the whole paper figure.

## Projects

Create `_projects/short-name.md`:

```yaml
---
layout: page
title: Sign Language Interpreter in Emergency Situations
description: One-line summary shown on the projects list.
importance: 1                   # lower comes first
chip: Grand Prize · 2023        # small label above the title
tech: [python, flutter, mediapipe]
youtube: tTR6bGrUP0c            # optional: video thumbnail on the list + embedded player you place on the page
img: assets/img/sign.png        # used when there is no video (and as a fallback share image)
github: https://github.com/…    # optional "Code" link
# redirect: https://…           # optional: link the list entry somewhere else
---
```

Embed the video on the page body:

```html
<div class="video-embed">
  <iframe src="https://www.youtube-nocookie.com/embed/{{ page.youtube }}?rel=0"
          title="{{ page.title }} — demo video" loading="lazy" allowfullscreen></iframe>
</div>
<p class="caption">Demo video · <a href="https://www.youtube.com/watch?v={{ page.youtube }}">Watch on YouTube</a></p>
```

## News

Create `_news/YYYY-MM-DD-short-name.md`:

```yaml
---
layout: post
date: 2026-04-15
inline: true                    # one-line item, no separate page
type: paper                     # paper · post · joined · award · update (colored dot label)
---

Submitted **SCFM-AVSS** paper (under review)
```

## CV

1. Replace `assets/pdf/YohanLee_CV.pdf` (or point `cv_pdf` in `_pages/cv.md` at a new file).
2. Update the date in `_pages/cv.md`: `description: Last updated July 29, 2026.`

Desktop shows the PDF inline; phones get an "Open CV (PDF)" button.

## Links and co-authors

`_data/socials.yml` drives the home link line and the search entries:

```yaml
email: you@example.com
github_username: your-github
linkedin_username: your-linkedin
scholar_userid: XXXXXXXXXXXX    # adds "Scholar" to the home page
rss_icon: true                  # RSS link in the footer
```

`_data/coauthors.yml` maps last names to co-author homepages; `_data/venues.yml` sets venue badge colors (`abbr` field).

## Writing tips

- **Inline math with two or more `_`** can be read as Markdown emphasis. Use `$$...$$` (kramdown inline math) instead of `$...$` on that line.
- Long display equations scroll inside their own box on phones; nothing to do.
- Keep headings in sentence case ("Why it matters for robotics"); proper names keep their capitals.
