/**  @jsx React.DOM  */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var _ = require('underscore');
var WeightItem = require('./WeightItem.react');
var Graph = require('./Graph.react');
var WeightActions = require('../actions/WeightActions');

var debug = require('debug')('heavy:components:mainsection.react');

var ListItem = React.createClass({
  render: function(){
    return (
      <li key={this.props.weight.date}>
        <span class='date'>{this.props.weight.pretty_date}</span>
        <span class='weight'>{this.props.weight.weight}</span>
        <button onClick={this.deleteItem}>delete</button>
      </li>
    )
  },

  deleteItem: function(){
    // what if we are dealing with non synced data?
    WeightActions.destroy(this.props.weight._id);
  }
})

var MainSection = React.createClass({

  render: function(){
    
    var weights = this.props.weightsStore.weights;

    debug('rendering weights', weights);

    var listItems = weights.map(function(weight){
       return <ListItem weight={weight} key={weight.date} />
    });

    return (
      <section id='main'>
        <ul id='weight-list'> {listItems} </ul>
        <Graph weights={this.props.weightsStore.weights} />
      </section>
    )
  }
});

module.exports = MainSection;