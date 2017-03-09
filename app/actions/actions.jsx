import moment from 'moment';
import firebase, {firebaseRef} from 'app/firebase/';
import * as types from 'app/actions/types';

export var setSearchText = (searchText) => {
  return {
    type: types.SET_SEARCH_TEXT,
    searchText
  }
}

export var addTodo = (todo) => {
  return {
    type: types.ADD_TODO,
    todo
  }
}

export var startAddTodo = (text) => {
  return (dispatch, getState) => {
    var todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    };
    var todoRef = firebaseRef.child('todos').push(todo);
    return todoRef.then(() => {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }));
    });
  }
}

export var addTodos = (todos) => {
  return {
    type: types.ADD_TODOS,
    todos
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
