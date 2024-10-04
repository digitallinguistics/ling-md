import iterator from 'markdown-it-for-inline'

const phoneticRegExp = /\[\[(?<txn>.+?)\]\]/gv

export default function phonetic(md) {
  md.use(iterator, `phonetic`, `text`, (tokens, i) => {

    const token = tokens[i]
    const text  = token.content

    if (text.match(phoneticRegExp)) {
      token.content = text.replaceAll(phoneticRegExp, `<span class="fon">[$<txn>]</span>`)
      token.type    = `html_inline`
    }

  })
}
