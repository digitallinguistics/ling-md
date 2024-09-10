import { createAttributesString } from './utilities.js'

const classStringRegExp = /<code class="(?<classString>[^"]+?)"/v
const codeTagRegExp     = /<pre><code(?<suffix>\s|>)/v

export default {

  level: `block`,
  name:  `code`,

  renderer(token) {

    let html = this.parser.renderer.code(token)
    const { attributes } = token

    if (!attributes) return html

    const classString = html.match(classStringRegExp)?.groups?.classString

    if (classString) {
      html = html.replace(classStringRegExp, `<code class="${ classString } ${ attributes.class }"`)
      delete attributes.class
    }

    const attributesString = createAttributesString(attributes)

    if (!attributesString) return html

    return html.replace(codeTagRegExp, `<pre><code ${ attributesString }$<suffix>`)

  },

}
