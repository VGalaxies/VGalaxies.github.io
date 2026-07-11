# VGalaxies.github.io

Deployment repository for the [VGalaxies website](https://vgalaxies.github.io/) and its [Visual Reading archive](https://vgalaxies.github.io/visual-reading/).

The site is built with Jekyll and published through GitHub Pages from the `main` branch. Jekyll renders the home page and archive, while each Visual Reading note is served as a standalone page with any required assets stored alongside it.

## Repository structure

```text
_data/visual_reading.yml                 Archive metadata and tags
_layouts/default.html                    Shared site shell
_pages/visual-reading.md                 Visual Reading archive
assets/                                  Shared site styles and scripts
files/visual-reading/<slug>/             Published notes and their assets
index.md                                 Home page
```

## Legacy Hugo site

The previous Hugo site is preserved in the [`backup/hugo-site-2024`](https://github.com/VGalaxies/VGalaxies.github.io/tree/backup/hugo-site-2024) branch.
