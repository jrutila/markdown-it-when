'use strict'
import 'mocha'
import * as path from 'path'
import generate from 'markdown-it-testgen'
import when from '../src/'

describe('default when', () => {
  const md = require('markdown-it')()
              .use(when, {
                whenBlockOpen: function (tokens, idx, _options, env, slf) {
                  const token = tokens[idx]
                  return `<p ${token.meta.phrase}="${token.meta.param}">\n`
                },
                whenBlockClose: function (tokens, idx, _options, env, slf) {
                  return `</p>\n`
                },
                whenOpen: function (tokens, idx, _options, env, slf) {
                  const token = tokens[idx]
                  return `<span ${token.meta.phrase}="${token.meta.param}">`
                },
                whenClose: function (tokens, idx, _options, env, slf) {
                  return `</span>`
                }
              })

  generate(path.join(__dirname, 'fixtures/default.txt'), md)
})
