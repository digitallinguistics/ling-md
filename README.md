# ling-md

A JS library to convert [linguistics-flavored markdown][spec] to HTML.

Uses the [marked] library for conversion, with a few custom extensions specific to the ling-md format (see [Notes](#notes) below for details). Also enables a number of other markdown extensions commonly used in linguistics by default.

After conversion, you'll probably still want to apply additional CSS styles. For example, grammatical glosses like `^^fut^^` are converted to abbreviation tags such as `<abbr>fut</abbr>`, but abbreviation tags are not styled in smallcaps by default.

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

| Feature         | Markdown                        | HTML         |
| --------------- | ------------------------------- | ------------ |
| inline examples | `The word *perro* means 'dog'.` | `<i>fut</i>` |

### General

🚧 COMING SOON 🚧

## API

### `marked`

Provides access to the `marked` instance for further customization.

### `parse(md)`

Parse a markdown string using the current options and return HTML.

## Notes

- Most markdown libraries convert single asterisks (`*perro*`) to emphasis (`<em>perro</em>`), but `ling-md` converts them to [idiomatic text][i] (`<i>perro</i>`).

<!-- LINKS -->
[i]:      https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i
[marked]: https://marked.js.org/
[spec]:   https://github.com/digitallinguistics/ling-markdown-spec
