import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import theDefaultReducer, {
  countReducer,
  firstNamedReducer,
  secondNamedReducer
} from './reducers.js'

// Use ES6 object literal shorthand syntax to define the object shape
const rootReducer = combineReducers({
  reNameDefaultReducer: theDefaultReducer,
  countReducer,
  firstNamedReducer,
  secondNamedReducer
});


export default () => {
	
    /*
    const store = createStore(rootReducer)
    console.log(store.getState())

    Output: 
    {
        countReducer: {count: 0},
        reNameDefaultReducer : [{name: 'XXX'},{name: 'XXX'}], 
        firstNamedReducer : 1, 
        secondNamedReducer : 2
    }
    */

    const _initialState = {}; //JSON
    const _reducer = rootReducer; //Function
    const _enhancer = applyMiddleware(thunk); //Function
    const store = createStore(_reducer, _initialState, _enhancer);
	
    return store;
};

