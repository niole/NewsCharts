"use strict";
/*global React*/

var React = require('react');
var PieChart = require('./PieChart/PieChart.jsx');
var Treemap = require('react-d3/treemap').Treemap;
var TweetContainer = require('./TweetContainer.jsx');

var Charts = React.createClass({

  propTypes: {
    countryDict: React.PropTypes.object,
  },

  getInitialState: function() {
    return ( { "showContainer": "none",
            "indexTopTweet": 0,
            "tweetWords": [],
            "countrysTweets": [],
            "tweets": [],
            "countryDict": {} } );
  },
  componentDidMount: function() {
    console.log('COMPONENETDIDMOUTN CHARTS');
    $.ajax({
      url: "/stream/gettweets/BBCWorld",
      type: 'POST',
      dataType: 'json',
      success: function(data) {
        var tweetWordsArray = [];
        data.forEach( function( tweet ) {

          var tweetArray = tweet.text.split(" ");

          tweetArray.forEach( function( twit ) {

            if ( /[A-Z]/.test( twit ) ) {
              tweetWordsArray.push( twit );
            }
          });
        });
        this.setState( { "tweets": data, "tweetWords": tweetWordsArray, "countryDict": this.props.countryDict } );
      }.bind(this),

      error: function(xhr,status,err) {
        console.error(this.props.url,status.err.toString());
      }.bind(this)
    });

  },
  // render the line chart and radial heatmap
  render: function() {

    var countryHistDict = {};
    var totalMentions = 0;
    var treemapData = [];
    var pieData = [];

    this.state.tweetWords.forEach( function(tweet) {

      /* DOESN'T NECESSARILLY MAKE SENSE. TODO */
      if ( tweet.length > 2 && tweet.slice(0,3) in this.props.countryDict ) {
        this.props.countryDict[ tweet.slice(0,3) ].forEach( function( country ) {
          if ( tweet.indexOf(country) > -1 ) {
            if ( country in countryHistDict ) {
              countryHistDict[ country ] += 1;
              totalMentions += 1;

            } else {
              countryHistDict[ country ] = 1;
              totalMentions += 1;
            }
          }
        }.bind(this));
      }
    }.bind(this));

    for ( var country in countryHistDict ) {
      if ( countryHistDict.hasOwnProperty( country ) ) {
        treemapData.push ( { "label": country, "value": ( ( countryHistDict[ country ] / totalMentions ) * 100 ).toFixed(1) } );
        pieData.push ( { "label": country, "value": ( ( countryHistDict[ country ] / totalMentions ) * 100 ).toFixed(1) } );
      }
    }

    return (
      <div className='charts-div'>

            <div className="box-holder">
              <TweetContainer index={this.state.indexTopTweet} tweets={this.state.countrysTweets} />
            </div>


            <div className="charts">

              <PieChart getCountrysTweets={this.getCountrysTweets} data={pieData} width={700} height={700}
              radius={250} innerRadius={20} title="Pie Chart"/>

              <Treemap  data={treemapData} width={600} height={500} textColor="#484848"
              fontSize="10px" title="Treemap"/>

            </div>

      </div>
    );
  },
  getCountrysTweets: function( country, block ) {

    var countrystweet = [];
    this.state.tweets.forEach( function ( tweet) {
      if ( tweet.text.indexOf( country ) > -1 ) {
        countrystweet.push( tweet );
      }
    });

    this.setState( { "showContainer": block, "indexTopTweet": 0, "countrysTweets": countrystweet } );
  }
});

module.exports = Charts;
