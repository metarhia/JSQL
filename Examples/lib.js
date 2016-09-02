let { Monoid, ParSeqMonoid, parSeq } = require('./flib'),
    projection = require('./projection');

function Projection(arr, isExcluding) { return x => projection.call(x, arr, isExcluding); }
Projection.prototype = Function.prototype;

function Filter(f) { return arr => arr.filter(f); }
Filter.prototype = Function.prototype;

function matchAsMyArr(arr) { arr.__proto__ = MyArr.prototype; return arr; }
function MyArr() {}
MyArr.prototype = [];

function myApply(f, arr) {
  return arr instanceof MyArr
       ? arr.map(child => myApply(f, child))
       : f(arr);
}

let queryParSeqMonoid = new ParSeqMonoid(
      new Monoid((x, y) => arr => myApply(y, myApply(x, arr)), x => x),
      new Monoid(funcArr => myarr => matchAsMyArr(funcArr.map(f => myApply(f, myarr))))
    ),
    queryParSeq = x => parSeq(x, queryParSeqMonoid);

module.exports = {
  Projection,
  Filter,
  queryParSeq
};
