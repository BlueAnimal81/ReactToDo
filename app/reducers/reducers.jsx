var uuid = require('node-uuid');
var moment = require('moment');

import * as actions from 'actions';
import * as types from 'app/actions/types';

export var authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        uid: action.uid
      };
    case types.LOGOUT:
        return {};
    default:
      return state;
  }
}

export var searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case types.SET_SEARCH_TEXT:
      return action.searchText;
    default:
      return state;
  }
}

export var showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case types.TOGGLE_SHOW_COMPLETED:
      return !state;
    default:
      return state;
  }
}

export var todosReducer = (state = [], action) => {
  switch (action.type) {
    case types.ADD_TODO:
      return [
        ...state,
        action.todo
      ];
    case types.UPDATE_TODO:
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            ...action.updates
          };
        } else {
          return todo;
        }
      });
    case types.ADD_TODOS:
      return [
        ...state,
        ...action.todos
      ];
    case types.LOGOUT:
      return [];
    default:
      return state;
  }
}
