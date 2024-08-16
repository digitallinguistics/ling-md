const boldRegExp = /^\*\*(?<text>.+?)\*\*/v

export default {

  level: `inline`,
  name:  `bold`,

  renderer(token) {
    const innerHTML = this.parser.parseInline(token.tokens)
    return `<b>${ innerHTML }</b>`
  },

  start(src) {
    return src.indexOf(`**`) === 0
  },

  tokenizer(src) {

    const match = boldRegExp.exec(src)

    if (match) {

      const token = {
        raw:    match[0],
        tokens: [],
        type:   `bold`,
      }

      this.lexer.inline(match.groups.text, token.tokens)

      return token

    }

  },

}
