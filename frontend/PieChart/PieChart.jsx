'use strict';

var React = require('react');
var DataSeries = require('./DataSeries.jsx');
var Chart = require('./charts/Chart.jsx');


module.exports = React.createClass({
  getDefaultProps: function() {
     return {
       title: ''
     };
   },
  propTypes: {
    getCountrysTweets: React.PropTypes.func,
    radius: React.PropTypes.number,
    cx: React.PropTypes.number,
    cy: React.PropTypes.number,
    labelTextFill: React.PropTypes.string,
    valueTextFill: React.PropTypes.string,
    colors: React.PropTypes.func,
    title: React.PropTypes.string
  },

  render: function() {
    var props = this.props;
    var transform = ("translate(" + ( props.cx || props.width/2) + "," + ( props.cy || props.height/2) + ")");

    var data = props.data.map( function(item)  {return item.value;} );
    var labels = props.data.map( function(item)  {return item.label;} );

    return (
      React.createElement(Chart, {
        width: props.width,
        height: props.height,
        title: props.title
      },
        React.createElement("g", {className: "rd3-piechart"},
          React.createElement(DataSeries, {
            getCountrysTweets: props.getCountrysTweets,
            labelTextFill: props.labelTextFill,
            valueTextFill: props.valueTextFill,
            labels: labels,
            colors: props.colors,
            transform: transform,
            data: data,
            width: props.width,
            height: props.height,
            radius: props.radius,
            innerRadius: props.innerRadius}
          )
        )
      )
    );
  }

});
