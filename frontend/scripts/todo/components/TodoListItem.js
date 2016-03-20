import React from 'react';

var TodoListItem = React.createClass({

    onShowEditClick(e) {
        e.preventDefault();

        const { todo } = this.props;

        this.props.onShowEditClick(todo);
    }

    , onCompleteClick(e) {
        e.preventDefault();

        const { todo } = this.props;

        this.props.onCompleteClick(todo);
    }

    , render: function() {
        const { todo } = this.props;

        const icon = 'glyphicon ' + (todo.complete ? 'glyphicon-ok' : 'glyphicon-remove');

        return <tr>
            <td>
                 <span className={icon} aria-hidden="true"></span>
            </td>
            <td>{todo.todo}</td>
            <td>
                <a onClick={this.onShowEditClick}>Edit</a>
            </td>
            <td>
                <a onClick={this.onCompleteClick}>
                    Mark as "{todo.complete ? 'Not Done' : 'Done'}"
                </a>
            </td>
        </tr>;
    }
});

export default TodoListItem;
