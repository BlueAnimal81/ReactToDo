var expect = require('expect');
var actions = require('actions');

import * as types from 'app/actions/types';

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
      text: "Any Todo"
    }
    var res = actions.addTodo(action.text);
    expect(res).toEqual(action);
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

  it('should generate toggle todo action', () => {
    var action = {
      type: types.TOGGLE_TODO,
      id: 4
    }
    var res = actions.toggleTodo(action.id);
    expect(res).toEqual(action);
  });
})
