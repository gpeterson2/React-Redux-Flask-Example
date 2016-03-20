import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import todoApp from '../reducers/todo';

export default function configureStore(initialState) {

    const store = createStore(
        todoApp,
        initialState,
        applyMiddleware(thunkMiddleware)
    );

    return store;
}
