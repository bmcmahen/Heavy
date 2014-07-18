/**  @jsx React.DOM  */

var React = require('react');
var Popup = require('./Popup');
var UserActions = require('../actions/UserActions');

var Intro = React.createClass({
  render: function(){
    return (
      <section class='banner'>
        <div class='inner'>
          <header>
            <h2>Heavy</h2>
          </header>
          <p>Heavy is a simple tool that helps you track your weight loss</p>
          <footer>
            <a href='/auth/google' class='button fit' onClick={this.googleLogin}>Get Started</a>
          </footer>
        </div>
      </section>
    )
  },

  googleLogin: function(e){
    e.preventDefault();
    var win = new Popup('/auth/google', { width: 500, height: 500 });
    win.once('close', function(){
      UserActions.load();
      
      // go to page 2
      // request user from server
    });
  }

});

module.exports = Intro;