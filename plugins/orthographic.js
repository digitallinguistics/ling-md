const orthoRegExp = /<<(?<ortho>.+?)>>/gv

export default function orthographic(md) {

  function tokenizeOrthographic(state) {

    state.tokens.forEach(token => {
      if (token.type === `inline`) {

        const match = orthoRegExp.exec(token.content)

        if (match) {
          token.content = token.content.replaceAll(orthoRegExp, `<span class="ortho">⟨$<ortho>⟩</span>`)
        }

      }
    })

  }

  md.core.ruler.before(`inline`, `orthographic`, tokenizeOrthographic)

}
