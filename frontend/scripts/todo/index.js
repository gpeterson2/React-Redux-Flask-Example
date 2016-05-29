import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import {
    TodoCreateForm
    , TodoEditForm
    , TodoListContainer
} from './containers';
import configureStore from './store/configureStore';

let store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

let rootElement = document.getElementById('todo-container');
render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={TodoListContainer} />
            <Route path="/page/:page" component={TodoListContainer} />
            <Route path="add" component={TodoCreateForm} />
            <Route path="edit/:todoId" component={TodoEditForm} />
        </Router>
    </Provider>,
    rootElement
);
