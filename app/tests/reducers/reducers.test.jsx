var expect = require('expect');
var reducers = require('reducers');
var df = require('deep-freeze-strict');

import * as types from 'app/actions/types';

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('should set search text', () => {
      var action = {
        type: types.SET_SEARCH_TEXT,
        searchText: 'Any Search Text'
      };
      var res = reducers.searchTextReducer(df(''), df(action));
      expect(res).toEqual(action.searchText);
    })
  })

  describe('showCompletedReducer', () => {
    it('should toggle show completed', () => {
      var action = {
        type: types.TOGGLE_SHOW_COMPLETED
      };
      var res = reducers.showCompletedReducer(df(false), df(action));
      expect(res).toEqual(true);
    })
  })

  describe('todosReducer', () => {
    it('should add new todo', () => {
      var action = {
        type: types.ADD_TODO,
        todo: {
          id: 'abc123',
          text: 'Any Text',
          createdAt: 987654321
        }
      };
      var res = reducers.todosReducer(df([]), df(action));
      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(action.todo);
    })

    it('should update todo', () => {
      var todos = [
        {
          id: 1,
          text: 'any text 1',
          completed: false,
          createdAt: 45,
          completedAt: undefined
        },
        {
          id: 2,
          text: 'any text 2',
          completed: false,
          createdAt: 97,
          completedAt: undefined
        }
      ];

      var updates = {
        completed: false,
        completedAt: null
      };

      var action = {
        type: types.UPDATE_TODO,
        id: todos[0],
        updates
      };

      var res = reducers.todosReducer(df(todos), df(action));

      expect(res[0].completed).toEqual(updates.completed);
      expect(res[0].completedAt).toEqual(updates.completedAt);
      expect(res[0].text).toEqual(todos[0].text);
    })

    it('should add existing todos', () => {
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
      var res = reducers.todosReducer(df([]), df(action));
      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(action.todos[0]);
    })
  })

  it('should wipe todos on logout', () => {
    var action = {
      type: types.LOGOUT,
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
    var res = reducers.todosReducer(df([]), df(action));
    expect(res.length).toEqual(0);
  })
})

  describe('authReducer', () => {
    it('should store uid on login', () => {
      var action = {
        type: types.LOGIN,
        uid: 'anyuid'
      };
      var res = reducers.authReducer(undefined, df(action));
      expect(res).toEqual({
        uid: action.uid
      });
    })

    it('should clear uid on logout', () => {
      var authData = {uid: 'anyuid'};
      var action = {
        type: types.LOGOUT,
      };
      var res = reducers.authReducer(df(authData), df(action));
      expect(res).toEqual({});
    })
  })
})
