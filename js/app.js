/**  @jsx React.DOM  */

var React = require('react');
var debug = require('debug')('heavy');

window.bugger = require('debug');

var HeavyApp = require('./components/HeavyApp.react');

React.renderComponent(
  <HeavyApp />,
  document.getElementById('heavyapp')
);