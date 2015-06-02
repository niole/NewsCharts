"use strict";
/*global React*/

var React = require('react');
var PieChart = require('./PieChart/PieChart.jsx');
var TweetContainer = require('./TweetContainer.jsx');


var ChartBuilder = React.createClass({


   propTypes: {
     countryArray: React.PropTypes.array,
     site: React.PropTypes.string
   },
   getInitialState: function() {
   var socket = io.connect();


    socket.on("state", function( object ) {
      console.log('SOCKET STATE GIS');

      var candidate = true;
      if ( this.state.tweetObjectArray !== undefined ) {
        this.state.tweetObjectArray.forEach( function( TO ) {
          if ( TO.id === object.tweet.id ) {
            candidate = false;
          }
        });
        if ( candidate === true ) {
          this.updateTweetState( object );
        }
      }
      }.bind(this));

     return ( { "indexTopTweet": 0,
             "indexLastTweet": 1,
             "countrysTweets": [],
             "tweetObjectArray": [] });

   },
   componentDidMount: function() {
      console.log('COMPONENTDIDMOUNT CHARTBUILDER');

      setInterval( this.getTweetObjects , 5000);

    },
   render: function() {
    console.log('this.tweetObjectArray');
    console.log( this.state.tweetObjectArray );

    /* creates histogram of number of mentions per country, and creates data for the pie chart based on tweetObjectArray*/


     var countryHistDict = {};
     var totalMentions = 0;
     var pieData = [];


     this.state.tweetObjectArray.forEach( function( tweetObject ) {

      if ( countryHistDict.hasOwnProperty( tweetObject.country ) ) {

        countryHistDict[ tweetObject.country ] += 1;
        totalMentions += 1;

      } else {

        countryHistDict[ tweetObject.country ] = 1;
        totalMentions += 1;

      }
     });

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
   updateTweetState: function( object ) {
    console.log('UPDATETWEETSTATE');
    this.setState( { "tweetObjectArray": this.state.tweetObjectArray.concat( [ object ] ) } );
   },
   getTweetObjects: function() {
      console.log('GETTWEETOBJECTS');

      socket.emit('SiteCA', [ {"countryArray": this.props.countryArray }, {"screen_name": this.props.site, "count": 20 } ] );

   },
   getCountrysTweets: function( country ) {

     console.log('INSIDE GETCOUNTRYSTWEETS');

     var countrystweet = [];
     this.state.tweetObjectArray.forEach( function ( object ) {
       if ( object.tweet.text.indexOf( country ) > -1 ) {
        countrystweet.push( object.tweet );
       }
     });
     console.log(' IN GETCOUNTRYSTWEETS countrystweet: '+countrystweet);
     this.setState( { "indexLastTweet": 1,
                      "indexTopTweet": 0,
                      "countrysTweets": countrystweet });
  }
});


module.exports = ChartBuilder;
