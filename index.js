/**
 * @module Parser
 */

import bold                   from './extensions/bold.js'
import inlineExample          from './extensions/inlineExample.js'
import { marked }             from 'marked'

import { override, tokenizeAttributes } from './extensions/attributes/index.js'

const extensions = [tokenizeAttributes, bold, inlineExample]

/**
 * The Parser class.
 */
export default class Parser {

  /**
   * The current marked instance.
   */
  marked = marked

  constructor() {
    this.marked.use({ extensions })
    override(this.marked)
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
