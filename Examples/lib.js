let { Monoid, ParSeqMonoid, parSeq } = require('./flib');

function Projection(f) { return f; }
Projection.prototype = Function.prototype;

function Filter(f) { return arr => arr.filter(f); }
Filter.prototype = Function.prototype;

function MyArr(arr) {
  return arr;
}
MyArr.prototype = Array.prototype;

function myApply(f, arr) {
  return arr instanceof MyArr
       ? arr.map(child => myApply(f, child))
       : f(arr);
}

let queryParSeqMonoid = new ParSeqMonoid(
      new Monoid((x, y) => arr => myApply(y, myApply(x, arr)), x => x),
      new Monoid(funcArr => myarr => funcArr.map(f => myApply(f, myarr)))
    ),
    queryParSeq = x => parSeq(x, queryParSeqMonoid);

module.exports = {
  Projection,
  Filter,
  queryParSeq
};
