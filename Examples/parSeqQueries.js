let { Projection, Filter, queryParSeq } = require('./lib'),
    { Monoid, ParSeqMonoid, parSeq } = require('./flib'),
    filt = require('./filterArray');

let inRomeFilter = Filter(person => person.city === 'Rome'),
    inCreteFilter = Filter(person => person.city === 'Crete'),
    nameProjection = Projection((metadata, proto) =>  ['name']), 
    query =  [ [[ inRomeFilter, inCreteFilter ]], nameProjection ];

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

console.log(queryParSeq(simpleQuery)([1,2,3]));
