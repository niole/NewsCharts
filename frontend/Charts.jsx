"use strict";
/*global React*/

var React = require('react');
//var PieChart = require('./PieChart/PieChart.jsx');
var ChartBuilder = require('./ChartBuilder.jsx');
//var TweetContainer = require('./TweetContainer.jsx');

var Charts = React.createClass({

  propTypes: {
    countryDict: React.PropTypes.object,
  },

  getInitialState: function() {
    return ( { "newsSites": [], "displayName": "" } );
  },

/* Maps over array of site names in newsSites and generates piecharts and their associated twitter feeds through ChartBuilder */
  render: function() {

    var ChartsAndTweets = this.state.newsSites.map( function(site) {
      return (
        <div className="single-chart">
          <ChartBuilder displayName={this.state.displayName} site={site} countryDict={this.props.countryDict} />
        </div>
      );
    }.bind(this) );

    return (
      <div className="pies-tweets-page">

        <input type="text" placeholder="input a SN" ref="snfield"/>

        <a className="waves-effect waves-light btn" onClick={this.getNews} ><i className="mdi-file-cloud right"></i>Submit</a>

        <div className="pie-charts">
          {ChartsAndTweets}
        </div>
      </div>
    );
  },
  getNews: function(e){
    e.preventDefault();
    var SN = this.refs.snfield.getDOMNode().value.trim();

    this.setState( { "displayName": SN, "newsSites": this.state.newsSites.concat( [ SN ] ) } );
  }
});

module.exports = Charts;
