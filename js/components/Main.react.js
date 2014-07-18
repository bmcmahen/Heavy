/**  @jsx React.DOM  */

var React = require('react');
var WeightActions = require('../actions/WeightActions');


var Main = React.createClass({
  render: function(){
    return (
      <div class='Main'>
        <div class='left-column'>
          <AddWeight/>
          <WeightList weights={this.props.weights} />
        </div>
        <div class='right-column'>
          <Graph weights={this.props.weights} />
        </div>
      </div>
    )
  }

});

module.exports = Main;