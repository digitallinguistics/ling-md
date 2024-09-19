import { Lexer } from 'marked'
import parseAttributes from 'attributes-parser'

const attrRegExp = /\s\{(?<attributes>[^\{]+?)\}$/sv // Anchored to end of string, preceded by whitespace.

// All 3 of these return arrays of tokens. Only .lex() includes a `links` attribute on the array.
// lexer.blockTokens():  Only parses the top-level block.
// lexer.inlineTokens(): Parses inline tokens.
// lexer.lex():          Does a full parse, with links. Continues from previous parse.
export default function provideLexer() {

  const lexer = new Lexer(this.options)

  if (!this.block) return lexer.lex

  return function lex(src) {

    const [token] = lexer.blockTokens(src)      // Only parse the top-level block, for checking.
    const match = attrRegExp.exec(token.raw)

    if (!match) return lexer.lex(src)

    const cleanedSrc = token.raw.slice(0, match.index).trim()
    const cleanedTokens = lexer.lex(cleanedSrc)
    const [attrToken] = cleanedTokens

    attrToken.attributes = parseAttributes(match.groups.attributes)

    return cleanedTokens

  }

}
