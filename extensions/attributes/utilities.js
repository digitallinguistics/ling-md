function createAttributesString(attributes) {
  return Object.entries(attributes)
    .map(([key, value]) => `${ key }="${ value }"`)
    .join(` `)
}

const tagNameRegExp = /^<(?<tag>[a-z][a-z0-9\-]*)(?<suffix>\s|>)/iv

export { createAttributesString, tagNameRegExp }
