/**  @jsx React.DOM  */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var _ = require('underscore');
var WeightItem = require('./WeightItem.react');

var MainSection = React.createClass({

  render: function(){


    var weights = this.props.weightsStore.weights;

    // var date_sort_asc = function (date1, date2) {
    //   if (date1.date > date2.date) return -1;
    //   if (date1.date < date2.date) return 1;
    //   return 0;
    // };

    // weights.sort(date_sort_asc);

    if (!weights) return (
      <section id='main'>
      </section>
    )

    var listItems = [];

    for (var key in weights) {
      var w = weights[key].weight;
      var listItem = <li><span>{w}</span></li>
      listItems.push(listItem);
    }

    return (
      <section id='main'>
        <ul id='weight-list'>
          {listItems}
        </ul>
      </section>
    )
  }
});

module.exports = MainSection;