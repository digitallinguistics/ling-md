/**
 * @module Parser
 */

import { alert }            from '@mdit/plugin-alert'
import attributes           from 'markdown-it-attrs'
import boldItalic           from 'markdown-it-ib'
import bracketedSpans       from 'markdown-it-bracketed-spans'
import createMarkdownParser from 'markdown-it'
import defLists             from 'markdown-it-deflist'
import footnotes            from 'markdown-it-footnote'
import fractions            from './plugins/fractions.js'
import glosses              from './plugins/glosses.js'
import headerAnchors        from 'markdown-it-anchor'
import inlineTranslations   from './plugins/translations.js'
import insertedText         from 'markdown-it-ins'
import markedText           from 'markdown-it-mark'
import ordinals             from './plugins/ordinals.js'
import subscript            from 'markdown-it-sub'
import superscript          from 'markdown-it-sup'
import tableCaptions        from 'markdown-it-table-captions'
import { tasklist }         from '@mdit/plugin-tasklist'
import toc                  from 'markdown-it-table-of-contents'

import { createMathjaxInstance, mathjax } from '@mdit/plugin-mathjax'

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
  constructor({ translations = `q` } = {}) {
    this.engine
      .use(alert)
      .use(attributes) // Must come before headerAnchors
      .use(boldItalic)
      .use(bracketedSpans)
      .use(defLists)
      .use(footnotes)
      .use(fractions)
      .use(glosses)
      .use(headerAnchors)
      .use(inlineTranslations, { translations })
      .use(insertedText)
      .use(markedText)
      .use(mathjax, createMathjaxInstance())
      .use(ordinals)
      .use(subscript)
      .use(superscript)
      .use(tableCaptions)
      .use(tasklist)
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
