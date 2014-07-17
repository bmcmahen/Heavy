/**  @jsx React.DOM  */

var React = require('react');
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;


var FieldInput = React.createClass({

  propTypes: {
    className: ReactPropTypes.string,
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    onSave: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.string,
    submitValue: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
      value: this.props.value || '',
      error: ''
    };
  },

  render: function() {
    return (
      <div>
        <span class='error'>{this.state.error}</span>
        <form onSubmit={this.onSubmit}> 
          <input
            className={this.props.className}
            id={this.props.id}
            placeholder={this.props.placeholder}
            onChange={this._onChange}
            onKeyDown={this._onKeyDown}
            value={this.state.value}
            autoFocus={true}
          />
          <input type='submit' value={this.props.submitValue} />
        </form>
      </div>
    );
  },

   /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  
  onSubmit: function(e) {
    if (e) e.preventDefault();
    var validation = this.props.validation;
    if (validation && !validation(this.state.value)) {
      return this.setState({ error: 'Invalid input' });
    }
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  },

  /**
   * @param {object} event
   */
  
  _onChange: function(e) {
    this.setState({
      value: e.target.value,
      error: ''
    });
  },

  /**
   * @param  {object} e
   */
  _onKeyDown: function(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.onSubmit();
    }
  }
});

module.exports = FieldInput;