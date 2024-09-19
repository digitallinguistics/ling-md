const tlnRegExp = /''(?<tln>.+?)''/gv

export default function translations(md, { tag }) {

  const q = tag === `q` // Whether the tag is a `q` tag.

  function tokenize(state) {

    const { Token } = state

    for (const token of state.tokens) {

      if (token.type !== `inline`) continue

      const inlineTokens = token.children

      // Process inlineTokens in reverse order. Not sure why, but content gets duplicated otherwise.
      // The core rules in markdown-it itself iterate over the tokens in reverse order:
      // https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs
      for (let i = inlineTokens.length - 1; i >= 0; i--) {

        const inlineToken = inlineTokens[i]

        if (inlineToken.type !== `text`) continue

        const { content } = inlineToken
        const matches     = Array.from(content.matchAll(tlnRegExp))

        if (!matches.length) continue

        const newTokens = []
        let   lastIndex = 0   // The index of the end of the previous match.

        for (const match of matches) {

          // If there is text between the end of the previous match and the start of this match, add it as a text token.
          if (match.index > lastIndex) {
            const textToken = new Token(`text`, ``, 0)
            textToken.content = content.slice(lastIndex, match.index)
            newTokens.push(textToken)
          }

          // Add the opening tag.
          const openingTag = new Token(`html_inline`, ``, 0)
          openingTag.content = q ? `<q>` : `<span class="tln">`

          // Add the content of the translation.
          const contentToken = new Token(`text`, ``, 0)
          const { tln } = match.groups
          contentToken.content = q ? tln : `'${ tln }'`

          // Add the closing tag.
          const closingTag = new Token(`html_inline`, ``, 0)
          closingTag.content = q ? `</q>` : `</span>`

          newTokens.push(openingTag, contentToken, closingTag) // Add the new tokens.
          lastIndex = match.index + match[0].length            // Update the index of the end of the previous match.

        }

        // If there is text after the last match, add it as a text token.
        if (lastIndex < content.length) {
          const textToken = new Token(`text`, ``, 0)
          textToken.content = content.slice(lastIndex)
          newTokens.push(textToken)
        }

        // Replace the original token with the new tokens.
        inlineTokens.splice(i, 1, ...newTokens)

      }

    }

  }

  md.core.ruler.before(`replacements`, `tln`, tokenize)

}
