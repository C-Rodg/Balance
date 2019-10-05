// Libraries
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

// Reducer
import rootReducer from '../reducers';

// Middleware
const middleware = [thunk];

export const store = createStore(rootReducer, applyMiddleware(...middleware));
