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