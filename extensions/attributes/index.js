import parseAttributes from 'attributes-parser'

import { Marked, Renderer } from 'marked'

import { createAttributesString, tagNameRegExp } from './utilities.js'

const attrRegExp = /^\{(?<attributes>.+?)\}/v // Anchored to start of string

const tokenizeAttributes = {

  level: `inline`,

  name: `attributes`,

  renderer() {
    return ``
  },

  tokenizer(src, tokens) {

    const match = attrRegExp.exec(src)
    const token = tokens.at(-1)

    if (match && tokens.length) {

      token.attributes = parseAttributes(match.groups.attributes)

      return {
        raw:  match[0],
        type: `attributes`,
      }

    }

  },

}

/**
 * Decorate a rendering function to add attributes to the output HTML.
 * NB: You'll probably want to bind the original rendering function to `this`.
 * @param {Function} render The original rendering function. Must accept a token and return HTML.
 */
function withAttributes(render) {
  return function renderAttributes(token) {
    if (!token.attributes) return render.call(this, token)
    const attributesString = createAttributesString(token.attributes)
    return render.call(this, token).replace(tagNameRegExp, `<$<tag> ${ attributesString }$<suffix>`)
  }
}

// built-in:   marked.Renderer.prototype
// extensions: marked.defaults.extensions.renderers

function override(marked) {

  const methods         = new Renderer(marked.defaults)
  const baseMethodNames = Object.getOwnPropertyNames(marked.Renderer.prototype).filter(name => name !== `constructor`)
  const extensionNames  = Object.keys(marked.defaults.extensions.renderers)

  const renderer = {}

  for (const name of baseMethodNames) {
    renderer[name] = withAttributes(methods[name])
  }

  for (const name of extensionNames) {
    marked.defaults.extensions.renderers[name] = withAttributes(marked.defaults.extensions.renderers[name])
  }

  marked.use({ renderer })

}

export { override, tokenizeAttributes, withAttributes }
