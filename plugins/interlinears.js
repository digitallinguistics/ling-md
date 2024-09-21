import dlx2html      from '@digitallinguistics/dlx2html'
import jsYaml        from 'js-yaml'
import scription2dlx from '@digitallinguistics/scription2dlx'

const yamlHeaderRegExp = /^---\n(?<header>.*?)\n---\n/sv

const defaultOptions = {
  dlx2html: {
    classes: [`ex`, `igl`],
    glosses: true,
    tag:     `li`,
  },
  scription2dlx: {},
}

export default function InterlinearsPlugin(md, pluginOptions = {}) {

  const originalRenderer = md.renderer.rules.fence

  function fenceWithInterlinears(...args) {

    const [tokens, i] = args
    const token       = tokens[i]
    const lang        = token.info

    if (lang === `igl`) {

      const header               = token.content.match(yamlHeaderRegExp)?.groups?.header
      const yamlOptions          = header ? jsYaml.load(header) : {}
      const scription            = token.content.replace(yamlHeaderRegExp, ``)
      const scription2dlxOptions = Object.assign({}, defaultOptions.scription2dlx, pluginOptions.scription2dlx, yamlOptions.scription2dlx)
      const data                 = scription2dlx(scription, scription2dlxOptions)
      const dlx2htmlOptions      = Object.assign({}, defaultOptions.dlx2html, pluginOptions.dlx2html, yamlOptions.dlx2html)
      const html                 = dlx2html(data, dlx2htmlOptions)

      return html

    }

    return originalRenderer(...args)

  }

  md.renderer.rules.fence = fenceWithInterlinears

}
