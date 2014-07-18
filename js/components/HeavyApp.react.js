/**  @jsx React.DOM  */

var Page = require('./Page.react');
var React = require('react');
var WeightStore = require('../stores/WeightStore');
var UserStore = require('../stores/UserStore');
var AppStore = require('../stores/AppStore');

/**
 * Retrieve weight data from WeightStore
 */

function getHeavyState(){
  return {
    weightsStore: WeightStore,
    userStore: UserStore,
    appStore: AppStore
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
    WeightStore.bindListener(this._onChange);
    UserStore.bindListener(this._onChange);
    AppStore.bindListener(this._onChange);
  },

  componentWillUnmount: function() {
    WeightStore.removeListener(this._onChange);
    UserStore.removeListener(this._onChange);
    AppStore.bindListener(this._onChange);
  },

  render: function() {
    return (
      <div class='HeavyApp'>
        <Page 
          weights={this.state.weightsStore} 
          user={this.state.userStore}
          app={this.state.appStore}
        />
      </div>
    )
  },

  _onChange: function(){
    this.setState(getHeavyState());
  }

});

module.exports = HeavyApp;