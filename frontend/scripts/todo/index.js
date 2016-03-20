import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './store/configureStore';

let store = configureStore();

let rootElement = document.getElementById('todo-container');
render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
