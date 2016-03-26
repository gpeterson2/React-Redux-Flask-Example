import React from 'react';
import { connect } from 'react-redux';
import { submitTodo } from '../actions/todo';

/* A form to create a new todo item to be placed above the list. */
var TodoCreateForm = React.createClass({

    handleSubmitClick: function(e) {
        e.preventDefault();

        // This could be simplifed if the todo item were being assigned
        // to the input value, then clearint it would also clear this
        // instead of setting the value to an empty string.
        const node = this.refs.todo;
        const text = node.value.trim();

        const { dispatch } = this.props;

        dispatch(submitTodo(text));

        node.value = '';
    }

    , render: function() {
        const { showCreateForm } = this.props;

        // This will "hide" this form when the "edit" form is displayed.
        // The same could be accomplished with a routing library, and if
        // the actual form was more complicated having this as a separate
        // "page" would probabl be a better way to go.
        if (!showCreateForm) {
            return null;
        } else {
            return <form className="form">
                <div className="form-group">
                    <input
                        type="text"
                        name="todo"
                        className="form-control"
                        ref="todo" />
                </div>

                <button className="btn btn-primary"
                    onClick={this.handleSubmitClick}>
                    Save
                </button>
            </form>;
        }
    }
});

function mapStateToProps(state) {
    const { showCreateForm } = state.todos;

    return {
        showCreateForm: showCreateForm
    };
}

export default connect(mapStateToProps)(TodoCreateForm);
