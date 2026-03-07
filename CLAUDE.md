# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal academic website for Jianhao Jiao, built on the **al-folio** Jekyll theme. Deployed at `https://gogojjh.github.io` via GitHub Pages (served from the `gh-pages` branch, built by GitHub Actions on push to `master`).

## Development Commands

**Local development (Docker — recommended):**
```bash
docker-compose up
# Site available at http://localhost:8080
```

**Local development (Ruby):**
```bash
bundle install
bundle exec jekyll serve --lsi
```

**Build only:**
```bash
bundle exec jekyll build --lsi
# or
bin/cibuild
```

Deployment is fully automated via `.github/workflows/deploy.yml` — just push to `master`.

## Content Structure

| Directory/File | Purpose |
|---|---|
| `_config.yml` | Main Jekyll config (site metadata, theme options, plugins) |
| `_pages/` | Top-level pages: `about.md`, `cv.md`, `publications.md`, `projects.md`, `resources.md` |
| `_news/` | News/announcement snippets (Markdown, shown on home page) |
| `_projects/` | Project portfolio entries |
| `_posts/` | Blog posts (minimal usage) |
| `_bibliography/papers.bib` | BibTeX file — single source of truth for all publications |
| `_data/cv.yml` | Structured CV data (education, experience, skills) |
| `_data/coauthors.yml` | Co-author profiles for automatic name linking in publications |
| `_data/venues.yml` | Conference/journal venue info |
| `assets/img/` | Images; `assets/pdf/` for PDFs, slides, posters |

## Key Architecture

**Publications** are auto-generated from `_bibliography/papers.bib` by `jekyll-scholar`. The `publications.md` page renders them with interactive filtering. Custom per-entry buttons (PDF, code, poster, slides, website) are set via BibTeX fields. Co-author names are automatically linked using `_data/coauthors.yml`. The owner's name is underlined automatically.

**News items** in `_news/` are Markdown files shown on the home page (`_pages/about.md`). The `_config.yml` controls how many items display (`announcements: scrollable: true`, `limit: 10`).

**Projects** in `_projects/` support category filtering (configured via `enable_project_categories: true` in `_config.yml`).

**Image optimization**: ImageMagick generates responsive WebP variants (480px, 800px, 1400px) automatically at build time when enabled in `_config.yml`.

**Math**: MathJax 3.2.0 — use standard LaTeX syntax in Markdown content.

## Technology Stack

- **Jekyll** with kramdown (Markdown), Rouge (syntax highlighting)
- **Bootstrap 4.6.1**, jQuery 3.6.0
- **jekyll-scholar** — BibTeX bibliography management
- **jekyll-imagemagick** — Responsive image generation
- **MathJax 3.2.0** — Math rendering
- **Giscus** — Comments via GitHub Discussions
- **FontAwesome 5** + **Academicons** — Icons
