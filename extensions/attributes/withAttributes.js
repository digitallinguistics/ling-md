import { createAttributesString, tagNameRegExp } from './utilities.js'

/**
 * Decorate a rendering function to add attributes to the output HTML.
 * @param {Function} render The original rendering function. Must accept a token and return HTML.
 */
export default function withAttributes(render) {
  return function renderAttributes(token) {
    if (!token.attributes) return render.call(this, token)
    const attributesString = createAttributesString(token.attributes)
    return render.call(this, token).replace(tagNameRegExp, `<$<tag> ${ attributesString }$<suffix>`)
  }
}
