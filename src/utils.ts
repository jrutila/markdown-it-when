export function replaceBeginningPhrase(phraseLine: string, options: any) {
    const phrases = options.phrases || [ 'when', 'until' ]
    const startRegex = options.startRegex || '\\(\\($0 ([^)]*?)\\)\\)'

    let i = -1
    let creg = null
    let phrase = null
    while (i++ < phrases.length - 1 && !creg) {
      phrase = phrases[i]
      creg = phraseLine.match(new RegExp('^' + startRegex.replace('$0', phrase) + '\s*(.*)$'))
    }
    if (creg) {
      return { phrase, param: creg[1], content: creg[2].trim() }
    }
    return null
}