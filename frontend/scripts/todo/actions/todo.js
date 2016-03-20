import jQuery from 'jquery';

export const SHOW_TODO = 'SHOW_TODO';
export const SHOW_SPINNER = 'SHOW_SPINNER';
export const SHOW_ERRORS = 'SHOW_ERRORS';
export const UPDATE_FILTER = 'UPDATE_FILTER';

export const SHOW_EDIT_FORM = 'SHOW_EDIT_FORM';
export const SHOW_TODO_LIST = 'SHOW_TODO_LIST';

export const UPDATE_TODO_TEXT = 'UPDATE_TODO_TEXT';
export const UPDATE_TODO_COMPLETE = 'UPDATE_TODO_COMPLETE';
export const CLEAR_EDIT_FORM = 'CLEAR_EDIT_FORM';

export function updateFilter(filter) {
    return {
        type: UPDATE_FILTER
        , filter: filter
    };
}

export function clearEditForm() {
    return {
        type: CLEAR_EDIT_FORM
    };
}

export function showTodoList() {
    return {
        type: SHOW_TODO_LIST
    };
}

export function showEditForm(todo) {
    return {
        type: SHOW_EDIT_FORM
        , todo: todo
    };
}

export function updateTodoText(text) {
    return {
        type: UPDATE_TODO_TEXT
        , text: text
    };
}

export function showSpinner() {
    return {
        type: SHOW_SPINNER
    };
}

export function showTodos(todos) {
    return {
        type: SHOW_TODO
        , todos
    };
}

export function showErrors(errors) {
    return {
        type: SHOW_ERRORS
        , errors
    };
}

export function fetchTodos() {
    return dispatch => {
        dispatch(showSpinner());

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
