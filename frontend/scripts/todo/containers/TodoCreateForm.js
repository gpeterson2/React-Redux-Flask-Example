import React from 'react';
import { connect } from 'react-redux';
import { submitTodo } from '../actions/todo';

var TodoCreateForm = React.createClass({

    handleSubmitClick: function(e) {
        e.preventDefault();

        const node = this.refs.todo;
        const text = node.value.trim();

        const { dispatch } = this.props;

        dispatch(submitTodo(text));

        node.value = '';
    }

    , render: function() {
        const { showCreateForm } = this.props;

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
