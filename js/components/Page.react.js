/**  @jsx React.DOM  */

var React = require('react');
var Intro = require('./Intro.react');
var Main = require('./Main.react');

var Page = React.createClass({

  render: function(){
    return (this.props.app.page === 'main')
      ? <Main weights={this.props.weights} user={this.props.user} />
      : <Intro weights={this.props.weights} user={this.props.user} />
  }

});

module.exports = Page;