'use strict';

var React = require('react');
var LegendChart = require('./LegendChart.jsx');
var BasicChart = require('./BasicChart.jsx');

module.exports = React.createClass({

  displayName: 'Chart',

  propTypes: {
    legend: React.PropTypes.bool,
    viewBox: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      legend: false
    };
  },

  render: function() {
    if (this.props.legend) {
      return React.createElement(LegendChart, React.__spread({},  this.props));
    }
    return React.createElement(BasicChart, React.__spread({},  this.props));
  }

});
