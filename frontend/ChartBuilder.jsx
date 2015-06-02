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
     console.log('GIS');
     /* listens for an event that is the name of the twitter handle visualized here and adds unique tweets to tweetObjectArray*/
   var socket = io.connect();

    socket.on(this.props.site, function( object ) {

      var candidate = true;

        if ( this.state.tweetObjectArray !== undefined ) {
          this.state.tweetObjectArray.forEach( function( TO ) {

            if ( TO.tweet.id === object.tweet.id ) {

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
     console.log('GDM');
     /* fires getTweetObjects every interval (in milliseconds) */

      setInterval( this.getTweetObjects , 5000);


    },
   render: function() {
     console.log('RENDER');
    /* creates histogram of number of mentions per country, creates data for the pie chart based on tweetObjectArray, also visualizes tweets*/

     var countryHistDict = {};
     var totalMentions = 0;
     var pieData = [];

      if ( document.getElementById( this.props.site ) === null ) {
        $('#loader').append(
          <div className="progress">
             <div className="indeterminate"></div>
         </div> );
      }

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
       <div id="loader" className='charts-div'>

              {tweetContainer}

             <div className="charts">

               <PieChart id={this.props.site} displayName={this.props.site} getCountrysTweets={this.getCountrysTweets} data={pieData} width={700} height={700}
               radius={250} innerRadius={20} title={this.state.displayName}/>

             </div>


       </div>
     );
   },
   updateTweetState: function( object ) {
     console.log('UTS');
     /* maintains an array of objects containing tweets tweeted within a 24 hr period*/

    var date = object.tweet.created_at;
    var month = date[1];
    var day = date[2];
    var year = date[5];

    if ( this.state.tweetObjectArray.length > 0 ) {
      var dateTO = this.state.tweetObjectArray[0].tweet.created_at;
      var monthTO = dateTO[1];
      var dayTO = dateTO[2];
      var yearTO = dateTO[5];

      if ( monthTO === month && dayTO === day - 1 && year === yearTO ) {

        var poppedTOA = this.state.tweetObjectArray.slice(1, this.state.tweetObjectArray.length);

        this.setState( { "tweetObjectArray": poppedTOA.concat( [ object ] ) } );
      }
    this.setState( { "tweetObjectArray": this.state.tweetObjectArray.concat( [ object ] ) } );

    }

    this.setState( { "tweetObjectArray": this.state.tweetObjectArray.concat( [ object ] ) } );
   },
   getTweetObjects: function() {
     console.log('GTO');
     /* sends GET request to twitter REST api via a socket emit*/

      if ( this.state.tweetObjectArray.length === 0 ) {

        socket.emit('SiteCA', [ {"countryArray": this.props.countryArray }, {"screen_name": this.props.site, "count": 200 } ] );
      } else {

        socket.emit('SiteCA', [ {"countryArray": this.props.countryArray }, {"screen_name": this.props.site, "count": 20 } ] );

      }

   },
   getCountrysTweets: function( country ) {
     /* waits for the name of country and then updates countrysTweets state in order to display tweets mentioning that country*/

     var countrystweet = [];
     this.state.tweetObjectArray.forEach( function ( object ) {
       if ( object.tweet.text.indexOf( country ) > -1 ) {
         countrystweet.push( object.tweet );
       }
     });
     this.setState( { "indexLastTweet": 1,
                      "indexTopTweet": 0,
                      "countrysTweets": countrystweet });
  }
});


module.exports = ChartBuilder;
