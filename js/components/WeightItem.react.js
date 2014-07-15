/**  @jsx React.DOM  */


var React = require('react');
var ReactPropTypes = React.PropTypes;

var WeightItem = React.createClass({

  propType: {
    weight: ReactPropTypes.object.isRequired
  },

  render: function(){
    var weight = this.props.weight; 
    
    return (
      <li key={weight._id}>
        <span class='date'>{weight.date}</span>
        <span class='weight'>{weight.weight}</span>
      </li>
    )
  }
})

module.exports = WeightItem;