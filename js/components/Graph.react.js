/**  @jsx React.DOM  */

/**
 * Module dependencies
 */

var d3 = require('d3-browserify');
var React = require('react');
var GraphD3 = require('./Graph-D3');

var debug = require('debug')('heavy:components/graph.react');


/**
 * Graph
 *
 * This mostly defers to our d3 graph model, which it
 * instantiates, and then updates when our props change.
 */

var Graph = React.createClass({
  render: function(){
    return <div></div>
  },

  componentDidMount: function(){
    this.graph = new GraphD3(this.getDOMNode(), this.props);
  },

  shouldComponentUpdate: function(props){
    this.graph.update(props);

    // skip React's render step
    return false;
  }

});

module.exports = Graph;