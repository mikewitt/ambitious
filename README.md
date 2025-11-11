## About
'Ambitious' is a theme that I originally thought would be overly ambitious to theme my own website. I started with the [blowfish](https://blowfish.page/) theme, but quickly realized that I wanted to make changes that were not trivial. Additionally, while it is lightweight, it is designed around making things work well in multiple languages and offers a high degree of customization, if you want something that it's designed for. But, that's not what I wanted or needed.

> [!NOTE]
> There are a number of features that are used that are only very recently added, some of which don't work in Firefox. It shouldn't cause any issues in incompatible browsers, per se, but it may not look as good except in very recent versions of Chrome (such as the `first-letter` CSS selector, or the `text-wrap:pretty` style).

I wanted a theme that was even lighter, but still accomplished many of the things I want. Taking some inspiration from [Tufte CSS](https://edwardtufte.github.io/tufte-css/), I've changed it a bit and modified it to be easier to extend.

Additionally, the theme is compliant with the newer Hugo templating style (as of 0.146.0), and Tailwind v4.

TailwindCSS Typography is used because this is effectively the main use case for such.

JavaScript and Fonts are stored locally and served up, with minimal external dependencies required. Tailwind is installed locally to generate the CSS files, and the Hugo integration is leveraged to minimize the calls.

## Installation and Usage
Start with either an existing site, or a new site based on `hugo new site`.

### Adding the theme
The way I would suggest using this theme is as a git submodule. Add it via command line:

```bash
git submodule add -b main https://github.com/mikewitt/ambitious themes/ambitious
```

Select the theme in your `hugo.(toml|yaml)` with the base `theme: ambitious`

> [!NOTE]
> Until you've also installed the tailwind dependencies as outlined below, this will still not work.

It is also recommended that you either delete archetypes from your base directory, or overwrite them with the ones in `themes/ambitious/archetypes` (the former being preferred--Hugo will pull archetypes from the theme if the base folder is empty).

### Dependencies

To use this theme, you'll need to add it as a git submodule, then install Tailwind CSS v4 in your main directory, along with Tailwind Typography. Install `npm` per your system requirements, then run:

```bash
npm install -D tailwindcss @tailwindcss/cli @tailwindcss/typography
```

This will create a new folder, `node_modules` in your project. I think that typically, people would choose to add this to their `.gitignore`, however, for deploying to a service such as Cloudflare Pages, that will be required to generate the themes via Hugo. So, leave it in, and commit it to your branch. Not sure I like that but it is what it is.

> [!CAUTION]
> Windows users:
>
> There is an issue where Tailwind CSS will not run properly if there is a space in *any part* of the base directory to your project. This is a problem with Hugo, see Hugo issues [17149](https://github.com/golang/go/issues/17149) and [7333](https://github.com/gohugoio/hugo/issues/7333)

With this setup, you should now be able to write/develop using `hugo serve --disableFastRender`. Tailwind styles will be recomputed every time, but it has not been particularly slow in my experience.

> [!IMPORTANT]
> Some browsers will cache the page styles, and will not see updates unless you refresh the page and clear the cache. On Chrome, shift-click the reload button (or Shift+F5) to force the browser to ignore the cache and hard refresh the page. So, style changes may not be reflected until you hard refresh the page.

# Usage Notes:
Extremely long articles may break certain things with the style. In particular, if the TOC is long enough that it needs a scroll bar, I'm not sure how it will behave, or if it will behave properly.

## TODO:
  - Recipe template
  - Color transitions from light <-> dark seem inconsistent because of background image
  - Pagination on the post listing
  - Print-optimized version
  - Image rendering and options for floating and full-bleed width

### FIXME:
  - breakpoints for scaling content
    - full-bleed
    - md->lg margins
  - We can customize the rendering of the TOC with the `fragments` bit
  - Epigraphs at the start of an article are included in the summary