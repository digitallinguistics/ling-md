import codeAttributes       from './codeAttributes.js'
import fencedCodeAttributes from './fencedCodeAttributes.js'
import inlineAttributes     from './inlineAttributes.js'
import provideLexer         from './blockLexer.js'
import withAttributes       from './withAttributes.js'

const blockMethods = [
  `code`, // Requires special handling because attributes don't go on the outer element.
  `constructor`,
]

export default function setup(marked) {

  const baseMethodNames = Object.getOwnPropertyNames(marked.Renderer.prototype).filter(name => !blockMethods.includes(name))
  const extensionNames  = Object.keys(marked.defaults.extensions.renderers)

  const renderer = {}

  for (const name of baseMethodNames) {
    renderer[name] = withAttributes(marked.Renderer.prototype[name])
  }

  for (const name of extensionNames) {
    marked.defaults.extensions.renderers[name] = withAttributes(marked.defaults.extensions.renderers[name])
  }

  marked.use({
    extensions: [codeAttributes, fencedCodeAttributes, inlineAttributes],
    hooks:      { provideLexer },
    renderer,
  })

}
