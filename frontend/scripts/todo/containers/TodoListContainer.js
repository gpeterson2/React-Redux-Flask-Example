import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import {
    fetchTodos
    , updateTodo
    , updateFilter
} from '../actions/todo';
import TodoList from '../components/TodoList';
import SpinnerDisplay from '../components/SpinnerDisplay';

// Query and display the todo list.
var TodoListContainer = React.createClass({

    // Called when the component is displayed, performs the inital query.
    componentDidMount: function() {
        const { dispatch } = this.props;
        return dispatch(fetchTodos());
    }

    // Updates the complete value when you click the button. For the most part
    // overkill, this is just an example of how you might do that.
    , handleCompleteClick: function(todo) {
        const { dispatch } = this.props;

        todo.complete = !todo.complete;
        dispatch(updateTodo(todo));
        dispatch(fetchTodos());
    }

    , handleShowEditClick: function(todo) {
        browserHistory.push(`/edit/${todo.todo_id}`);
    }

    , handleFilterClick: function(filter) {
        const { dispatch } = this.props;
        dispatch(updateFilter(filter));
    }

    , render: function() {
        const { showSpinner } = this.props;

        let display = null;
        if (showSpinner) {
            display = <SpinnerDisplay />;
        } else {
            display = <div>
                <TodoList
                    onCompleteClick={this.handleCompleteClick }
                    onShowEditClick={this.handleShowEditClick }
                    onFilterClick={this.handleFilterClick }
                    {...this.props} />
            </div>;
        }

        return <div>
            <div className="row">
                <Link className="btn btn-default" to="/add" >Add Todo</Link>
            </div>
            <div className="row">
                {display}
            </div>
        </div>;
    }
});

function mapStateToProps(state) {
    const { todos, showSpinner, filter } = state.todos;

    // Handle the filtering here before display. This way the overall
    // todo list is left unchanged and will not have to be re-queried.
    // The same could also be accomplished before rendering.
    let filteredTodos;

    switch (filter) {
        case 'COMPLETE':
            filteredTodos = todos.filter(t => t.complete === 1);
            break;
        case 'INCOMPLETE':
            filteredTodos = todos.filter(t => t.complete === 0);
            break;
        default:
            filteredTodos = todos;
    }

    return {
        todos: filteredTodos
        , filter: filter
        , showSpinner: showSpinner
    };
}

export default connect(mapStateToProps)(TodoListContainer);
