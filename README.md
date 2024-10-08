# ling-md

A JS library to convert [linguistics-flavored markdown][spec] to HTML.

This library uses [markdown-it] for converting markdown, with a few custom extensions specific to the ling-md format (see [Notes](#usage-notes) below for details). It also enables several commonly-used markdown extensions that are also relevant to linguistics (such as footnotes).

After conversion, you'll probably still want to apply additional CSS styles to the HTML. For example, grammatical glosses like `^^fut^^` are converted to abbreviation tags such as `<abbr>fut</abbr>`, but abbreviation tags are not styled in smallcaps by default.

## Usage

Install the library:

```cmd
npm i @digitallinguistics/ling-md
```

Create a new parser instance and parse the linguistics-flavored markdown:

```js
import Parser from '@digitallinguistics/ling-md'

const markdown = `The word *perro* in Spanish means ''dog''.`
const parser   = new Parser({ /* options */ })
const html     = parser.parse(markdown)

console.log(html) // <p>The word <i>perro</i> in Spanish means <q>dog</q>.</p>
```

## Features

The library enables the following features by default:

### Linguistics

| Feature             | Markdown                                                                                                                 | HTML                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| grammatical glosses | `^^fut^^`                                                                                                                | `<abbr class="gl">fut</abbr>`                    |
| inline examples     | `The word *perro* is Spanish.`                                                                                           | `<p>The word <i>perro</i> is Spanish.</p>`       |
| inline translations | `The word *perro* means ''dog''.`                                                                                        | `<p>The word <i>perro</i> means <q>dog</q>.</p>` |
| interlinear glosses | <pre><code>\```igl<br>ninakupenda<br>ni-na-ku-pend-a<br>1sg.SUBJ-PRES-2sg.OBJ-love-IND<br>I love you<br>```</code></pre> | [See documentation here.][dlx2html]              |

### General

| Feature                | Markdown                                                                                                     | HTML                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| alerts                 | <pre><code>&gt; [!note]<br>&gt; Note Text</code></pre>                                                       | [See documentation here.][alert]                                                       |
| block attributes       | `# Heading {#intro}`                                                                                         | `<h1 id=intro>Heading</h1>`                                                            |
| bracketed spans        | `[/lɪŋˈɡwɪstɪks/]{.phon}`                                                                                    | `<span class="phon">/lɪŋˈɡwɪstɪks/</span>`                                             |
| checklists             | [See documentation here.][checklists]                                                                        |                                                                                        |
| definition lists       | [See documentation here.][def-lists]                                                                         |                                                                                        |
| fenced code attributes | <pre><code>\```js {.code-example}<br>console.log('Hello world!')<br>```</code></pre>                         | `<pre><code class="language-js code-example">console.log('Hello world!')</code></pre>` |
| footnotes              | <pre><code>Here is a footnote reference,[^1] and some more text.\n\n[^1]: Here is the footnote.</code></pre> | [See example here.][fn]                                                                |
| header anchors         | `# Header Title`                                                                                             | `<h1 id="header-title">Header Title</h1>`                                              |
| HTML                   | `<b>bold</b>`                                                                                                | `<b>bold</b>`                                                                          |
| inline attributes      | `*perro*{.example lang=spa}`                                                                                 | `<i class="example" lang="spa>perro</i>`                                               |
| inserted text          | `++inserted text++`                                                                                          | `<ins>inserted text</ins>`                                                             |
| marked text            | `==marked text==`                                                                                            | `<mark>marked text</mark>`                                                             |
| math (LaTeX)           | `Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.`                                  | (Outputs an image.)                                                                    |
| smart quotes           | `"Hello world!"`                                                                                             | `“Hello world!”`                                                                       |
| tables                 | [See documentation here.][tables]                                                                            |                                                                                        |
| strikethrough          | `~~This was mistaken text.~~`                                                                                | `<s>This was mistaken text.</s>`                                                       |
| subscript              | `~subscript~`                                                                                                | `<sub>subscript</sub>`                                                                 |
| summary + details      | [See documentation here.][summary-details]                                                                   |                                                                                        |
| superscript            | `^superscript^`                                                                                              | `<sup>superscript</sup>`                                                               |
| table captions         | [See documentation here][table-captions]                                                                     |                                                                                        |
| table of contents      | `[[toc]]`                                                                                                    | [See documentation here.][toc]                                                         |
| typography             | `-- --- ... 1st 2nd 3rd 4th 1/3 3/4`                                                                         | `– — … 1<sup>st</sup> 2<sup>nd</sup> 3<sup>rd</sup> 4<sup>th</sup> ⅓ ¾`                |

## Usage Notes

- Most markdown libraries convert single asterisks (`*perro*`) to emphasis (`<em>perro</em>`), but `ling-md` converts them to [idiomatic text][i] (`<i>perro</i>`). Use `**double asterisks**` for bold instead. (See ["you're using &lt;em&gt; wrong"][em-article] by Facundo Corradini for more information.)
- Attributes may be added in a variety of formats. See the [`attributes-parser`][attrs-parser] library for a complete list. The most common ones are:
  - `.className` > `class="className"`
  - `#name` > `id="name"`
  - `attr=val` > `attr="val"` (`data-*` attributes also work)
- There is no markdown shortcut for underlining. Use the `<u>` tag instead.
- You can enter interlinear glossed examples in [Scription] format, using fenced code blocks, like so:

  ````
  ```igl
  ninakupenda
  ni-na-ku-pend-a
  1sg.SUBJ-PRES-2sg.OBJ-love-IND
  I love you
  ```
  ````

  Note that you can enter multiple examples in a single code block, separated by a blank line.

  You can also pass options to both the `scription2dlx` and `dlx2html` libraries by including those options in the YAML header of the interlinear, like so:

  ````
  ```igl
  ---
  dlx2html:
    glosses: true
  scription2dlx:
    emphasis: false
  ---

  ninakupenda
  ni-na-ku-pend-a
  1sg.SUBJ-PRES-2sg.OBJ-love-IND
  I love you
  ```
  ````

## API

### `marked`

Provides access to the `marked` instance for further customization.

### `parse(md)`

Parse a markdown string using the current options and return HTML.

### Options

| Option          | Type      | Default                                                                | Description                                                                                                                                                                                                                                                                                                                  |
| --------------- | --------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dlx2html`      | Object    | [See documentation here.][dlx2html]                                    | Options to pass to `dlx2html` (the library that converts interlinear examples to HTML). If options are provided in a YAML header within fenced code blocks, those options override these ones.                                                                                                                               |
| `markdown`      | Object    | <pre><code>{<br>  html: true,<br>  typographer: true<br>}</code></pre> | Options to pass to `markdown-it`. `typographer` and `html` are enabled by default.                                                                                                                                                                                                                                           |
| `plugins`       | Object    | `{}`                                                                   | Options to pass to any of the `markdown-it` plugins. Each key should be the name of the plugin, and the value is the options to pass to it. Example: `{ '@mdit/plugin-alert': { /* options */ } }` You can see a complete list of the `markdown-it` plugins that are used in this library in the source code [here][source]. |
| `translations`  | `span\|q` | `span`                                                                 | Whether to use `<span class=tln>` or a `<q>` element for translations. `<span>`s will wrap the inner text in single quotes.                                                                                                                                                                                                  |
| `scription2dlx` | Object    | [See documentation here.][scription2html]                              | Options to pass to `scription2html` (the library that parses interlinear examples). If options are provided in a YAML header within fenced code blocks, those options override these ones.                                                                                                                                   |

<!-- LINKS -->
[alert]:           https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts
[attrs-parser]:    https://www.npmjs.com/package/attributes-parser
[checklists]:      https://www.markdownguide.org/extended-syntax/#task-lists
[def-lists]:       https://pandoc.org/MANUAL.html#definition-lists
[dlx2html]:        https://github.com/digitallinguistics/dlx2html
[em-article]:      https://blog.logrocket.com/youre-using-em-wrong/
[fn]:              https://mdit-plugins.github.io/footnote.html
[i]:               https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i
[markdown-it]:     https://github.com/markdown-it/markdown-it#readme
[Scription]:       https://scription.digitallinguistics.io/
[scription2html]:  https://github.com/digitallinguistics/scription2html
[spec]:            https://github.com/digitallinguistics/ling-markdown-spec
[source]:          https://github.com/digitallinguistics/ling-md/blob/main/index.js
[summary-details]: https://www.npmjs.com/package/markdown-it-collapsible
[table-captions]:  https://github.com/martinring/markdown-it-table-captions
[tables]:          https://www.markdownguide.org/extended-syntax/#tables
[toc]:             https://www.npmjs.com/package/markdown-it-table-of-contents
