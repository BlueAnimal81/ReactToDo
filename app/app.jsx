var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var actions = require('actions');
var store = require('configureStore').configure();
import Login from 'app/components/Login';
import TodoApp from 'TodoApp';

store.dispatch(actions.startAddTodos());

// Load foundation.
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/'>
        <IndexRoute component={Login} />
        <Route path='todos' component={TodoApp} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
