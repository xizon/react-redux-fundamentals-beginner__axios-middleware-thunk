
// Reducer 1
// Get http request asynchronously
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
// Counter reaction
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
// Fixed value
//---------
export const firstNamedReducer = (state = 1, action) => state

// Reducer 4
// Fixed value
//---------
export const secondNamedReducer = (state = 2, action) => state
