import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

/*
Redux Thunk中间件使您可以编写返回函数而不是操作的操作创建者。重击程序可用于延迟操作的分发，或者仅在满足特定条件时调度。内部函数接收存储方法dispatch和getState作为参数。
如您所见，它将返回一个函数而不是一个动作，这意味着您可以随时等待并调用它，因为它是一个函数。

Middleware 中间件它在 dispatch action 和到达 reducer 的那一刻之间提供了逻辑插入点。可以使用 Redux 中间件进行日志记录、异常监控、与异步 API 对话、路由等。
*/

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

