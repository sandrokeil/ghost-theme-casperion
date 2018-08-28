# Casperion Ghost theme

> Full text search

> Highlight.js integration

> Minified css and js

**Casperion** is a free Ghost theme. The theme is based upon original Ghost theme [Casper](https://github.com/TryGhost/Casper) with some minor modifications and extensions.

## [Casperion Demo](https://sandro-keil.de/blog/)

Casperion is a lightweight and speed optimized theme for Ghost. Casperion theme gets Grade A for both PageSpeed and
YSlow reported by [GTmetrix](http://gtmetrix.com).

[![Grade A](docs/casperion_gtmetrix.jpg)](https://sandro-keil.de/blog/ "Blog by Sandro Keil")

## Full Features

**Casperion** theme is packaged with full powerful features so you can get started building your blog easily.
It's planned to update this theme consistently depending on Casper theme changes.

### Full Ghost 2.0 support
Casperion supports latest Ghost version.

### GhostHunter
[GhostHunter](https://github.com/jamalneufeld/ghostHunter) provides Casperion full text searching right in the blog without
having to resort to any third-party solutions, by utilizing the Ghost API.

### Highlight.JS
[Highlight.js](http://highlightjs.org/) highlights syntax in code examples on Casperion blog. It's very easy to use
because it works automatically: finds blocks of code, detects a language, highlights it. Highlight.js is only loaded if
a code block was detected in blog post.

## Docker
It's very easy to build the assets with [Docker](https://www.docker.com/). Make sure you run the Docker container from
the root dir of this source.

```bash
$ docker run --rm -it --volume $(pwd):/app sandrokeil/typescript yarn install
$ docker run --rm -it --volume $(pwd):/app sandrokeil/typescript gulp zip
```