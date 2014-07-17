/**  @jsx React.DOM  */

var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var WeightStore = require('../stores/WeightStore');
var WeightActions = require('../actions/WeightActions');

/**
 * Retrieve weight data from WeightStore
 */

function getHeavyState(){
  return {
    weightsStore: WeightStore
  };
}

/**
 * Main App Class
 */

var HeavyApp = React.createClass({

  getInitialState: function() {
    return getHeavyState();
  },

  componentDidMount: function() {
    WeightActions.load();
    WeightStore.bindListener(this._onChange);
  },

  componentWillUnmount: function() {
    WeightStore.removeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <Header />
        <MainSection weightsStore={this.state.weightsStore}/>
      </div>
    );
  },

  _onChange: function(){
    this.setState(getHeavyState());
  }

});

module.exports = HeavyApp;