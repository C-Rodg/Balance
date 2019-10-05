// Libraries
import {combineReducers} from 'redux';

// Reducers
import expensesReducer from './expensesReducer';

const rootReducer = combineReducers({
  expenses: expensesReducer,
});

export default rootReducer;
