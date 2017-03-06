var expect = require('expect');

var TodoApi = require('TodoApi');

describe('TodoApi', () => {
  beforeEach(() => {
    localStorage.removeItem('todos');
  });

  it('should exist', () => {
    expect(TodoApi).toExist();
  });

  describe('setTodos', () => {
    it('should set valid todos array', () => {
      var todos = [{
        id: 23,
        text: 'any text',
        completed: false
      }]
      TodoApi.setTodos(todos);

      var actualTodos = JSON.parse(localStorage.getItem('todos'));

      expect(actualTodos).toEqual(todos);
    });

    it('should not set invalid todos array', () => {
      var badTodos = {a: 'b'};
      TodoApi.setTodos(badTodos);

      expect(localStorage.getItem('todos')).toBe(null);
    });
  });

  describe('getTodos', () => {
    it('should return empty array for bad localStorage data', () => {
      var actualTodos = TodoApi.getTodos();
      expect(actualTodos).toEqual([]);
    });

    it('should return todos if valid array in localStorage', () => {
      var todos = [{
        id: 23,
        text: 'any text',
        completed: false
      }]

      localStorage.setItem('todos', JSON.stringify(todos));
      var actualTodos = TodoApi.getTodos();

      expect(actualTodos).toEqual(todos);
    });
  });
});
