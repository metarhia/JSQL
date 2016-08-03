'use strict'

let recast = require('recast'),
    util = require('util');

let query = require('./query'),
    ast = recast.parse(query),
    arrowFunction = ast.program.body[0].expression;
let personVarName = arrowFunction.params[0].name,
    queryBody = arrowFunction.body;
var newQueryBody, keyVals;
[newQueryBody, keyVals] = removeExplicitKeys(queryBody);
arrowFunction.body = newQueryBody;
//console.log(newQueryBody);
console.log(keyVals);
console.log(recast.print(ast).code);

function getExplicitKeyVal(expr, personVarName) {
  if (expr.type === 'BinaryExpression' && expr.operator === '===') {
    let lExpr = expr.left;
    if (lExpr.type === "MemberExpression") {
      let rExpr = expr.right;
      if (rExpr.type === 'Literal') {
        return [ lExpr.property.name, rExpr.value];
      }
    }
  }
  return null;
}

function removeExplicitKeys(logExpr) {
  if (logExpr.type !== 'LogicalExpression' || logExpr.operator !== '&&') {
    let keyVal = getExplicitKeyVal(logExpr);
    return keyVal !== null
         ? [null, [keyVal]]
         : [Object.assign(logExpr), []];
  } else {
    let [lRes, lKeyVals] = removeExplicitKeys(logExpr.left),
        [rRes, rKeyVals] = removeExplicitKeys(logExpr.right),
        allKeyVals = lKeyVals.concat(rKeyVals),
        allRes = lRes === null
               ? ( rRes === null
                 ? null
                 : rRes)
               : ( rRes === null
                 ? lRes 
                 : Object.assign({}, logExpr));
    return [allRes, allKeyVals];
  }
}
