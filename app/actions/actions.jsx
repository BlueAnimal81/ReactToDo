import moment from 'moment';
import firebase, {firebaseRef, githubProvider} from 'app/firebase/';
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

export var updateTodo = (id, updates) => {
  return {
    type: types.UPDATE_TODO,
    id,
    updates
  }
}

export var startAddTodos = () => {
  return (dispatch, getState) => {
    var todosRef = firebaseRef.child('todos');

    return todosRef.once('value').then((snapshot) => {
      var todos = snapshot.val() || {};
      var parsedTodos = [];

      Object.keys(todos).forEach((todoId) => {
        parsedTodos.push({
          id: todoId,
          ...todos[todoId]
        });
      });

      dispatch(addTodos(parsedTodos));
    });
  }
}

export var startToggleTodo = (id, completed) => {
  return (dispatch, getState) => {
    var todoRef = firebaseRef.child(`todos/${id}`);
    var updates = {
      completed,
      completedAt: completed ? moment().unix() : null
    };
    return todoRef.update(updates).then(() => {
      dispatch(updateTodo(id, updates));
    })
  }
}

export var login = (uid) => {
  return {
    type: types.LOGIN,
    uid
  }
}

export var startLogin = () => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(githubProvider).then(
      (result) => {
        console.log('Auth worked!', result);
      },
      (e) => {
        console.log('Unable to auth', e);
      }
    )
  }
}

export var logout = () => {
  return {
    type: types.LOGOUT
  }
}

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(
      () => {
        console.log('Logged out');
      }
    );
  }
}
