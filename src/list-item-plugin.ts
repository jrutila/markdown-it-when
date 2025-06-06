import { replaceBeginningPhrase } from "./utils"

export default function whenListItemPlugin(md, options) {
  options = options || {}
  const phrases = options.phrases || [ 'when', 'until' ]
  const listRegex = options.listRegex || '\\[\\[$0 ([^)]*?)\\]\\]'
  const whenListItemOpen = options.whenListItemOpen || function (tokens, idx, _options, env, slf) {
    const inlineToken = tokens[idx + 2] // it's list-item-open, paragraph-open and then the inline token
    const pp = replaceBeginningPhrase(inlineToken.content, {
      phrases,
      startRegex: listRegex
    })
    if (pp?.phrase && pp?.param) {
      env.phrase = pp.phrase
      env.param = pp.param
      return whenListItemOpenRender(tokens, idx, _options, env, slf)
    }
    return whenListItemOpenRender(tokens, idx, _options, env, slf)
  }
  const whenListItemOpenRender = options.whenListItemOpenRender || function (tokens, idx, _options, env, slf) {
    const token = tokens[idx]
    if (env.phrase && env.param) {
      return `<${token.tag} ${env.phrase}="${env.param}">`
    }
    return `<${token.tag}>`
  }
  const whenListItemClose = options.whenListItemClose || function (tokens, idx, _options, env, slf) {
    const content = whenListItemCloseRender(tokens, idx, _options, env, slf)
    if (env.phrase && env.param) {
      env.phrase = undefined
      env.param = undefined
    }
    return content
  }
  const whenListItemCloseRender = options.whenListItemCloseRender || function (tokens, idx, _options, env, slf) {
    const token = tokens[idx]
    return `</${token.tag}>\n`
  }
  const renderText = md.renderer.rules.text
  md.renderer.rules.list_item_open = whenListItemOpen
  md.renderer.rules.list_item_close = whenListItemClose
  md.renderer.rules.text = function (tokens, idx, _options, env, slf) {
    if (env.phrase && env.param) {
      const content = renderText(tokens, idx, _options, env, slf)
      const pp = replaceBeginningPhrase(content, {
        phrases,
        startRegex: listRegex
      })
      return pp != null ? pp.content : content
    }
    return renderText(tokens, idx, _options, env, slf)
  }
}