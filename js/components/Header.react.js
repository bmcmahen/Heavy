/**  @jsx React.DOM  */

var React = require('react');
var WeightInput = require('./WeightInput.react');
var HeavyActions = require('../actions/HeavyActions');

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isWeight(n){
  if (!isNumber(n)) return false;
  if (n < 0 && n > 500) return false;
  return true;
}


var Header = React.createClass({
  render: function(){
    return (
      <header id='header'>
        <h1>Weights</h1>
        <WeightInput
          id="new-weight"
          placeholder='Add a weight'
          onSave={this._onSave}
          submitValue='Add Weight'
          validation={this._validation}
        />
      </header>
    );
  },

  _onSave: function(text){
    if (text.trim()) {
      HeavyActions.create(text);
    }
  },

  _validation: function(text){
    return isWeight(text);
  }

});

module.exports = Header;