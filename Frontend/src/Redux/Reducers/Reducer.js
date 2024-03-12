// reducers.js
import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Import your auth reducer
import otherReducer from './otherReducer'; // Import other reducers

const rootReducer = combineReducers({
  auth: authReducer,
  other: otherReducer,
});

export default rootReducer;
