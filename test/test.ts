'use strict'
import * from 'path'
import generate from 'markdown-it-testgen'

describe('default when', () => {
  const md = require('markdown-it')()
              .use(require('../src/'))

  generate(path.join(__dirname, 'fixtures/default.txt'), md)
})
