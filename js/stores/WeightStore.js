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
    this.weights = {};
    this.loadingWeights = {};

    this.bindActions(
      WeightConstants.LOAD_WEIGHTS, this.onLoadWeights,
      WeightConstants.LOAD_WEIGHTS_SUCCESS, this.onLoadWeightsSuccess,
      WeightConstants.LOAD_WEIGHTS_FAIL, this.onLoadWeightsFail,
      WeightConstants.ADD_WEIGHT, this.onAddWeight,
      WeightConstants.ADD_WEIGHT_SUCCESS, this.onAddWeightSuccess,
      WeightConstants.ADD_WEIGHT_FAIL, this.onAddWeightFail,
      WeightConstants.DESTROY_WEIGHT, this.onDestroyWeight
    );
  },

  onLoadWeights: function(){
    this.loading = true;
    this.weights = [];
    this.error = null;
    this.emit('change');
  },

  onLoadWeightsSuccess: function(docs){
    docs.forEach(function(doc){
      this.weights[doc._id] = doc;
    }, this);
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
    this.weights[doc.id] = weight;
    this.emit('change');
  },

  onAddWeightSuccess: function(res){
    var loadingId = res.id;
    delete this.weights[res.id];
    this.weights[res.weight._id] = res.weight;
    this.emit('change');
  },

  onAddWeightFail: function(doc){
    delete this.weights[doc.id];
    this.error = doc.error;
    this.emit('change');
  },

  onDestroyWeight: function(doc){
    console.log('destroy weight', doc);
  }

});

module.exports = WeightStore;