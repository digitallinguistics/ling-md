# ling-md

A JS library to convert [linguistics-flavored markdown][spec] to HTML.

Uses the [marked] library for conversion, with a few custom extensions specific to the ling-md format (see [Notes](#notes) below for details). Also enables several commonly-used markdown extensions that are also relevant to linguistics.

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

## API

### `marked`

Provides access to the `marked` instance for further customization.

### `parse(md)`

Parse a markdown string using the current options and return HTML.

## Usage Notes

- Most markdown libraries convert single asterisks (`*perro*`) to emphasis (`<em>perro</em>`), but `ling-md` converts them to [idiomatic text][i] (`<i>perro</i>`). Use `**double asterisks**` for bold instead.
- Attributes may be added in a variety of formats. See the [`attributes-parser`][attrs-parser] library for a complete list. The most common ones are:
  - `.className` > `class="className"`
  - `#name` > `id="name"`
  - `attr=val` > `attr="val"` (`data-*` attributes also work)

<!-- LINKS -->
[attrs-parser]: https://www.npmjs.com/package/attributes-parser
[i]:            https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i
[marked]:       https://marked.js.org/
[spec]:         https://github.com/digitallinguistics/ling-markdown-spec
