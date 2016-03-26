import React from 'react';
import TodoListContainer from '../containers/TodoListContainer';
import TodoCreateForm from '../containers/TodoCreateForm';
import TodoEditForm from '../containers/TodoEditForm';

// Overall application component. Each component will be shown/hidden
// based on values set in the actions/reducers so all of them are included
// here.
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
