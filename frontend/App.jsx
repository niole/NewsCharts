"use strict";
/*global React*/

var React = require('react');
var PieChart = require('react-d3/piechart').PieChart;
var Treemap = require('react-d3/treemap').Treemap;
//var CountryTextProcessor = require('./countries.jsx');
//var TweetProcessor = require('./TweetProcessor.jsx');

// CSS via webpack
//require('normalize.css');
//require('../styles/main.css');


var Charts = React.createClass({
 propTypes: {

  countryDict: React.PropTypes.object,

  },
  getInitialState: function() {
    console.log('GETINITIALSTATE APP');
    console.log('this.props.countryDict');
    console.log(this.props.countryDict);

    /* STATE:
     *
     * tweets -> tweetWordsArray or an array of proper nouns found in the tweets pulled from Twitter
     * countryDict -> a dictionary of countries with keys unique 3-letter prefixes and values as an array of
     * countries with that prefix */

    return ( { "tweets": [], "countryDict": {} } );
  },
  componentDidMount: function() {

    console.log('COMPONENTDIDMOUNT APP');
    console.log('this.props.countryDict');
    console.log(this.props.countryDict);


    $.ajax({
      url: "/stream/gettweets/BBCWorld",
      type: 'POST',
      dataType: 'json',
      success: function(data) {

        console.log('succesful POSt in TweetProcessor');

        var tweetWordsArray = [];
        data.forEach( function( tweet ) {
//          console.log("tweet");
//          console.log(tweet);

          var tweetArray = tweet.split(" ");
          tweetArray.forEach( function( twit ) {
//            console.log('twit');
//            console.log(twit);

//             if ( isNaN( twit.slice(0,1) ) && twit.slice(0,1) !== "@" &&
//                 twit.slice(0,1) !== '"' && twit.slice(0,1) !== "#" &&
//                  twit.slice(0,1) !== "-" && twit.slice(0,1) !== "(" &&
//                   twit.slice(0,1) === twit.slice(0,1).toUpperCase() ) {
                tweetWordsArray.push( twit );

           //    }
           });
        });
        console.log('tweetWordsArray (only capitalized words)');
        console.log(tweetWordsArray);

      this.setState( { "tweets": tweetWordsArray, "countryDict": this.props.countryDict } );
      }.bind(this),

    error: function(xhr,status,err) {

     console.error(this.props.url,status.err.toString());

      }.bind(this)
    });

  },
  // render the line chart and radial heatmap
  render: function() {

    console.log('RENDER APP');
    console.log('this.props.countryDict');
    console.log(this.props.countryDict);

    var countryHistDict = {};

    var treemapData = [];
    //  {label: "China", value: 1364},

    var pieData = [];
//      {label: 'Margarita', value: 20.0},

    this.state.tweets.forEach( function(tweet) {

      console.log('inside RENDER APP forEach');
      console.log('this.props.countryDict');
      console.log(this.props.countryDict);
      console.log('countryHistDict');
      console.log(countryHistDict);

      /* If the first three letters of the capitalized word are a key in
       * the dictionary of countries*/
      if ( tweet.length > 2 && tweet.slice(0,3) in this.props.countryDict ) {

        this.props.countryDict[ tweet.slice(0,3) ].forEach( function( country ) {

          /* Check to see if a country in the countryDict is in the tweet. */
          if ( tweet.indexOf(country) > -1 ) {
            if ( country in countryHistDict ) {
              countryHistDict[ country ] += 1;

              } else {
                countryHistDict[ country ] = 1;

              }
          }
        }.bind(this));
      }
    }.bind(this));

    for ( var country in countryHistDict ) {
      if ( countryHistDict.hasOwnProperty( country ) ) {
        treemapData.push ( { "label": country, "value": countryHistDict.country } );
        pieData.push ( { "label": country, "value": countryHistDict.country } );
      }
    }


    return (
      <div className='main'>
        <input type="text" placeholder="enter a screenname" ref="inputbox"/>

        <a onClick={this.getTweets} className="waves-effect waves-light btn"><i className="mdi-file-cloud left"></i>button</a>

        <PieChart data={pieData} width={400} height={400}
          radius={100} innerRadius={20} title="Pie Chart"/>

        <Treemap  data={treemapData} width={450} height={250} textColor="#484848"
          fontSize="10px" title="Treemap"/>
      </div>
    );
  },
  getTweets: function(e) {
    e.preventDefault();
    var SN = this.refs.inputbox.getDOMNode().value;
    $.ajax({
      url: "/stream/gettweets/"+SN,
      type: 'POST',
      dataType: 'json',
      success: function(data) {

        this.setState( {"tweets": data} );

        }.bind(this),

      error: function(xhr,status,err) {

       console.error(this.props.url,status.err.toString());

      }.bind(this)
   });

  }
});

module.exports = Charts;

//var App = React.render( <LinkedHighlightingApp/>, $('#container')[0]);

//module.exports = App;
