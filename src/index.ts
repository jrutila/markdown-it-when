export default function whenPlugin (md, options) {
  function block (state, startLine, endLine, silent) {
    return false
  }

  md.block.ruler.before('table',' when', block)
}


