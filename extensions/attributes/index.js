import tokenizeAttributes from './tokenizeAttributes.js'
import withAttributes     from './withAttributes.js'

import setupBlockAttributes from './block.js'

// built-in:   marked.Renderer.prototype
// extensions: marked.defaults.extensions.renderers

export default function setup(marked) {

  const baseMethodNames = Object.getOwnPropertyNames(marked.Renderer.prototype).filter(name => name !== `constructor`)
  const extensionNames  = Object.keys(marked.defaults.extensions.renderers)

  const renderer = {}

  for (const name of baseMethodNames) {
    renderer[name] = withAttributes(marked.Renderer.prototype[name])
  }

  for (const name of extensionNames) {
    marked.defaults.extensions.renderers[name] = withAttributes(marked.defaults.extensions.renderers[name])
  }

  marked.use({
    extensions: [tokenizeAttributes],
    renderer,
  })

  // TODO: Invert dependency injection here once you decide how the block extension will work.
  setupBlockAttributes(marked)

}

setup.withAttributes     = withAttributes
setup.tokenizeAttributes = tokenizeAttributes
