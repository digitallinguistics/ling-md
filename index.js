/**
 * @module Parser
 */

import attributes           from 'markdown-it-attrs'
import boldItalic           from 'markdown-it-ib'
import bracketedSpans       from 'markdown-it-bracketed-spans'
import createMarkdownParser from 'markdown-it'

const options = {
  html:        true,
  typographer: true,
}

/**
 * The Parser class.
 */
export default class Parser {

  /**
   * The current marked instance.
   */
  engine = createMarkdownParser(options)

  /**
   * Create a new linguistics markdown parser instance.
   */
  constructor() {
    this.engine
      .use(attributes)
      .use(boldItalic)
      .use(bracketedSpans)
  }

  /**
   * Parse linguistics-flavored markdown to HTML.
   * @param   {String} md The markdown to parse.
   * @returns {String}    The parsed HTML.
   */
  parse(md) {
    return this.engine.render(md)
  }

}
