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
const parser   = new Parser
const html     = parser.parse(markdown)

console.log(html) // <p>The word <i>perro</i> in Spanish means <q>dog</q>.</p>
```

## Features

The library enables the following features by default:

### Linguistics

| Feature         | Markdown                       | HTML                                       |
| --------------- | ------------------------------ | ------------------------------------------ |
| inline examples | `The word *perro* is Spanish.` | `<p>The word <i>perro</i> is Spanish.</p>` |

### General

| Feature                | Markdown                                                                             | HTML                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| block attributes       | `# Heading {#intro}`                                                                 | `<h1 id=intro>Heading</h1>`                                                            |
| fenced code attributes | <pre><code>\```js {.code-example}<br>console.log('Hello world!')<br>```</code></pre> | `<pre><code class="language-js code-example">console.log('Hello world!')</code></pre>` |
| inline attributes      | `*perro*{.example lang=spa}`                                                         | `<i class="example" lang="spa>perro</i>`                                               |
| smart quotes           | `"Hello world!"`                                                                     | `“Hello world!”`                                                                       |
| tables                 | [See documentation here.][tables]                                                    |                                                                                        |
| strikethrough          | `~~This was mistaken text.~~`                                                        | `<s>This was mistaken text.</s>`                                                       |
| typography             | `-- --- ...`                                                                         | `– — …`                                                                                |

## API

### `marked`

Provides access to the `marked` instance for further customization.

### `parse(md)`

Parse a markdown string using the current options and return HTML.

## Usage Notes

- Most markdown libraries convert single asterisks (`*perro*`) to emphasis (`<em>perro</em>`), but `ling-md` converts them to [idiomatic text][i] (`<i>perro</i>`). Use `**double asterisks**` for bold instead. (See ["you're using &lt;em&gt; wrong"][em-article] by Facundo Corradini for more information.)
- Attributes may be added in a variety of formats. See the [`attributes-parser`][attrs-parser] library for a complete list. The most common ones are:
  - `.className` > `class="className"`
  - `#name` > `id="name"`
  - `attr=val` > `attr="val"` (`data-*` attributes also work)
- There is no markdown shortcut for underlining. Use the `<u>` tag instead.

<!-- LINKS -->
[attrs-parser]: https://www.npmjs.com/package/attributes-parser
[em-article]:   https://blog.logrocket.com/youre-using-em-wrong/
[i]:            https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i
[markdown-it]:  https://github.com/markdown-it/markdown-it#readme
[spec]:         https://github.com/digitallinguistics/ling-markdown-spec
[tables]:       https://www.markdownguide.org/extended-syntax/#tables
