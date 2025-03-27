export default function whenPlugin (md, options) {
  options = options || {}

  const phrases = options.phrases || [ 'when', 'until' ]
  const startRegex = options.startRegex || '\\(\\($0 ([^)]*?)\\)\\)'
  const endRegex = options.endRegex || '\\(\\(\\/$0\\)\\)'

  const whenBlockOpen = options.whenBlockOpen || function (tokens, idx, _options, env, slf) {
    const token = tokens[idx]
    return 'WHEN_OPEN ' + token.meta.phrase + ' ' + token.meta.param
  }
  const whenBlockClose = options.whenBlockClose || function (tokens, idx, _options, env, slf) {
    return 'WHEN_CLOSE'
  }
  const whenOpen = options.whenOpen || function (tokens, idx, _options, env, slf) {
    const token = tokens[idx]
    return 'WHEN_OPEN ' + token.meta.phrase + ' ' + token.meta.param
  }
  const whenClose = options.whenClose || function (tokens, idx, _options, env, slf) {
    return 'WHEN_CLOSE'
  }

  function block (state, startLine, endLine, silent) {
    let start = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]

    // TODO: Quickly check with charCodeAt from state.src and startRegex to '$0' to find if the regex should be done

    const phraseLine = state.src.substring(start, max)

    let i = -1
    let creg = null
    let phrase = null
    while (i++ < phrases.length - 1 && !creg) {
      phrase = phrases[i]
      creg = phraseLine.match(new RegExp('^' + startRegex.replace('$0', phrase) + '\s*$'))
    }
    if (creg) {

      let nextLine = startLine;
      for (; ;) {
        nextLine++;
        if (nextLine >= endLine) {
          // unclosed block should be autoclosed by end of document.
          // also block seems to be autoclosed by end of parent
          break;
        }
        start = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];

        const endPhraseLine = state.src.substring(start, max)
        const ereg = endPhraseLine.match(new RegExp('^' + endRegex.replace('$0', phrase) + '\s*$'))

        if (ereg) {
          break
        }
      }

      const old_parent = state.parentType
      const old_line_max = state.lineMax
      state.parentType = 'when'

      state.lineMax = nextLine
      let token

      token        = state.push('when_block_open', 'p', 1)
      token.block  = true
      token.meta   = { param: creg[1], phrase }
      token.map    = [ startLine, nextLine ]

      state.md.block.tokenize(state, startLine + 1, nextLine)

      token        = state.push('when_block_close', 'p', -1)
      token.block  = true
      token.meta   = { param: creg[1], phrase }

      state.parentType = old_parent
      state.lineMax = old_line_max
      state.line = nextLine + 1

      return true
    }
    return false
  }

  function inline (state, silent) {
    if (silent) {
      return false
    }
    // console.log('container ruler', md.inline.ruler)
    const max = state.posMax
    const start = state.pos

    const piece = state.src.substring(start, max)

    let i = -1 
    while (i++ < phrases.length - 1) {
      const phrase = phrases[i]
      const creg = piece.match(new RegExp(startRegex.replace('$0', phrase) + '(.*?)' + endRegex.replace('$0', phrase), 'm'))
      if (!creg) { continue }

      const beforePhrase = piece.substring(0, creg.index)
      let tokens
      state.md.inline.parse(
        beforePhrase,
        state.md,
        state.env,
        tokens = []
      )
      for (const t of tokens) {
        state.tokens.push(t)
        state.tokens_meta.push(null)
      }

      let token
      token = state.push('when_open', '', 1)
      token.meta = { param: creg[1], phrase }

      state.md.inline.parse(
        creg[2],
        state.md,
        state.env,
        tokens = []
      )
      for (const t of tokens) {
        state.tokens.push(t)
        state.tokens_meta.push(null)
      }

      token = state.push('when_close', '', -1)
      token.meta = { param: creg[1], phrase }

      state.pos = start + creg.index + creg[0].length
      state.posMax = max

      return true
    }

    return false
  }

  md.block.ruler.before('table',' when', block)
  md.renderer.rules.when_block_open = md.renderer.rules.when_block_open || whenBlockOpen
  md.renderer.rules.when_block_close = md.renderer.rules.when_block_close || whenBlockClose

  md.inline.ruler.before('text', 'when', inline)
  md.renderer.rules.when_open = md.renderer.rules.when_open || whenOpen
  md.renderer.rules.when_close = md.renderer.rules.when_close || whenClose
}


