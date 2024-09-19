import iterator from 'markdown-it-for-inline'

const ordinalsRegExp = /(?<num>\d+)(?<abbr>st|nd|rd|th)/gv

export default function ordinals(md) {

  md.use(iterator, `ordinals`, `text`, (tokens, i) => {

    const token = tokens[i]
    const text  = token.content

    if (text.match(ordinalsRegExp)) {
      token.content = text.replaceAll(ordinalsRegExp, `$<num><sup>$<abbr></sup>`)
      token.type    = `html_inline`
    }

  })

}
