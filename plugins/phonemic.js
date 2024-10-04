import iterator from 'markdown-it-for-inline'

const phonemicRegExp = /\/\/(?<txn>.+?)\/\//gv

export default function phonemic(md) {
  md.use(iterator, `phonemic`, `text`, (tokens, i) => {

    const token = tokens[i]
    const text  = token.content

    if (text.match(phonemicRegExp)) {
      token.content = text.replaceAll(phonemicRegExp, `<span class="phon">/$<txn>/</span>`)
      token.type    = `html_inline`
    }

  })
}
