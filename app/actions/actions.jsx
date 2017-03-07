import * as types from 'app/actions/types';

export var setSearchText = (searchText) => {
  return {
    type: types.SET_SEARCH_TEXT,
    searchText
  }
}

export var addTodo = (text) => {
  return {
    type: types.ADD_TODO,
    text
  }
}

export var toggleShowCompleted = () => {
  return {
    type: types.TOGGLE_SHOW_COMPLETED
  }
}

export var toggleTodo = (id) => {
  return {
    type: types.TOGGLE_TODO,
    id
  }
}
