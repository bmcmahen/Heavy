/**  @jsx React.DOM  */

var React = require('react');

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isWeight(n){
  if (!isNumber(n)) return false;
  if (n < 0 && n > 500) return false;
  return true;
}

var HelloMessage = module.exports = React.createClass({

  getInitialState: function(){
    return { text: '' , error: '' }
  },

  render: function(){
    return (
      <div> 
        <form onSubmit={this.onSubmit}>
          <div class="error {this.state.error ? 'visible' : ''}">{this.state.error}</div>
          <input onChange={this.onChange} value={this.state.text} />
          <input type='submit' value='Add Weight'/>
        </form>
        <a href='#' onClick={this.addRandom}>Add random</a>
      </div>
    )
  },

  onChange: function(e){
    this.setState({ text: e.target.value, error: null });
  },

  onSubmit: function(e){
    e.preventDefault();
    var weight = this.state.text;
    // validate it
    if (!isWeight(weight)) {
      return this.setState({ error: 'Not a valid weight' });
    }
    this.setState({ text: '' });
  },

  addRandom: function(e){
    e.preventDefault();
    datas[0].push({weight: 150, date: '08/12/2014'})
    graph.update();
  }

});