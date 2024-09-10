import parseAttributes from 'attributes-parser'
import { createAttributesString, tagNameRegExp } from './utilities.js'
import { Lexer, Parser } from 'marked'

const attrRegExp = /\s\{(?<attributes>[^\{]+?)\}$/sv // Anchored to end of string, preceded by whitespace.

// All 3 of these return arrays of tokens. Only .lex() includes a `links` attribute on the array.
// lexer.blockTokens():  Only parses the top-level block.
// lexer.inlineTokens(): Parses inline tokens.
// lexer.lex():          Does a full parse, with links.
export function provideLexer() {

  const lex = (src, options) => {

    const lexer = new Lexer(options)

    if (!this.block) return lexer.lex(src)

    const [token] = lexer.blockTokens(src)      // Only parse the top-level block, for checking.
    const match   = attrRegExp.exec(token.raw)

    if (!match) return lexer.lex(src)

    const cleanedSrc    = token.raw.slice(0, match.index).trim()
    const cleanedTokens = lexer.lex(cleanedSrc)
    const [attrToken]   = cleanedTokens

    attrToken.attributes = parseAttributes(match.groups.attributes)

    return cleanedTokens

  }

  return lex

}

export function provideParser() {
  return (tokens, options) => {

    const parser = new Parser(options)
    let   html   = ``

    for (const token of tokens) {

      const raw = parser.parse([token])

      if (!token.attributes) {
        html += raw
        continue
      }

      const attributesString = createAttributesString(token.attributes)

      html += parser
        .parse([token])
        .replace(tagNameRegExp, `<$<tag> ${ attributesString }$<suffix>`)

    }

    // No-op
    return html

  }
}

export function walkTokens(token) {

  const match = attrRegExp.exec(token.raw)

  console.log(token)
  if (match) {
    token.attributes   = parseAttributes(match.groups.attributes)
    token.raw          = token.raw.slice(0, match.index).trim()
    token.text         = token.text.slice(0, match.index).trim()
    token.tokens     &&= this.lexer(token.raw)
  }

  for (const child of token.tokens || []) {
    walkTokens(child)
  }


}
