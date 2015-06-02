"use strict";
/*global React*/

var React = require('react');
var ChartBuilder = require('./ChartBuilder.jsx');

var Charts = React.createClass({

  propTypes: {
    countryArray: React.PropTypes.array,
  },

  getInitialState: function() {
    return ( { "newsSites": [] } );
  },

  render: function() {
    /* Maps over array of site names in newsSites and generates piecharts and their associated twitter feeds through ChartBuilder */

        var ChartsAndTweets = this.state.newsSites.map( function(site) {

            return (
              <div className="single-chart">
                <ChartBuilder site={site} countryArray={this.props.countryArray} />
              </div>
            );
        }.bind(this));


      return (
        <div className="pies-tweets-page">

          <input type="text" placeholder="input a SN" ref="snfield"/>
          <a className="waves-effect waves-light btn" onClick={this.getNews} ><i className="mdi-file-cloud right"></i>enter a news site's twitter handle</a>



          <div className="pie-charts">
            {ChartsAndTweets}
          </div>
        </div>
      );
  },
  getNews: function(e){
    e.preventDefault();
    var SN = this.refs.snfield.getDOMNode().value.trim();
    if ( SN[0] === "@" ) {
      console.log( SN.slice(1,SN.length));

      this.setState( { "newsSites": this.state.newsSites.concat( [ SN.slice( 1, SN.length) ] ) } );

    } else {
      this.setState( { "newsSites": this.state.newsSites.concat( [ SN ] ) } );
    }
  }
});

module.exports = Charts;
