/**  @jsx React.DOM  */

/**
 * Module dependencies
 */

var d3 = require('d3-browserify');
var React = require('react');
var Graph = require('./Graph-d3');

/**
 * Graph
 *
 * This mostly defers to our d3 graph model, which it
 * instantiates, and then updates when our props change.
 */

var Graph = React.createClass({
  render: function(){
    return <svg></svg>
  },

  componentDidMount: function(){
    this.graph = new Graph(this.getDOMNode(), this.props);
  },

  shouldComponentUpdate: function(props){
    this.graph.update(props);

    // skip React's render step
    return false;
  }

});