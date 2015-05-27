"use strict";
/*global React*/

var React = require('react');
var PieChart = require('./PieChart/PieChart.jsx');
var TweetContainer = require('./TweetContainer.jsx');

var ChartBuilder = React.createClass({

   propTypes: {
     countryDict: React.PropTypes.object,
     site: React.PropTypes.string,
     displayName: React.PropTypes.string
   },
   getInitialState: function() {
     return ( { "indexTopTweet": 0,
             "indexLastTweet": 1,
             "wordsToExamine": [],
             "countrysTweets": [],
             "tweets": [],
             "displayName": this.props.displayName } );
   },
   componentDidMount: function() {
    /* Takes site prop, gets site's tweets, and sets this.state.tweets and this.state.wordsToExamine*/

     $.ajax({
       url: "/stream/gettweets/" + this.props.site,
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

         this.setState( { "tweets": data, "wordsToExamine": tweetWordsArray } );

       }.bind(this),
       error: function(xhr,status,err) {
         console.error(this.props.url,status.err.toString());
       }.bind(this)
     });

   },
   render: function() {
    /* Filters through wordsToExamine, creates histogram of number of mentions per country, and creates data for the pie chart*/

     var countryHistDict = {};
     var totalMentions = 0;
     var pieData = [];

     this.state.wordsToExamine.forEach( function(tweet) {

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

         pieData.push ( { "label": country, "value": ( ( countryHistDict[ country ] / totalMentions ) * 100 ).toFixed(1) } );

       }
     }

     var tweetContainer = [];
     if ( this.state.countrysTweets.length > 0 ) {
      tweetContainer.push( <div className="box-holder">
                           <TweetContainer indexLastTweet={this.state.indexLastTweet} index={this.state.indexTopTweet} tweets={this.state.countrysTweets} />
                           </div>);
      }

     return (
       <div className='charts-div'>

              {tweetContainer}

             <div className="charts">

               <PieChart displayName={this.state.displayName} getCountrysTweets={this.getCountrysTweets} data={pieData} width={700} height={700}
               radius={250} innerRadius={20} title={this.state.displayName}/>

             </div>

       </div>
     );
   },
   getCountrysTweets: function( country ) {

     console.log('INSIDE GETCOUNTRYSTWEETS');

     var countrystweet = [];
     this.state.tweets.forEach( function ( tweet) {
       if ( tweet.text.indexOf( country ) > -1 ) {
        countrystweet.push( tweet );
       }
     });
     console.log(' IN GETCOUNTRYSTWEETS countrystweet: '+countrystweet);
     this.setState( { "indexLastTweet": 1,
                      "indexTopTweet": 0,
                      "countrysTweets": countrystweet });
  }
});

module.exports = ChartBuilder;
