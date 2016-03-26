// This handles all state changes for the application.
//
// Technically there is no need for a separate todos/todo reducer. While it
// does simplify the code, it was written this way more as an example of how
// items can interact than anything else.
//
// Note it could be argued whether values should be set here or supplied from
// the action calls. In this case I put all ajax calls in the actions, but for
// the show/hide I set the variables directly here. It all depends on what your
// application is going to do.
//
// Note - you never want to "mutate" a value from state, including updating
// the values in an array. It didn't come up here, but if you do want to
// perform such an action make sure you copy the value and return the one, or
// you are likely to get strange errors where things do not work.

import { combineReducers } from 'redux';
import {
    CLEAR_EDIT_FORM
    , SHOW_EDIT_FORM
    , SHOW_SPINNER
    , SHOW_TODO_LIST
    , UPDATE_FILTER
    , UPDATE_TODO_TEXT
    , SHOW_TODO
} from '../actions/todo';

const initialStateTodos = {
    todos: []
    , filter: 'ALL'
    , showTodoList: true
    , showCreateForm: true
    , showEditForm: false
};

// Handles the list fuctionality, including "routing" logic.
function todos(state = initialStateTodos, action) {

    switch(action.type) {
        case SHOW_TODO:
            return Object.assign({}, state, {
                todos: action.todos
                , showSpinner: false
            });
        case SHOW_SPINNER:
            return Object.assign({}, state, {
                todos: action.todos
                , showSpinner: true
            });
        case SHOW_TODO_LIST:
            return Object.assign({}, state, {
                showTodoList: true
                , showCreateForm: true
                , showEditForm: false
                , showSpinner: false
            });
        case SHOW_EDIT_FORM:
            return Object.assign({}, state, {
                showTodoList: false
                , showCreateForm: false
                , showEditForm: true
                , showSpinner: false
            });
        case UPDATE_FILTER:
            return Object.assign({}, state, {
                filter: action.filter
            });
        default:
            return state;
    }
}

const initialStateTodo = {
    todo: {
        todo_id: null
        , text: ''
        , complete: false
    }
};

// Handles updating the text from the edit form.
function todo(state = initialStateTodo, action) {
    switch(action.type) {
        case SHOW_EDIT_FORM:
            return Object.assign({}, state, {
                todo: action.todo
            });
        case UPDATE_TODO_TEXT:
            let orig = state.todo;
            return Object.assign({}, state, {
                todo: {
                    todo_id: orig.todo_id
                    , todo: action.text
                    , complete: orig.complete
                }
            });
        case CLEAR_EDIT_FORM:
            return initialStateTodo;
        default:
            return state;
    }
}

const todoApp = combineReducers({
    todos: todos,
    todo: todo
});

export default todoApp;
