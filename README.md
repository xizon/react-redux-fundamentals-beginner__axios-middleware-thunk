# react-redux-fundamentals-beginner__axios-middleware-thunk

[English](README.md) | [中文](README_CN.md)

---

Redux +React + Axios - The process and principle of implementing SSR+ asynchronous request

## File Structures

```sh
src/
├── reducers.js
├── createStore.js
├── getJSONData.js
├── index.js (Entry file, for client/browser)
└── App.js (React component，need to configure your own router)
```

SSR Reference：
```sh
src/server/ 
└── server.js (For Express server-side rendering)
```

## Installation And Test


**Step 1.** First, using an absolute path into your app folder directory.

```sh
$ cd /{your_directory}/react-redux-fundamentals-beginner__axios-middleware-thunk
```


**Step 2.** Before doing all dev stuff make sure you have `Node 14+` installed. After that, run the following code in the main directory to install the node module dependencies.

```sh
$ sudo npm install
```

**Step 3.** Run this project with `create-react-app`

```sh
$ npm run start
```

**Step 4.** When you done, this will spin up a server that can be accessed at

```sh
http://localhost:3000
```



---

### index.js
```js
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'


//
import createStore from './createStore';
import App from './App';


const store = createStore();

// Whenever the store state changes, update the UI by
// reading the latest store state and showing new data
function render() {
  const state = store.getState();
  console.log('state: ', state);
}

// Update the UI with the initial data
render();
// And subscribe to redraw whenever the data changes in the future
store.subscribe(render);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

```

### reducers.js
```js

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

```

### createStore.js

```js
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


```

### getJSONData.js
```js

import axios from 'axios';

const getJSONData = async (name) => {

    // Wait for all the `httpRequest` functions, if they are resolved, run 'store.dispatch()'
    const httpRequest = () => {
      return new Promise( (resolve,reject) => {
        axios({
          timeout: 15000,
          method: 'get',
          url: `https://restcountries.com/v2/name/${name}`,
          responseType: 'json'
        }).then(function (response) {
          resolve( response );
        })
        .catch(function (error) {
          console.log( error );
        });
      });
    };
  
    const getApiData = await httpRequest();
    return getApiData.data;
  
}

export default getJSONData;

```

### App.js

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';

import getJSONData from './getJSONData';

class App extends Component {

	constructor(props) {
		super(props);
	}


	componentDidMount() {

      //from `mapDispatchToProps()`
      this.props.handleGetDataFr();   
	}


	render() {

		//from `mapStateToProps()`
		const preloadedState_httpData = this.props.httpData;
    const preloadedState_count = this.props.count;


    function renderList() {
      if ( preloadedState_httpData !== null ) {
        const list = preloadedState_httpData.map((item, index) => {
          return <li key={index}>{item.name}</li>;
        });
      
        return <ul>{list}</ul>;
      } else {
        return '';
      }

    }

    function renderCounter() {
      
      return preloadedState_count !== null ? preloadedState_count : '';
    }


		return (
      <React.Fragment>
        <a href='#' onClick={() => { this.props.handleGetDataFr(); }}>Asynchronous Fetch Data(fr)</a><br />
        <a href='#' onClick={() => { this.props.handleGetDataUs(); }}> Asynchronous Fetch Data(us)</a><br />
        <a href='#' onClick={() => { this.props.handleIncrement();}}>Counter ({renderCounter()})</a>

        {renderList()}
      </React.Fragment>
		);
	}

}

const mapStateToProps = (state) => {
	const { reNameDefaultReducer, countReducer } = state; //Receive redux

	return {
		httpData: reNameDefaultReducer,
    count: countReducer.count
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleGetDataFr: async () => dispatch({ type: 'RECEIVE_DEMO_LIST', payload: await getJSONData('fr') }),
    handleGetDataUs: async () => dispatch({ type: 'RECEIVE_DEMO_LIST', payload: await getJSONData('us') }),
    handleIncrement: () => dispatch({ type: 'INCREMENT'})
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
```

### server/server.js 【Reference】

Note: You can also encapsulate `axios` as an **action creator** file and export, this **action creator** can be used in `App.js` (the component can be accessed by router, so it can also access the asynchronous request method you created in the component)

```js
import express from 'express';
import axios from 'axios';

//
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import createStore from '../createStore';
import App from '../App';


const port = process.env.port || 3000;
const app = express();

app.get('*', (req, res) => {
    
    const store = createStore();

    store.dispatch(async function(dispatch) {

        // Wait for all the `httpRequest` functions, if they are resolved, run 'store.dispatch()'
        const httpRequest = () => {
            return new Promise( (resolve,reject) => {
                axios({
                    timeout: 15000,
                    method: 'get',
                    url: `https://examples.com`,
                    responseType: 'json'
                }).then(function (response) {
                    resolve( response );
                })
                .catch(function (error) {
                    console.log( error );
                });
            });
        };


        const getApiData = await httpRequest();
        const action = {
            type: 'RECEIVE_DEMO_LIST',
            payload: getApiData.data
        }
        dispatch( action );



        // Send the rendered html to browser.
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        } 

        //
        const context = {};



        // Render template
        const HTMLTmpl = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <div id="app">{{reactApp}}</div>
		
	        <script>window.__PRELOADED_STATE__ = {{preloadedState}};</script>
	        <script src="dist.js"></script>
            </body>
            </html>
        `;


        let template;
        if (template != null && template != '' && typeof template != typeof undefined) {

            const reactContent = ReactDOMServer.renderToString(
                <Provider store={store}>
                <StaticRouter location={pathname} context={context}>
                   <App /> 
                </StaticRouter>
              </Provider>
            );
          

            template = HTMLTmpl.replace('{{reactApp}}', reactContent)
            .replace('{{preloadedState}}', JSON.stringify(store.getState()));
      
            //do something...

        }
      

        if (context.notFound) {
            res.status(404);
        }

        res.send(template);


    });


});

app.listen(port, () => console.log(`Frontend service ok`));
```
