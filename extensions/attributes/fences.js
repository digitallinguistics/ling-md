import parseAttributes from 'attributes-parser'

const attrRegExp = /\{(?<attributes>[^\{]+?)\}\s*$/sv // Anchored to end of string, allowing for trailing whitespace.

export default {

  level: `block`,
  name:  `fences`,

  start(src) {
    return src.indexOf(`\`\`\``) === 0
  },

  tokenizer(src) {

    if (!src.startsWith(`\`\`\``)) return

    const token = this.lexer.tokenizer.fences(src)

    if (!token.lang) return token

    const match = attrRegExp.exec(token.lang)

    if (!match) return token

    token.lang       = token.lang.replace(attrRegExp, ``).trim()
    token.attributes = parseAttributes(match.groups.attributes)

    return token

  },

}
