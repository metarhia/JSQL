var query = `(person) => (
  person.name !== '' &&
  person.age > 18 &&
  person.city === 'Rome'
)`;

module.exports = query;
