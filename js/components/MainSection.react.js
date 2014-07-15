/**  @jsx React.DOM  */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var _ = require('underscore');
var WeightItem = require('./WeightItem.react');
var HeavyActions = require('../actions/HeavyActions');

var MainSection = React.createClass({

  render: function(){

    console.log('PROPS', this.props);

    var weights = this.props.weightsStore.weights;

    var date_sort_asc = function (date1, date2) {
      if (date1.date > date2.date) return -1;
      if (date1.date < date2.date) return 1;
      return 0;
    };

    console.log(weights);

    weights.sort(date_sort_asc);

    if (!weights) return (
      <section id='main'>
      </section>
    )

    return (
      <section id='main'>
        <ul id='weight-list'>
          {weights.map(function(result){
            return (<li key={result._id}>
              <span class='date'> {result.date} </span>
              <span class='weight'> {result.weight} </span>
            </li>)
          })}
        </ul>
      </section>
    )
  }
});

module.exports = MainSection;