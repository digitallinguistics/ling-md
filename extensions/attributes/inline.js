import parseAttributes from 'attributes-parser'
import { createAttributesString, tagNameRegExp } from './utilities.js'

const attrRegExp = /^\{(?<attributes>.+?)\}/v // Anchored to start of string
const name       = `inline-attributes`

export default {

  level: `inline`,

  name,

  renderer(token) {

    if (token.originalType === name) return ``

    token.type = token.originalType

    const attributesString = createAttributesString(token.attributes)

    return this.parser
      .parse([token])
      .replace(tagNameRegExp, `<$<tag> ${ attributesString }$<suffix>`)

  },

  start(src) {
    return src.indexOf(`{`) === 0
  },

  tokenizer(src, tokens) {

    const match = attrRegExp.exec(src)
    const token = tokens.at(-1)

    if (match && tokens.length) {

      token.attributes   = parseAttributes(match.groups.attributes)
      token.originalType = token.type
      token.type         = name

      return {
        originalType: name,
        raw:          match[0],
        type:         name,
      }

    }

  },

}
