"use strict";
/*global React*/

var React = require('react');
var Charts = require('./Charts.jsx');
var CountryList = require('./CountryList.jsx');

var CountryTextProcessor = React.createClass({
    propTypes: {
      countryDict: React.PropTypes.object
    },
    getInitialState: function() {

      var countryArray = CountryList.split(".");

      return { "countryArray": countryArray, "getTweets": "" };

    },
    render: function() {

      return (

        <div>
          <Charts countryArray={this.state.countryArray} />
        </div>

      );
    }
});

React.render(<CountryTextProcessor />, $('#container')[0]);

module.exports = CountryTextProcessor;
