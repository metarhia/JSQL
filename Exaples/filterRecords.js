// Define Data Source

var data = [
  { name: 'Marcus Aurelius', birth: { date: new Date('212-04-26'), city: 'Rome' } },
  { name: 'Victor Glushkov', birth: { date: new Date('1923-08-24'), city: 'Rostov on Don' } },
  { name: 'Ibn Arabi', birth: { date: new Date('1165-11-16'), city: 'Murcia' } },
  { name: 'Mao Zedong', birth: { date: new Date('1893-12-26'), city: 'Shaoshan' } },
  { name: 'Rene Descartes', birth: { date: new Date('1596-03-31'), city: 'La Haye en Touraine' } }
];

// Define Query

var query = (person) => (
  person.name !== '' &&
  person.age > 18 &&
  person.birth.city === 'Rome'
);

// Difine Person prototype with calculating field

function Person() {}

Person.prototype = {
  get age() {
    var difference = new Date() - this.birth.date;
    return Math.floor(difference / 31536000000);
  }
};

// Assign prototype to array elements

data.forEach((person) => {
  person.__proto__ = Person.prototype;
});

// Filter Data using Query

var res = data.filter(query);
console.dir(res);
