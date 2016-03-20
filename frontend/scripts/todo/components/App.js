import React from 'react';
import TodoListContainer from '../containers/TodoListContainer';
import TodoCreateForm from '../containers/TodoCreateForm';
import TodoEditForm from '../containers/TodoEditForm';

var App = React.createClass({
    render: function() {
        return <div>
            <TodoCreateForm />
            <TodoEditForm />
            <TodoListContainer />
        </div>;
    }
});

export default App;
