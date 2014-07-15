var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var HeavyConstants = require('../constants/HeavyConstants');
var CreateStore = require('./CreateStore');
var _ = require('underscore');

var WeightStore = CreateStore(AppDispatcher, {

  initialize: function() {
    this.loading = false;
    this.adding = false;
    this.error = null;
    this.weights = [];
    this.loadingWeights = {};

    this.bindActions(
      HeavyConstants.LOAD_WEIGHTS, this.onLoadWeights,
      HeavyConstants.LOAD_WEIGHTS_SUCCESS, this.onLoadWeightsSuccess,
      HeavyConstants.LOAD_WEIGHTS_FAIL, this.onLoadWeightsFail
    );
  },

  onLoadWeights: function(){
    this.loading = true;
    this.weights = [];
    this.error = null;
    this.emit('change');
    console.log('loading weights');
  },

  onLoadWeightsSuccess: function(payload){
    console.log('loaded weights', payload);
    this.weights = payload;
    this.loading = false;
    this.emit('change');
  },

  onLoadWeightsFail: function(payload){
    console.log('failed to load weights', payload);
    this.loading = false;
    this.error = payload || 'An error occurred. Try reloading';
    this.emit('change');
  }

});

console.log(WeightStore);

module.exports = WeightStore;


// function create(text) {
//   var weight = {
//     weight: text,
//     date: '08/28/2014',
//     _id: new Date()
//   };


//   weights.push();

//   request.post('/user/weights', )
//   console.log('create', text);
// }

// function update(id, updates){
//   console.log('update', id, updates);
//   // update weight here
// }

// function destroy(id) {
//   console.log('destroy', id);
//   // delete item here
// }

// var HeavyStore = _.extend(EventEmitter.prototype, {
//   getAll: function(){
//     return weights;
//   },

//   emitChange: function(){
//     this.emit(CHANGE_EVENT);
//   },

//   addChangeListener: function(fn){
//     this.on(CHANGE_EVENT, fn);
//   },

//   removeChangeListener: function(fn){
//     this.removeListener(CHANGE_EVENT, fn);
//   }
// });

// // Register to handle all updates
// AppDispatcher.register(function(payload) {
//   var action = payload.action;
//   var text;

//   switch(action.actionType) {
//     case HeavyConstants.WEIGHT_ADD:
//       text = action.text.trim();
//       if (text !== '') {
//         create(text);
//       }
//       break;

//     case HeavyConstants.WEIGHT_DESTROY:
//       destroy(action.id);
//       break;

//     case HeavyConstants.LOAD_WEIGHTS:
//       weights = action;
//       break;

//     case HeavyConstants.LOAD_WEIGHTS_SUCCESS:

//     default:
//       return true;
//   }

//   // This often goes in each case that should trigger a UI change. This store
//   // needs to trigger a UI change after every view action, so we can make the
//   // code less repetitive by putting it here.  We need the default case,
//   // however, to make sure this only gets called after one of the cases above.
//   HeavyStore.emitChange();

//   return true; // No errors.  Needed by promise in Dispatcher.
// });

// module.exports = HeavyStore;