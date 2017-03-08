var expect = require('expect');
var reducers = require('reducers');
var df = require('deep-freeze-strict');

import * as types from 'app/actions/types';

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('should set search text', () => {
      var action = {
        type: types.SET_SEARCH_TEXT,
        searchText: 'Any search text'
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
})
