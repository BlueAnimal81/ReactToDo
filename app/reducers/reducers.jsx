var uuid = require('node-uuid');
var moment = require('moment');

import * as types from 'app/actions/types';

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
        {
          id: uuid(),
          text: action.text,
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined
        }
      ];
    case types.TOGGLE_TODO:
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            completed: !todo.completed,
            completedAt: !todo.completed ? moment().unix() : undefined
          };
        } else {
          return {
            ...todo
          };
        }
      })
    default:
      return state;
  }
}
