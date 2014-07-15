/**  @jsx React.DOM  */

var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var HeavyStore = require('../stores/HeavyStore');
var HeavyActions = require('../actions/HeavyActions');

/**
 * Retrieve weight data from HeavyStore
 */

function getHeavyState(){
  return {
    weightsStore: HeavyStore
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
    HeavyActions.load();
    HeavyStore.bindListener(this._onChange);
  },

  componentWillUnmount: function() {
    HeavyStore.removeListener(this._onChange);
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