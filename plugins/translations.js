const tlnRegExp = /''(?<tln>.+?)''/gv

function tokenize(state) {

  const { Token } = state

  for (const token of state.tokens) {

    if (token.type !== `inline`) continue

    const inlineTokens = token.children

    for (const inlineToken of inlineTokens) {

      if (inlineToken.type !== `text`) continue

      const { content } = inlineToken
      const matches     = Array.from(content.matchAll(tlnRegExp))

      if (!matches.length) continue

      const newTokens = []
      let   lastIndex = 0 // The index of the end of the previous match.

      for (const match of matches) {

        // If there is text between the end of the previous match and the start of this match, add it as a text token.
        if (match.index > lastIndex) {
          const textToken = new Token(`text`, ``, 0)
          textToken.content = content.slice(lastIndex, match.index)
          newTokens.push(textToken)
        }

        // Add the opening tag.
        const openingTag = new Token(`html_inline`, ``, 0)
        openingTag.content = `<q>`

        // Add the content of the translation.
        const contentToken = new Token(`text`, ``, 0)
        contentToken.content = match.groups.tln

        // Add the closing tag.
        const closingTag = new Token(`html_inline`, ``, 0)
        closingTag.content = `</q>`

        newTokens.push(openingTag, contentToken, closingTag) // Add the new tokens.
        lastIndex = match.index + match[0].length            // Update the index of the end of the previous match.

        // If there is text after the last match, add it as a text token.
        if (lastIndex < content.length) {
          const textToken = new Token(`text`, ``, 0)
          textToken.content = content.slice(lastIndex)
          newTokens.push(textToken)
        }

        // Replace the original token with the new tokens.
        inlineTokens.splice(inlineTokens.indexOf(inlineToken), 1, ...newTokens)

      }

    }

  }

}

export default function translations(md) {
  md.core.ruler.before(`replacements`, `tln`, tokenize)
}
