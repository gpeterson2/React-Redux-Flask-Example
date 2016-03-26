// This file contains the "public api" for redux state changes.
//
// This is one of those things that doesn't look worth the effort until you
// run into large-scale usage. I tried to show some examples of more
// complicated use cases, but I'm not sure how successful it was.
//
// NOTE - jQuery was used simply for the ajax interface, it is not at all
// required for React or Redux.

import jQuery from 'jquery';

// Constants
// TODO - move these to a separate file.

// Todo list
export const SHOW_TODO = 'SHOW_TODO';
export const SHOW_SPINNER = 'SHOW_SPINNER';
export const SHOW_ERRORS = 'SHOW_ERRORS';
export const UPDATE_FILTER = 'UPDATE_FILTER';

// Component visibility
export const SHOW_EDIT_FORM = 'SHOW_EDIT_FORM';
export const SHOW_TODO_LIST = 'SHOW_TODO_LIST';

// Update
export const UPDATE_TODO_TEXT = 'UPDATE_TODO_TEXT';
export const UPDATE_TODO_COMPLETE = 'UPDATE_TODO_COMPLETE';
export const CLEAR_EDIT_FORM = 'CLEAR_EDIT_FORM';

/* Updates the filter
 *
 * It accepts "ALL", "COMPLETE" or "INCOMPLETE".
 *
 * @param filter - the filter value.
 */
export function updateFilter(filter) {
    return {
        type: UPDATE_FILTER
        , filter: filter
    };
}

/* Clears the edit form */
export function clearEditForm() {
    return {
        type: CLEAR_EDIT_FORM
    };
}

/* Displays the todo list and hides the edit form. */
export function showTodoList() {
    return {
        type: SHOW_TODO_LIST
    };
}

/* Displays the edit form and hides the todo list.
 *
 * @param todo - A todo item to initialize the form.
 * */
export function showEditForm(todo) {
    return {
        type: SHOW_EDIT_FORM
        , todo: todo
    };
}

/* Updates the todo text.
 *
 * @param text - the text to update.
 */
export function updateTodoText(text) {
    return {
        type: UPDATE_TODO_TEXT
        , text: text
    };
}

/* Shows the spinner component while loading */
export function showSpinner() {
    return {
        type: SHOW_SPINNER
    };
}

/* Shows a list of todo items.
 *
 * @param todos - the list to display.
 */
export function showTodos(todos) {
    return {
        type: SHOW_TODO
        , todos
    };
}

/* Shows any errors
 *
 * @param errors - list of errors.
 */
export function showErrors(errors) {
    return {
        type: SHOW_ERRORS
        , errors
    };
}

/* Fetch todos from the backend.
 *
 * In the process this will trigger the spinner until the fetch is complete.
 */
export function fetchTodos() {
    return dispatch => {
        dispatch(showSpinner());

        // Note you have to use promises for redux-thunk to work.
        return jQuery.ajax({
            url: '/todos/'
            , dataType: 'json'
            , method: 'GET'
        })
        .then(data => {
            return dispatch(showTodos(data.todos));
        }, (xhr, status, err) => {
            return dispatch(showErrors(err));
        });
    };
}

/* Submit a new todo.
 *
 * Once complete this triggers a fetch to redisplay the list.
 */
export function submitTodo(text) {
    return dispatch => {
        dispatch(showSpinner());

        return jQuery.ajax({
            url: '/todos/'
            , contentType: 'application/json'
            , dataType: 'json'
            , method: 'POST'
            , processData: false
            , data: JSON.stringify({'todo': text})
        })
        .then(data => {
            dispatch(showSpinner());
            return dispatch(fetchTodos());
        }, (xhr, status, err) => {
            return dispatch(showErrors(err));
        });
    };
}

/* Update an existing todo.
 *
 * @param todo - The item to update.
 */
export function updateTodo(todo) {
    return dispatch => {
        dispatch(showSpinner());

        const todo_id = todo.todo_id;

        return jQuery.ajax({
            url: '/todos/' + todo_id
            , contentType: 'application/json'
            , dataType: 'json'
            , method: 'PUT'
            , processData: false
            , data: JSON.stringify({'todo': todo})
        })
        .then(data => {
            dispatch(showSpinner());
            return dispatch(fetchTodos());
        }, (xhr, status, err) => {
            return dispatch(showErrors(err));
        });
    };
}
