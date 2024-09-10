import { expect }       from 'chai'
import Parser           from './index.js'
import { describe, it } from 'node:test'

const parser = new Parser

describe(`ling-md`, function() {

  it(`converts regular markdown`, function() {
    const md   = `# Hello, [World](#)!`
    const html = parser.parse(md)
    expect(html).to.equal(`<h1>Hello, <a href="#">World</a>!</h1>\n`)
  })

  it(`exposes the marked instance`, function() {
    expect(parser.marked.name).to.equal(`marked`)
  })

  it(`allows HTML`, function() {
    const md   = `This contains an <i>inline example</i>.`
    const html = parser.parse(md)
    expect(html).to.equal(`<p>This contains an <i>inline example</i>.</p>\n`)
  })

  describe(`attributes`, function() {

    // NB: This tests both built-in renderers and extensions.
    it(`inline elements`, function() {
      const md   = `This is an _emphasized_{.class} *word*{.class}.`
      const html = parser.parse(md)
      expect(html).to.equal(`<p>This is an <em class="class">emphasized</em> <i class="class">word</i>.</p>\n`)
    })

    it(`block elements`, function() {
      const md   = `# Header {.header}`
      const html = parser.parse(md)
      expect(html).to.equal(`<h1 class="header">Header</h1>\n`)
    })

    it(`block elements that contain inline elements`, function() {
      const md = `This is a paragraph with **bold**{.bold} text.`
      const html = parser.parse(md)
      expect(html).to.equal(`<p>This is a paragraph with <b class="bold">bold</b> text.</p>\n`)
    })

    it(`block elements that end with inline attributes`, function() {
      const md = `- list item **bold**{.red}`
      const html = parser.parse(md)
      expect(html).to.equal(`<ul>\n<li>list item <b class="red">bold</b></li>\n</ul>\n`)
    })

    it(`fenced code blocks without lang`, function() {
      const md   = `\`\`\` {.red}\nconsole.log("Hello, World!")\n\`\`\``
      const html = parser.parse(md)
      expect(html).to.equal(`<pre><code class="red">console.log(&quot;Hello, World!&quot;)\n</code></pre>\n`)
    })

    it(`fenced code blocks with lang`, function() {
      const md   = `\`\`\`js {.red}\nconsole.log("Hello, World!")\n\`\`\``
      const html = parser.parse(md)
      expect(html).to.equal(`<pre><code class="language-js red">console.log(&quot;Hello, World!&quot;)\n</code></pre>\n`)
    })

  })

  it(`*inline examples*`, function() {
    const md   = `The word *and* is a conjunction.`
    const html = parser.parse(md)
    expect(html).to.equal(`<p>The word <i>and</i> is a conjunction.</p>\n`)
  })

  it(`**bold**`, function() {
    const md   = `This includes **bold text**.`
    const html = parser.parse(md)
    expect(html).to.equal(`<p>This includes <b>bold text</b>.</p>\n`)
  })

  it(`*inline example **with bold***`, function() {
    const md   = `*inline example **with bold***`
    const html = parser.parse(md)
    expect(html).to.equal(`<p><i>inline example <b>with bold</b></i></p>\n`)
  })

})
