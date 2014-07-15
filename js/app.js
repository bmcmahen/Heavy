/**  @jsx React.DOM  */

var React = require('react');

var HeavyApp = require('./components/HeavyApp.react');

React.renderComponent(
  <HeavyApp />,
  document.getElementById('heavyapp')
);