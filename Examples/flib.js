function Monoid(append, empty) {
  if (empty !== undefined) {
    this.empty = empty;
    this.append = append;
    this.concat = arr => arr.reduce(append, empty);
  } else {
    let concat = append;
    this.concat = concat;
    this.empty = concat([]);
    this.append = (x, y) => concat([x, y]); 
  }
}

function ParSeqMonoid(seqMonoid, parMonoid) {
  this.seqM = seqMonoid;
  this.parM = parMonoid;
}

function parSeq(data, parSeqMonoid) {
  let { seqM, parM } = parSeqMonoid,
      arrProccess = arr => arr.map( x => x instanceof Array
                                  ? parSeq(x, parSeqMonoid)
                                  : x);
  return data.length === 1 && data[0] instanceof Array
       ? parM.concat(arrProccess(data[0]))
       : seqM.concat(arrProccess(data));
}

module.exports = {
  Monoid,
  ParSeqMonoid,
  parSeq
}
