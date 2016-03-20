import React from 'react';
import { connect } from 'react-redux';
import {
    clearEditForm
    , fetchTodos
    , showTodoList
    , updateTodo
    , updateTodoText
} from '../actions/todo';

var TodoEditForm = React.createClass({

    handleChange: function() {
        const text = this.refs.todo.value.trim();

        const { dispatch } = this.props;
        dispatch(updateTodoText(text));
    }

    , handleSave: function(e) {
        e.preventDefault();

        const node = this.refs.todo;
        const text = node.value.trim();

        const { dispatch, todo } = this.props;

        let updatedTodo = {
            todo_id: todo.todo_id
            , todo: text
            , complete: todo.complete
        };

        dispatch(updateTodo(updatedTodo));
        node.value = '';

        dispatch(showTodoList());
        dispatch(fetchTodos());
    }

    , handleCloseForm: function(e) {
        e.preventDefault();

        const { dispatch } = this.props;
        dispatch(showTodoList());
        // Prevent any old values from displaying again.
        dispatch(clearEditForm());
    }

    , render: function() {

        const { todo, showEditForm } = this.props;

        if (!showEditForm) {
            return null;
        } else {
            return <form className="form">
                <div className="form-group">
                    <input
                        type="text"
                        name="todo"
                        className="form-control"
                        ref="todo"
                        onChange={this.handleChange}
                        value={todo.todo} />
                </div>

                <div className="btn-toolbar">
                    <button className="btn btn-primary"
                        onClick={this.handleSave}>
                        Save
                    </button>

                    <button className="btn btn-primary"
                        onClick={this.handleCloseForm}>
                        Cancel
                    </button>
                </div>
            </form>;
        }
    }
});

function mapStateToProps(state) {
    const { showEditForm } = state.todos;
    const { todo } = state.todo;

    return {
        todo: todo
        , showEditForm: showEditForm
    };
}

export default connect(mapStateToProps)(TodoEditForm);
