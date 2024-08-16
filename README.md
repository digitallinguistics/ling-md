# ling-md

A JS library to convert linguistics-flavored markdown to HTML. Uses the [marked] library for conversion, with a few custom extensions specific to the ling-md format.

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

<!-- LINKS -->
[marked]: https://marked.js.org/
