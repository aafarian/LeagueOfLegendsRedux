import { createStore } from 'redux';
import reducers from '../reducers/index.js';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(()=> console.log('changed to',store.getState()))

export default store;