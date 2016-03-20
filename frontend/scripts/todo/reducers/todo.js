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
