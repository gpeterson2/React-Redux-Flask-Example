import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import {
    changePage
    , fetchTodos
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

    , componentWillReceiveProps: function(nextProps) {
        const { dispatch, page } = this.props;
        let newPage = nextProps.params.page;

        if (!page || !newPage) {
            return;
        }

        newPage = Number(newPage);

        if (page !== newPage) {
            dispatch(changePage(newPage));
        }
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

        // TODO - could use react-router-redux to do this.
        browserHistory.push('/page/1');
        dispatch(changePage(1));
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
    const {
        todos
        , visibleTodos
        , showSpinner
        , filter
        , page
        , size
        , pageCount
    } = state.todos;

    return {
        todos: todos
        , visibleTodos: visibleTodos
        , page: Number(page)
        , pageCount: pageCount
        , size: size
        , filter: filter
        , showSpinner: showSpinner
    };
}

export default connect(mapStateToProps)(TodoListContainer);
