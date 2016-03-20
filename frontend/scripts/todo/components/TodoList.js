import React from 'react';
import TodoListItem from './TodoListItem';

var TodoList = React.createClass({

    handleFilterClick: function(filter) {
        return e => {
            e.preventDefault();

            this.props.onFilterClick(filter);
        };
    }

    , render: function() {

        const { filter } = this.props;

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
