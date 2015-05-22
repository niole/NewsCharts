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
      var countryDict = {};

      countryArray.forEach( function(country) {
          if ( country.slice(0,3) in countryDict ) {
            countryDict[ country.slice(0,3) ].push( country );

          } else {
            countryDict[ country.slice(0,3) ] = [ country ];

          }
      });

      return { "countryDict": countryDict };
    },
    render: function() {

      return (

        <div>
          <Charts countryDict={this.state.countryDict} />
        </div>

      );
    }
});

React.render(<CountryTextProcessor />, $('#container')[0]);

module.exports = CountryTextProcessor;
