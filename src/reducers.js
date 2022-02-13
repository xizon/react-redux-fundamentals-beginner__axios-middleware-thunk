
// Reducer 1
// 异步获取http请求
//---------
export default function theDefaultReducer(state = [], action) {
  switch (action.type) {
    case 'RECEIVE_DEMO_LIST':
      return action.payload;

    default:
      return state
  }
}

// Reducer 2
// 计数器加减
//---------
export function countReducer(state = {count: 0}, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }

    case 'DECREMENT':
      return { count: state.count - 1 }
      
    default:
      return state
  }

}


// Reducer 3
// 默认的固定数值
//---------
export const firstNamedReducer = (state = 1, action) => state

// Reducer 4
// 默认的固定数值
//---------
export const secondNamedReducer = (state = 2, action) => state
