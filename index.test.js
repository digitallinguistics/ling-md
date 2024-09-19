import { expect }       from 'chai'
import Parser           from './index.js'
import { describe, it } from 'node:test'

const parser = new Parser

describe(`ling-md`, function() {

  it(`converts regular markdown`, function() {
    const md   = `# Hello, [World](#)!`
    const html = parser.parse(md)
    expect(html).to.equal(`<h1 id="hello%2C-world!" tabindex="-1">Hello, <a href="#">World</a>!</h1>\n`)
  })

  it(`exposes the markdown-it instance`, function() {
    expect(parser.engine.constructor.name).to.equal(`MarkdownIt`)
  })

  it(`alerts`, function() {
    const md   = `> [!note]\n> This is the note text.`
    const html = parser.parse(md)
    expect(html).to.equal(`<div class="markdown-alert markdown-alert-note">\n<p class="markdown-alert-title">Note</p>\n<p>This is the note text.</p>\n</div>\n`)
  })

  describe(`attributes`, function() {

    it(`block elements`, function() {
      const md   = `# Header {.header}`
      const html = parser.parse(md)
      expect(html).to.equal(`<h1 class="header" id="header" tabindex="-1">Header</h1>\n`)
    })

    it(`block elements that contain inline elements`, function() {
      const md = `This is a paragraph with ~~strikethrough~~{.strike} text.`
      const html = parser.parse(md)
      expect(html).to.equal(`<p>This is a paragraph with <s class="strike">strikethrough</s> text.</p>\n`)
    })

    it(`block elements that end with inline attributes`, function() {
      const md = `- list item ~~strikethrough~~{.strike}`
      const html = parser.parse(md)
      expect(html).to.equal(`<ul>\n<li>list item <s class="strike">strikethrough</s></li>\n</ul>\n`)
    })

    it(`fenced code blocks without lang`, function() {
      const md   = `\`\`\` {.red}\nconsole.log("Hello, World!")\n\`\`\``
      const html = parser.parse(md)
      expect(html).to.equal(`<pre><code class="red">console.log(&quot;Hello, World!&quot;)\n</code></pre>\n`)
    })

    it(`fenced code blocks with lang`, function() {
      const md   = `\`\`\`js {.red}\nconsole.log("Hello, World!")\n\`\`\``
      const html = parser.parse(md)
      expect(html).to.equal(`<pre><code class="red language-js">console.log(&quot;Hello, World!&quot;)\n</code></pre>\n`)
    })

    it(`inline elements`, function() {
      const md   = `This is an _emphasized_{.class} word.`
      const html = parser.parse(md)
      expect(html).to.equal(`<p>This is an <em class="class">emphasized</em> word.</p>\n`)
    })

  })

  it(`**bold**`, function() {
    const md   = `This includes **bold text**.`
    const html = parser.parse(md)
    expect(html).to.equal(`<p>This includes <b>bold text</b>.</p>\n`)
  })

  it(`[bracketed spans]{.class}`, function() {
    const md   = `[bracketed spans]{.class}`
    const html = parser.parse(md)
    expect(html).to.equal(`<p><span class="class">bracketed spans</span></p>\n`)
  })

  it(`checklists`, function() {
    const md = `- [ ] Unchecked\n- [x] Checked`
    const html = parser.parse(md)
    expect(html).to.contain(`<input`)
  })

  it(`definition lists`, function() {
    const md = `term 1\n: definition 1\n\nterm 2\n: definition 2`
    const html = parser.parse(md)
    expect(html).to.equal(`<dl>\n<dt>term 1</dt>\n<dd>definition 1</dd>\n<dt>term 2</dt>\n<dd>definition 2</dd>\n</dl>\n`)
  })

  it(`_emphasis_`, function() {
    const md   = `This is an _emphasized_ word.`
    const html = parser.parse(md)
    expect(html).to.equal(`<p>This is an <em>emphasized</em> word.</p>\n`)
  })

  it(`[^footnotes]`, function() {
    const md   = `This is a sentence with a footnote[^1] and some more text.\n\n[^1]: This is the footnote.`
    const html = parser.parse(md)
    expect(html).to.equal(`<p>This is a sentence with a footnote<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup> and some more text.</p>\n<hr class="footnotes-sep">\n<section class="footnotes">\n<ol class="footnotes-list">\n<li id="fn1" class="footnote-item"><p>This is the footnote. <a href="#fnref1" class="footnote-backref">↩︎</a></p>\n</li>\n</ol>\n</section>\n`)
  })

  it(`HTML`, function() {
    const md   = `This contains an <i>inline example</i>.`
    const html = parser.parse(md)
    expect(html).to.equal(`<p>This contains an <i>inline example</i>.</p>\n`)
  })

  it(`*inline examples*`, function() {
    const md   = `The word *and* is a conjunction.`
    const html = parser.parse(md)
    expect(html).to.equal(`<p>The word <i>and</i> is a conjunction.</p>\n`)
  })

  it(`*inline example **with bold***`, function() {
    const md   = `*inline example **with bold***`
    const html = parser.parse(md)
    expect(html).to.equal(`<p><i>inline example <b>with bold</b></i></p>\n`)
  })

  it(`++inserted text++`, function() {
    const md   = `This includes ++inserted text++.`
    const html = parser.parse(md)
    expect(html).to.equal(`<p>This includes <ins>inserted text</ins>.</p>\n`)
  })

  it(`==marked text==`, function() {
    const md   = `This includes ==marked text==.`
    const html = parser.parse(md)
    expect(html).to.equal(`<p>This includes <mark>marked text</mark>.</p>\n`)
  })

  it(`math`, function() {
    const md   = `This is an inline math example: $x^2 + y^2 = z^2$`
    const html = parser.parse(md)
    expect(html).to.contain(`svg`)
  })

  it(`“smart quotes”`, function() {
    const md   = `"'Hello world!', he said."`
    const html = parser.parse(md)
    expect(html).to.equal(`<p>“‘Hello world!’, he said.”</p>\n`)
  })

  it(`__strong__`, function() {
    const md   = `This includes __strong text__.`
    const html = parser.parse(md)
    expect(html).to.equal(`<p>This includes <strong>strong text</strong>.</p>\n`)
  })

  it(`^superscript^`, function() {
    const md   = `This includes ^superscript^ text.`
    const html = parser.parse(md)
    expect(html).to.equal(`<p>This includes <sup>superscript</sup> text.</p>\n`)
  })

  it(`~subscript~`, function() {
    const md   = `This includes ~subscript~ text.`
    const html = parser.parse(md)
    expect(html).to.equal(`<p>This includes <sub>subscript</sub> text.</p>\n`)
  })

  it(`TOC`, function() {
    const md   = `[[toc]]\n\n# Header\n\n## Subheader`
    const html = parser.parse(md)
    expect(html).to.include(`class="table-of-contents`)
  })

  it(`typography`, function() {

    const md = `2000--2010
    This is a sentence---with an aside.
    Hello...?`

    const html = parser.parse(md)

    expect(html).to.equal(`<p>2000–2010\nThis is a sentence—with an aside.\nHello…?</p>\n`)

  })

})
