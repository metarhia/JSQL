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
  let filteredProps = filteredPropNames.map(propName => 
        [propName, Object.getOwnPropertyDescriptor(this, propName)]
      ).reduce(putProperty, {});
  return Object.create(Object.getPrototypeOf(this), filteredProps);
}

function putProperty(obj, [propName, prop]) {
  this[propName] = prop;
  return this;
}

console.log(projection.call(data, ['name', 'city']));
console.log(projection.call(data, ['name', 'city'], true));
console.log(projection.call(data, ['name'])[0].age);
console.log(projection.call(data, ['name'], true)[0].age);

module.exports = projection;
