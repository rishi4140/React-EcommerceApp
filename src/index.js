import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import products from './reducers/index'
import "@mui/material"
import { createStore } from 'redux';
import { Provider } from 'react-redux'
const store=createStore(products)

/*It imports the necessary dependencies, including React, ReactDOM, CSS styles, the main App component, the products reducer, 
and the required modules from MUI (Material-UI). It creates a Redux store using the products reducer and wraps the App component with the Redux 
Provider to provide access to the store. Finally, it renders the root component of the application using ReactDOM's createRoot method. */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>

        <App />
    </Provider>
);


