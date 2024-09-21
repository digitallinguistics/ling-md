import dlx2html      from '@digitallinguistics/dlx2html'
import jsYaml        from 'js-yaml'
import scription2dlx from '@digitallinguistics/scription2dlx'

const yamlHeaderRegExp = /^---\n(?<header>.*?)\n---\n/sv

export default function InterlinearsPlugin(md) {

  const originalRenderer = md.renderer.rules.fence

  function fenceWithInterlinears(...args) {

    const [tokens, i] = args
    const token       = tokens[i]
    const lang        = token.info

    if (lang === `igl`) {

      const header    = token.content.match(yamlHeaderRegExp)?.groups?.header
      const options   = header ? jsYaml.load(header) : {}
      const scription = token.content.replace(yamlHeaderRegExp, ``)
      const data      = scription2dlx(scription, options.scription2dlx)
      const html      = dlx2html(data, options.dlx2html)

      return html

    }

    return originalRenderer(...args)

  }

  md.renderer.rules.fence = fenceWithInterlinears

}
