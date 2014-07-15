var util = require('util');
var Store = require('./Store');

var createStore = function(dispatcher, spec){
  var store = new Store(dispatcher);
  for (var key in spec) {
    if (key === "initialize") {
      // do nothing
    } else if (typeof spec[key] === 'functions') {
      store[key] = spec[key].bind(store);
    } else {
      store[key] = spec[key]
    }
  }

  if (spec.initialize) {
    spec.initialize.call(store);
  }

  return store;
};

module.exports = createStore;