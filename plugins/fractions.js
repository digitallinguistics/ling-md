const fractionRegExp = /\b\d\/\d0?\b/gv

export default function factions(md) {

  function replaceFractions(state) {
    const fractions = {
      '0/3':  `↉`,
      '1/2':  `½`,
      '1/3':  `⅓`,
      '1/4':  `¼`,
      '1/5':  `⅕`,
      '1/6':  `⅙`,
      '1/7':  `⅐`,
      '1/8':  `⅛`,
      '1/9':  `⅑`,
      '1/10': `⅒`,
      '2/3':  `⅔`,
      '2/5':  `⅖`,
      '3/4':  `¾`,
      '3/5':  `⅗`,
      '3/8':  `⅜`,
      '4/5':  `⅘`,
      '5/6':  `⅚`,
      '5/8':  `⅝`,
      '7/8':  `⅞`,
    }

    state.tokens.forEach(token => {
      if (token.type === `inline` && token.children) {
        token.children.forEach(child => {
          if (child.type === `text`) {
            child.content = child.content.replaceAll(fractionRegExp, match => fractions[match] || match)
          }
        })
      }
    })
  }

  md.core.ruler.after(`inline`, `fractions`, replaceFractions)

}
