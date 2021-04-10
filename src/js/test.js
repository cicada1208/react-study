const _ = require('lodash');

function removeNamespace(namespace, types) {
  return _.reduce(
    types,
    (typeObj, typeValue, typeName) => {
      typeObj[typeName] = _.reduce(
        typeValue,
        (obj, v, k) => {
          obj[k] = v.replace(namespace, '');
          return obj;
        },
        {}
      );
      return typeObj;
    },
    {}
  );
}

const Types = {
  // <-- public
  getters: {
    GET_FIRST_THING: 'things/GET_FIRST_THING',
    GET_SECOND_THING: 'things/GET_SECOND_THING',
  },
  mutations: {
    SET_FIRST_THING: 'things/SET_FIRST_THING',
    SET_SECOND_THING: 'things/SET_SECOND_THING',
  },
};

const _types = removeNamespace('things/', Types); // <-- private

console.log(_types);
