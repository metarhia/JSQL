'use strict'

let recast = require('recast');

module.exports = {
  parse: recast.parse,
  getProgram: expr => expr.program,
  print: function (x) {
    return recast.print(x).code;
  }
};
