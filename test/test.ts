'use strict'
import 'mocha'
import * as path from 'path'
import generate from 'markdown-it-testgen'
import when from '../src/'

describe('default when', () => {
  const md = require('markdown-it')()
              .use(when)

  generate(path.join(__dirname, 'fixtures/default.txt'), md)
})
