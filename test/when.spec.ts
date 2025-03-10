'use strict'
import * as path from 'path'
import generate from 'markdown-it-testgen'
import when from '../src'
import md from 'markdown-it'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('default when', () => {
  const mdTest = md()
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

  generate(path.join(__dirname, 'fixtures/default.txt'), mdTest)
})
