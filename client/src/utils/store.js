import { createStore } from '@reduxjs/toolkit';
import { reducer } from './reducers';

// initial state
const intitialState = {
  savedBooks: [],
  searchHistory: [],
  currentSearch: '',
  readBooks: []
}

const store = createStore(reducer, intitialState);

export default store;