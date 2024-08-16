import { marked } from 'marked'

export default class Parser {

  parse(md) {
    return marked.parse(md)
  }

}
