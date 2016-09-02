let { Projection, Filter, queryParSeq } = require('./lib'),
    { Monoid, ParSeqMonoid, parSeq } = require('./flib'),
    { data } = require('./filterRecords');

let inRomeFilter = Filter(person => person.city === 'Rome'),
    inMurciaFilter = Filter(person => person.city === 'Murcia'),
    nameProjection = Projection(['name']), 
    query = [ [[ inRomeFilter, inMurciaFilter ]], nameProjection ];

let strParSeqMonoid = new ParSeqMonoid(
      new Monoid((x, y) => x + y, ''), 
      new Monoid((x, y) => x !== ''
                         ? y !== ''
                           ? '{' + x + '|' + y + '}'
                           : x
                         : y !== ''
                           ? y
                           : '', '')
    ),
    strParSeq = x => parSeq(x, strParSeqMonoid);

console.log(strParSeq([ 
  [[ ['123', '321'], [['при', 'пере']] ]], 
  ['456', '789'], 
  'ABC'
]));

let simpleQuery = [ 
  x => ({ x, y: 4 }), 
  [[ x => x.x, [x => x.y, x => x + 1] ]] 
]; 
console.log(queryParSeq(simpleQuery)(6));

let queryFunc = queryParSeq(query);
console.log(queryFunc(data));
