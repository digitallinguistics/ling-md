/**
 * @module Parser
 */

import attributes           from 'markdown-it-attrs'
import boldItalic           from 'markdown-it-ib'
import bracketedSpans       from 'markdown-it-bracketed-spans'
import createMarkdownParser from 'markdown-it'
import defLists             from 'markdown-it-deflist'
import footnotes            from 'markdown-it-footnote'
import headerAnchors        from 'markdown-it-anchor'
import insertedText         from 'markdown-it-ins'
import markedText           from 'markdown-it-mark'
import subscript            from 'markdown-it-sub'
import superscript          from 'markdown-it-sup'
import toc                  from 'markdown-it-table-of-contents'

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
      .use(attributes) // Must come before headerAnchors
      .use(boldItalic)
      .use(bracketedSpans)
      .use(defLists)
      .use(footnotes)
      .use(headerAnchors)
      .use(insertedText)
      .use(markedText)
      .use(subscript)
      .use(superscript)
      .use(toc)
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
