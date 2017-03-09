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

    it('should toggle completed and set completedAt', () => {
      var initialState = [
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

      var action = {
        type: types.TOGGLE_TODO,
        id: 1
      };

      var res = reducers.todosReducer(df(initialState), df(action));

      expect(res[0].completed).toEqual(true);
      expect(res[0].completedAt).toBeA('number');
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
})
