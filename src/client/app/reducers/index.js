import { combineReducers } from 'redux';
import { championReducer } from './championReducer.js';
import { commentReducer } from './commentReducer.js'

const reducers = combineReducers({
  champions: championReducer,
  comments: commentReducer
})

export default reducers;