/**
 * Module dependencies
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var WeightConstants = require('../constants/WeightConstants');
var CreateStore = require('./CreateStore');

/**
 * Create Weight Store
 * 
 * Loads user's weight history into array
 */

var WeightStore = CreateStore(AppDispatcher, {

  initialize: function() {
    this.loading = false;
    this.adding = false;
    this.error = null;
    this.weights = [];
    this.loadingWeights = {};
    this.destroyingWeights = {};

    this.bindActions(
      WeightConstants.LOAD_WEIGHTS, this.onLoadWeights,
      WeightConstants.LOAD_WEIGHTS_SUCCESS, this.onLoadWeightsSuccess,
      WeightConstants.LOAD_WEIGHTS_FAIL, this.onLoadWeightsFail,
      WeightConstants.ADD_WEIGHT, this.onAddWeight,
      WeightConstants.ADD_WEIGHT_SUCCESS, this.onAddWeightSuccess,
      WeightConstants.ADD_WEIGHT_FAIL, this.onAddWeightFail,
      WeightConstants.DESTROY_WEIGHT, this.onDestroyWeight,
      WeightConstants.DESTROY_WEIGHT_FAIL, this.onDestroyWeightFail
    );
  },

  onLoadWeights: function(){
    this.loading = true;
    this.weights = [];
    this.error = null;
    this.emit('change');
  },

  onLoadWeightsSuccess: function(docs){
    this.weights = docs;
    this.loading = false;
    this.emit('change');
  },

  onLoadWeightsFail: function(payload){
    this.loading = false;
    this.error = payload || 'An error occurred. Try reloading';
    this.emit('change');
  },

  onAddWeight: function(doc){
    var weight = doc.weight;
    this.loadingWeights[doc.id] = weight;
    this.weights.push(weight);
    this.emit('change');
  },

  onAddWeightSuccess: function(res){
    var loadingId = res.id;
    var weight = this.loadingWeights[res.id];
    this.weights[this.weights.indexOf(weight)] = res.weight;
    this.emit('change');
  },

  onAddWeightFail: function(doc){
    var weight = this.loadingWeights[doc.id];
    var i = this.weights.indexOf(weight);
    if (i > -1) {
      this.weights.splice(i, 1);
    } 
    this.emit('change');
  },

  onDestroyWeight: function(doc){
    var id = doc.id;
    var weight;
    var index;

    this.weights.some(function(w, i){
      if (w._id === id) {
        weight = w; 
        index = i;
        return true;
      }
    });

    this.destroyingWeights[id] = weight;
    this.weights.splice(index, 1);
    this.emit('change');
  },

  onDestroyWeightFail: function(doc){
    this.weights.push(this.destroyingWeights[doc.id]);
    delete this.destroyingWeights[doc.id];
    this.error = doc.error;
    this.emit('change');
  },

  onDestroyWeightSuccess: function(doc){
    delete this.destroyingWeights[doc.id];
    this.emit('change');
  }

});

module.exports = WeightStore;