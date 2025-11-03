## About
'Ambitious' is a theme that I originally thought would be overly ambitious to theme my own website. I started with the [blowfish](https://blowfish.page/) theme, but quickly realized that I wanted to make changes that were not trivial. Additionally, while it is lightweight, it is designed around making things work well in multiple languages and offers a high degree of customization, if you want something that it's designed for. 

I wanted a theme that was even lighter, but still accomplished many of the things I want. Taking some inspiration from [Tufte CSS](https://edwardtufte.github.io/tufte-css/), I've changed it a bit and modified it to be easier to extend.

Additionally, the theme is compliant with the newer Hugo templating style (as of 0.146.0), and Tailwind v4.

TailwindCSS Typography is used because this is effectively the main use case for such.

JavaScript and Fonts are stored locally and served up, with minimal external dependencies required. Tailwind is installed locally to generate the CSS files, and the Hugo integration is leveraged to minimize the calls.

## Installation and Usage
To use this theme, you'll need to add it as a git submodule, then install Tailwind CSS v4 in your main directory, along with Tailwind Typography.

```bash
npm install -D @tailwindcss/tailwindcss @tailwindcss/typography
```

> [!CAUTION]
> Windows users:
>
> There is an issue where Tailwind CSS will not run properly if there is a space in *any part* of the base directory to your project. This is a problem with Hugo, see Hugo issues [17149](https://github.com/golang/go/issues/17149) and [7333](https://github.com/gohugoio/hugo/issues/7333)

> [!INFO]
> Some browsers will cache the page styles, and will not see updates unless you refresh the page and clear the cache. On Chrome, shift-click the reload button (or Shift+F5) to reload the styles.

## TODO:
 - Issues with rendering unnecessarily short articles--content is shrunk
 - Recipe template
 - Theme coloring
 - Scroll-to-top button overlaps with next/prev article footer
 - Taxonomy pages
 - Posts Pages
 - Switch archetype templates to YAML
 - Theme attribution
 - Does title display properly if longer than column width?
 - Color transitions from light <-> dark seem inconsistent because of background image
 - Pagination on the post listing