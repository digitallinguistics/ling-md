import parseAttributes from 'attributes-parser'

const attrRegExp = /^\{(?<attributes>.+?)\}/v // Anchored to start of string

export default {

  level: `inline`,
  name:  `attributes`,

  renderer() {
    return ``
  },

  start(src) {
    return src.indexOf(`{`) === 0
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
