/**
 * @module Parser
 */

import bold          from './extensions/bold.js'
import inlineExample from './extensions/inlineExample.js'
import { Marked }    from 'marked'

const extensions = [bold, inlineExample]

/**
 * The Parser class.
 */
export default class Parser {

  /**
   * The current marked instance.
   */
  marked = new Marked({ extensions })

  /**
   * Parse linguistics-flavored markdown to HTML.
   * @param   {String} md The markdown to parse.
   * @returns {String}    The parsed HTML.
   */
  parse(md) {
    return this.marked.parse(md)
  }

}
