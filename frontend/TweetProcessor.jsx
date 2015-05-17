"use strict";
/*global React*/

var React = require('react');

var TweetProcessor = React.createClass({
  propTypes: {
    tweetWordsArray: React.PropTypes.array
  },
  getInitialState: function() {
    return ( { "tweets": [] } );
  },
  componentDidMount: function() {

    $.ajax({
             url: "/stream/gettweets/BBCNews",
             type: 'POST',
             dataType: 'json',
             success: function(data) {

               console.log('succesful POSt in TweetProcessor');

               this.setState( {"tweets": data} );

               }.bind(this),

             error: function(xhr,status,err) {

              console.error(this.props.url,status.err.toString());

             }.bind(this)
           });
  },
  render: function() {
    this.state.tweets.forEach( function( tweet ) {

      var tweetArray = tweet.split(" ");

      tweetArray.forEach( function( twit ) {

        if ( twit.slice(0,1) in "ABCDEFGHIJKLMNOPQRSTUVWXYZ" ) {

          this.props.tweetWordsArray.push( twit );
        }
      });
    });
    return;
  }
});

module.exports = TweetProcessor;
