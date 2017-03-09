var expect = require('expect');

var TodoApi = require('TodoApi');

describe('TodoApi', () => {
  beforeEach(() => {
    localStorage.removeItem('todos');
  });

  it('should exist', () => {
    expect(TodoApi).toExist();
  });
  
  describe('filterTodos', () => {
    var todos = [{
      id: 1,
      text: 'Some Text',
      completed: true
    },{
      id: 2,
      text: 'Other Text',
      completed: false
    },{
      id: 3,
      text: 'some Text',
      completed: true
    }];

    it('should return all items if showCompleted is true', () => {
      var filteredTodos = TodoApi.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(3);
    });

    it('should return non-completed items if showCompleted is false', () => {
      var filteredTodos = TodoApi.filterTodos(todos, false, '');
      expect(filteredTodos.length).toBe(1);
    })

    it('should sort by completed status', () => {
      var filteredTodos = TodoApi.filterTodos(todos, true, '');
      expect(filteredTodos[0].completed).toBe(false);
    });

    it('should filter items by searchText', () => {
      var filteredTodos = TodoApi.filterTodos(todos, true, 'some');
      expect(filteredTodos.length).toBe(2);
    })

    it('should filter items by searchText if upper case', () => {
      var filteredTodos = TodoApi.filterTodos(todos, true, 'Some');
      expect(filteredTodos.length).toBe(2);
    })

    it('should return all items if searchText is empty', () => {
      var filteredTodos = TodoApi.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(3);
    })


  });
});
