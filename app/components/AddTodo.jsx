var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var AddTodo = React.createClass({
  onFormSubmit: function(e) {
    e.preventDefault();

    var {dispatch} = this.props;
    var text = this.refs.todoText.value;

    if (text.length > 0) {
      this.refs.todoText.value = '';
      dispatch(actions.addTodo(text));
    } else {
      this.refs.todoText.focus();
    }
  },

  render: function() {
    return (
      <div className="container__footer">
        <form onSubmit={this.onFormSubmit}>
          <input type="text" placeholder="What do you need to do?" ref="todoText"/>
          <button className="button expanded" type="submit">Add Todo</button>
        </form>
      </div>
    );
  }
});

export default connect()(AddTodo);
