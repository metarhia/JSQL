let { data } = require('./filterRecords');

function projection(fieldArr, excluding=false) {
  return this.map(obj => projectOne.call(obj, fieldArr, excluding));
}

function projectOne(fieldArr, excluding=false) {
  let filteredKeys;
  if (excluding) {
    let fieldSet = new Set(fieldArr);
    filteredPropNames = 
          Object.getOwnPropertyNames(this)
                .filter( propName => !fieldSet.has(propName) );
  } else {
    filteredPropNames = fieldArr;
  }
  let filteredProps = filteredPropNames.reduce((obj, propName) => {
                        obj[propName] =  
                          Object.getOwnPropertyDescriptor(this, propName);
                        return obj; 
                      }, {});
  return Object.create(Object.getPrototypeOf(this), filteredProps);
}

console.log(projection.call(data, ['name', 'city']));
console.log(projection.call(data, ['name', 'city'], true));
console.log(projection.call(data, ['name'])[0].age);
console.log(projection.call(data, ['name'], true)[0].age);

module.exports = projection;
