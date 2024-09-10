import code               from './code.js'
import fencedCode         from './fences.js'
import provideLexer       from './blockLexer.js'
import tokenizeAttributes from './tokenizeAttributes.js'
import withAttributes     from './withAttributes.js'

// built-in:   marked.Renderer.prototype
// extensions: marked.defaults.extensions.renderers

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
    extensions: [code, fencedCode, tokenizeAttributes],
    hooks:      { provideLexer },
    renderer,
  })

}

setup.withAttributes     = withAttributes
setup.tokenizeAttributes = tokenizeAttributes
