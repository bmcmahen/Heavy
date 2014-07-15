var d3 = require('d3');
var React = require('react');

function update(props){
  return function(shape){
    // update fn
    shape
      .attr('fill', props.color);
  }
}

function getHeavyState(){
  return {
    allWeights: HeavyStore.getAll()
  };
}

var Graph = React.createClass({
  render: function(){
    return (
      <svg width='200' height='200'></svg>
    )
  },

  componentDidMount: function() {
    HeavyStore.addChangeListener(this._onChange);
    d3.select(this.getDOMNode())
      .append('circle')
      .call(update(this.props));
  },

  componentWillUnmount: function(){
    HeavyStore.removeChangeListener(this._onChange);
  },

  shouldComponentUpdate: function(props){
    d3.select(this.getDOMNode())
      .select('circle')
      .call(update(props));

    // skip React's render step
    return false;
  },

  _onChange: function(){
    this.setState(getHeavyState());
  }
});