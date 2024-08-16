import { expect }       from 'chai'
import Parser           from './index.js'
import { describe, it } from 'node:test'

const parser = new Parser

describe(`ling-md`, function() {

  it(`converts regular markdown`, function() {
    const md   = `# Hello, **World**!`
    const html = parser.parse(md)
    expect(html).to.equal(`<h1>Hello, <strong>World</strong>!</h1>\n`)
  })

})
