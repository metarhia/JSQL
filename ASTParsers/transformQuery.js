'use strict'

let parserName = process.argv[2] || 'recast',
    astParser = require('./'+parserName),
    util = require('util');

let query = require('./query'),
    tf = require('./transformFuncs'),
    ast = astParser.parse(query),
    astProgram = astParser.getProgram(ast),
    arrowFunction = astProgram.body[0].expression;

let personVarName = arrowFunction.params[0].name,
    queryBody = arrowFunction.body;

var newQueryBody, keyVals;
[newQueryBody, keyVals] = tf.removeExplicitKeys(queryBody);

arrowFunction.body = newQueryBody;

console.log(keyVals);
if (typeof astParser.print === 'function')
  console.log(astParser.print(ast));
