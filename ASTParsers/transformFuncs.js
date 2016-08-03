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

module.exports = {
  getExplicitKeyVal: getExplicitKeyVal,
  removeExplicitKeys: removeExplicitKeys
}
