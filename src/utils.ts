export function replaceBeginningPhrase(phraseLine: string, options: any) {
    const phrases = options.phrases
    const regex = options.startRegex

    if (!phrases || !regex) {
        throw new Error('phrases and startRegex are required')
    }

    let i = -1
    let creg = null
    let phrase = null
    while (i++ < phrases.length - 1 && !creg) {
      phrase = phrases[i]
      creg = phraseLine.match(new RegExp('^' + regex.replace('$0', phrase) + '\s*(.*)$'))
    }
    if (creg) {
      return { phrase, param: creg[1], content: creg[2].trim() }
    }
    return null
}