import React from 'react';
import TodoListItem from './TodoListItem';

// The main todo list display.
var TodoList = React.createClass({

    // Helper so as not to repeat the button code three times.
    // There may very well be a better way of doing this.
    handleFilterClick: function(filter) {
        return e => {
            e.preventDefault();

            this.props.onFilterClick(filter);
        };
    }

    , render: function() {

        const { filter } = this.props;

        // Helper to set the css. Using the "classnames" library would
        // simplify this, but it was not used to limit how many dependencies
        // this example would have.
        function getFilterCss(filter, value) {
            return 'btn btn-' + (filter === value ? 'primary' : 'default');
        }

        const allCss = getFilterCss(filter, 'ALL');
        const completeCss = getFilterCss(filter, 'COMPLETE');
        const incompleteCss = getFilterCss(filter, 'INCOMPLETE');

        return <div>
            <br />
            <div className="btn-group">
                <button className={allCss}
                    onClick={this.handleFilterClick('ALL')}>
                    All
                </button>
                <button className={completeCss}
                    onClick={this.handleFilterClick('COMPLETE')}>
                    Complete
                </button>
                <button className={incompleteCss}
                    onClick={this.handleFilterClick('INCOMPLETE')}>
                    Incomplete
                </button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Todo</th>
                        <th>Edit</th>
                        <th>Complete</th>
                    </tr>
                </thead>

                <tbody>
                    {this.props.todos.map((todo, i) => {
                        return <TodoListItem
                            key={i}
                            todo={todo}
                            {...this.props}
                        />;
                    })}
                </tbody>
            </table>
        </div>;
    }
});

export default TodoList;
