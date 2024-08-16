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
    console.log(src, Boolean(match))

    if (match) {

      const token = {
        raw:    match[0],
        tokens: [],
        type:   `inlineExample`,
      }

      this.lexer.inline(match.groups.text, token.tokens)

      return token

    }

  },

}
