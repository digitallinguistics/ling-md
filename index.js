/**
 * @module Parser
 */

import attributes            from './extensions/attributes/index.js'
import bold                  from './extensions/bold.js'
import inlineExample         from './extensions/inlineExample.js'
import { marked }            from 'marked'
import { markedSmartypants } from 'marked-smartypants'

const extensions = [bold, inlineExample]

/**
 * The Parser class.
 */
export default class Parser {

  /**
   * The current marked instance.
   */
  marked = marked

  /**
   * Create a new linguistics markdown parser instance.
   */
  constructor() {
    this.marked.use({ extensions })
    this.marked.use(markedSmartypants())
    attributes(this.marked)
  }

  /**
   * Parse linguistics-flavored markdown to HTML.
   * @param   {String} md The markdown to parse.
   * @returns {String}    The parsed HTML.
   */
  parse(md) {
    return this.marked.parse(md)
  }

}
