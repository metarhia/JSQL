// Define Data Source

var data = [
  { name: 'Marcus Aurelius', birth: new Date('212-04-26'), city: 'Rome' },
  { name: 'Victor Glushkov', birth: new Date('1923-08-24'), city: 'Rostov on Don' },
  { name: 'Ibn Arabi', birth: new Date('1165-11-16'), city: 'Murcia' },
  { name: 'Mao Zedong', birth: new Date('1893-12-26'), city: 'Shaoshan' },
  { name: 'Rene Descartes', birth: new Date('1596-03-31'), city: 'La Haye en Touraine' }
];

// Difine Person prototype with calculating field

function Person() {}

Person.prototype = {
  get age() {
    var difference = new Date() - this.birth;
    return Math.floor(difference / 31536000000);
  }
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
