// store.js
import { createStore } from 'redux';
import rootReducer from './Reducers/rootReducer'; // Assuming you have root reducer

const store = createStore(rootReducer);

export default store;
