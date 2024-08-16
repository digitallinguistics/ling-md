/**
 * @module Parser
 */

import { Marked } from 'marked'

/**
 * The Parser class.
 */
export default class Parser {

  /**
   * The current marked instance.
   */
  marked = new Marked

  /**
   * Parse linguistics-flavored markdown to HTML.
   * @param   {String} md The markdown to parse.
   * @returns {String}    The parsed HTML.
   */
  parse(md) {
    return this.marked.parse(md)
  }

}
