import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
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

    , handleCloseForm: function(e) {
        e.preventDefault();

        browserHistory.push('/');
    }

    , render: function() {

        return <form className="form">
            <div className="form-group">
                <input
                    type="text"
                    name="todo"
                    className="form-control"
                    ref="todo" />
            </div>

            <div className="btn-toolbar">
                <button className="btn btn-primary"
                    onClick={this.handleSubmitClick}>
                    Save
                </button>
                <button className="btn btn-primary"
                    onClick={this.handleCloseForm}>
                    Cancel
                </button>
            </div>
        </form>;
    }
});

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(TodoCreateForm);
