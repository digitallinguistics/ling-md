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
import interlinears         from './plugins/interlinears.js'
import markedText           from 'markdown-it-mark'
import ordinals             from './plugins/ordinals.js'
import orthographic         from './plugins/orthographic.js'
import phonemic             from './plugins/phonemic.js'
import phonetic             from './plugins/phonetic.js'
import subscript            from 'markdown-it-sub'
import superscript          from 'markdown-it-sup'
import tableCaptions        from 'markdown-it-table-captions'
import { tasklist }         from '@mdit/plugin-tasklist'
import toc                  from 'markdown-it-table-of-contents'

import { createMathjaxInstance, mathjax } from '@mdit/plugin-mathjax'

const defaultMarkdownOptions = {
  html:        true,
  typographer: true,
}

/**
 * The Parser class.
 */
export default class Parser {

  /**
   * Create a new linguistics markdown parser instance.
   */
  constructor({
    dlx2html      = {},
    markdown      = defaultMarkdownOptions,
    plugins       = {},
    scription2dlx = {},
    translations  = `span`,
  } = {}) {

    const markdownOptions = Object.assign({}, defaultMarkdownOptions, markdown)

    this.engine = createMarkdownParser(markdownOptions)

    this.engine
      .use(alert, plugins[`@mdit/plugin-alert`])
      .use(attributes, plugins[`markdown-it-attrs`]) // Must come before headerAnchors
      .use(boldItalic)
      .use(bracketedSpans)
      .use(defLists)
      .use(footnotes)
      .use(fractions)
      .use(glosses)
      .use(headerAnchors, plugins[`markdown-it-anchor`])
      .use(inlineTranslations, { tag: translations })
      .use(insertedText)
      .use(interlinears, { dlx2html, scription2dlx })
      .use(markedText)
      .use(mathjax, createMathjaxInstance(plugins[`@mdit/plugin-mathjax`]))
      .use(ordinals)
      .use(orthographic)
      .use(phonemic)
      .use(phonetic)
      .use(subscript)
      .use(superscript)
      .use(tableCaptions)
      .use(tasklist, plugins[`@mdit/plugin-tasklist`])
      .use(toc, plugins[`markdown-it-table-of-contents`])

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
