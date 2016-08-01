// Define Data Source

var data = [
  ['Marcus Aurelius','212-04-26','Rome'],
  ['Victor Glushkov','1923-08-24','Rostov on Don'],
  ['Ibn Arabi','1165-11-16','Murcia'],
  ['Mao Zedong','1893-12-26','Shaoshan'],
  ['Rene Descartes','1596-03-31','La Haye en Touraine']
];

// Difine Person prototype with calculating field

function Person() {}

Person.prototype = {
  get name() {
    return this[0];
  },
  get birth() {
    console.log(new Date(this[1]));
    return new Date(this[1]);
  },
  get city() {
    return this[2];
  },
  get age() {
    var difference = new Date() - this.birth;
    return Math.floor(difference / 31536000000);
  },
};

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
