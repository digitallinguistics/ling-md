const inexRegExp = /^\*(?!\*)(?<text>.+)\*(?!\*)/v

export default {

  level: `inline`,
  name:  `inlineExample`,

  renderer(token) {
    const innerHTML = this.parser.parseInline(token.tokens)
    return `<i>${ innerHTML }</i>`
  },

  start(src) {
    return src.indexOf(`*`) === 0
  },

  tokenizer(src) {

    const match = inexRegExp.exec(src)

    if (match) {

      const token = {
        raw:    match[0],
        text:   match.groups.text,
        tokens: [],
        type:   `inlineExample`,
      }

      this.lexer.inline(match.groups.text, token.tokens)

      return token

    }

  },

}
