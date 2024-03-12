// store.js
import { createStore } from 'redux';
import rootReducer from './reducers'; // Assuming you have root reducer

const store = createStore(rootReducer);

export default store;
