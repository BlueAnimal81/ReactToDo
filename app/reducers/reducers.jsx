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
