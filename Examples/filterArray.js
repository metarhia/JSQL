// Define Data Source

var data = [
  ['Marcus Aurelius','212-04-26','Rome'],
  ['Victor Glushkov','1923-08-24','Rostov on Don'],
  ['Ibn Arabi','1165-11-16','Murcia'],
  ['Mao Zedong','1893-12-26','Shaoshan'],
  ['Rene Descartes','1596-03-31','La Haye en Touraine']
];

// Define Person prototype with calculating field

var metadata = {
  name: 'string',
  birth: 'Date',
  city: 'string',
  age: function() {
    var difference = new Date() - this.birth;
    return Math.floor(difference / 31536000000);
  }
};

// Build Prototype from Metadata

function Person() {}

var index = 0;
for (var name in metadata) {
  buildGetter(Person.prototype, name, metadata[name], index++);
}

function buildGetter(proto, fieldName, fieldType, fieldIndex) {
  if (fieldType === 'Date') {
    Object.defineProperty(proto, fieldName, {
      get: function() {
        return new Date(this[fieldIndex]);
      }
    });
  } else if (typeof(fieldType) === 'function') {
    Object.defineProperty(proto, fieldName, { get: fieldType });
  } else {
    Object.defineProperty(proto, fieldName, {
      get: function() {
        return this[fieldIndex];
      }
    });
  }
}

// Define Query

var query = (person) => (
  person.name !== '' &&
  person.age > 18 &&
  person.city === 'Rome'
);

// Assign prototype to array elements

data.forEach((person) => {
  person.__proto__ = Person.prototype;
});

// Filter Data using Query

var res = data.filter(query);
console.dir(res);

module.exports = {
  data,
  query
};
