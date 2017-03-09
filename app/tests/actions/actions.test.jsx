var expect = require('expect');
var actions = require('actions');
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import firebase, {firebaseRef} from 'app/firebase/';

import * as types from 'app/actions/types';

var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
  it('should generate set search text action', () => {
    var action = {
      type: types.SET_SEARCH_TEXT,
      searchText: 'Any Search Text'
    }
    var res = actions.setSearchText(action.searchText);
    expect(res).toEqual(action);
  });

  it('should generate add todo action', () => {
    var action = {
      type: types.ADD_TODO,
      todo: {
        id: '123abc',
        text: 'Any Text',
        completed: false,
        createdAt: 0
      }
    };
    var res = actions.addTodo(action.todo);
    expect(res).toEqual(action);
  });

  it('should create todo and dispatch ADD_TODO', (done) => {
    const store = createMockStore({});
    const todoText = 'Any todo text';
    store.dispatch(actions.startAddTodo(todoText)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toInclude({
        type: types.ADD_TODO
      });
      expect(actions[0].todo).toInclude({
        text: todoText
      });
      done();
    }).catch(done);
  });

  it('should generate add todos action', () => {
    var action = {
      type: types.ADD_TODOS,
      todos: [
        {
          id: '111',
          text: 'Any Text',
          completed: false,
          completedAt: undefined,
          createdAt: 33000
        }
      ]
    };
    var res = actions.addTodos(action.todos);
    expect(res).toEqual(action);
  });

  it('should generate toggle show completed action', () => {
    var action = {
      type: types.TOGGLE_SHOW_COMPLETED
    }
    var res = actions.toggleShowCompleted();
    expect(res).toEqual(action);
  });

  it('should generate update todo action', () => {
    var action = {
      type: types.UPDATE_TODO,
      id: 4,
      updates: {
        completed: false
      }
    }
    var res = actions.updateTodo(action.id, action.updates);
    expect(res).toEqual(action);
  });

  describe('Tests with firebase todos', () => {
    var testTodoRef;

    beforeEach((done) => {
      testTodoRef = firebaseRef.child('todos').push();
      testTodoRef.set({
        text: 'Any todo text',
        completed: false,
        createdAt: 9837346
      }).then(() => done());
    });

    afterEach((done) => {
      testTodoRef.remove().then(() => done());
    });

    it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({});
      const action = actions.startToggleTodo(testTodoRef.key, true);
      store.dispatch(action).then(() => {
          const mockActions = store.getActions();
          expect(mockActions[0]).toInclude({
            type: types.UPDATE_TODO,
            id: testTodoRef.key
          });
          expect(mockActions[0].updates).toInclude({
            completed: true
          });
          expect(mockActions[0].updates.completedAt).toExist();
          done();
        }, done);
    });
  })
})
