import React from 'react';
import Spinner from 'spin';

// Use the "spin" component to indicate loading. There are a ton of display
// options, but this just uses the default.
var SpinnerDisplay = React.createClass({
    getInitialState: function() {
        var spinner = new Spinner();
        return {spinner: spinner};
    },

    componentDidMount: function() {
        // start spinner.

        var target = this.refs.spinner;
        this.state.spinner.spin(target);
    },

    componentWillUnmount: function() {
        // Clean up spinner.

        this.state.spinner.stop();
    },

    render: function() {
        return <div ref="spinner" id="spinner"></div>;
    }
});

export default SpinnerDisplay;
