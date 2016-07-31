var data = [
  { name: 'Marcus Aurelius', birth: { day: '212-04-26', city: 'Rome' } },
  { name: 'Victor Glushkov', birth: { day: '1923-08-24', city: 'Rostov on Don' } },
  { name: 'Ibn Arabi', birth: { day: '1165-11-16', city: 'Murcia' } },
  { name: 'Mao Zedong', birth: { day: '1893-12-26', city: 'Shaoshan' } },
  { name: 'Rene Descartes', birth: { day: '1596-03-31', city: 'La Haye en Touraine' } }
];

var query = (person) => (
  person.name !== '' &&
  person.age > 18 &&
  person.birth.city === 'Rome'
);

data.forEach((person) => {
  person.age = 100;
});

var res = data.filter(query);

console.dir(res);