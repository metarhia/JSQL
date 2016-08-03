'use strict'

let esprima = require('esprima');

module.exports = {
  parse: esprima.parse,
  getProgram: expr => expr
}
