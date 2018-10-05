import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route } from 'react-router-dom';
import {Elements, StripeProvider} from 'react-stripe-elements';


import reducer from './reducers';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
    reducer, 
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);    

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <StripeProvider apiKey="pk_test_BXlLrCAozvQjBtsCuboLjwGn">
                <Elements>
                    <Route component={App} />
                </Elements>
            </StripeProvider>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
