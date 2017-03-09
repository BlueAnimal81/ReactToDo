import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router';
import firebase from 'app/firebase';

import * as actions from 'actions';
var store = require('configureStore').configure();
import Router from 'app/router/'

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(actions.login(user.uid));
    hashHistory.push('/todos');
  } else {
    store.dispatch(actions.logout());
    hashHistory.push('/');
  }
});

store.dispatch(actions.startAddTodos());

// Load foundation.
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    {Router}
  </Provider>,
  document.getElementById('app')
);
