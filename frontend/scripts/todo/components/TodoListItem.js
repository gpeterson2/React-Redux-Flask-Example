import React from 'react';

// A single todo item.
var TodoListItem = React.createClass({

    // Opens the edit "page".
    onShowEditClick(e) {
        e.preventDefault();

        const { todo } = this.props;

        this.props.onShowEditClick(todo);
    }

    // Marks the item as complete.
    , onCompleteClick(e) {
        e.preventDefault();

        const { todo } = this.props;

        this.props.onCompleteClick(todo);
    }

    , render: function() {
        const { todo } = this.props;

        // Again the "classnames" library would simplify this, but I didn't
        // want to include too many dependencies.
        const icon = 'glyphicon ' + (todo.complete ? 'glyphicon-ok' : 'glyphicon-remove');

        // You may just as well click on the icon and do it, but that didn't
        // feel intuitive for some reason. So I created the separate button.
        // The copy for it could use some work, though.
        return <tr>
            <td>
                 <span className={icon} aria-hidden="true"></span>
            </td>
            <td>{todo.todo}</td>
            <td>
                <a className="btn btn-default" onClick={this.onShowEditClick}>Edit</a>
            </td>
            <td>
                <a className="btn btn-default" onClick={this.onCompleteClick}>
                    Mark as "{todo.complete ? 'Not Done' : 'Done'}"
                </a>
            </td>
        </tr>;
    }
});

export default TodoListItem;
