"use strict";

var React = require('react');
var TweetCollection = require('./TweetCollection.jsx');

var TweetContainer = React.createClass({
  propTypes: {
    tweets: React.PropTypes.array,
    index: React.PropTypes.number,
    showContainer: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
    showContainer: "none"
    };
  },
  getInitialState: function() {
    return ( { "indexTopTweet": this.props.index } );
  },
  render: function() {
    return (
      <div className="tweet-container">
        <nav>
          <div className="nav-wrapper" onClick={this.scrollUp}/>
        </nav>
          <TweetCollection indexTopTweet={this.state.indexTopTweet} tweets={this.props.tweets}/>
        <nav>
          <div className="nav-wrapper" onClick={this.scrollDown}/>
        </nav>
      </div>


    );
  },
  scrollUp: function(e) {
    e.preventDefault();
    if ( this.state.indexTopTweet > 0 ) {
      this.setState( { "indexTopTweet": this.state.indexTopTweet - 1 } );
    }
  },
  scrollDown: function(e) {
    e.preventDefault();
//    if ( this.state.indexTopTweet < this.state.tweets.length - 1 ) {
    this.setState( { "indexTopTweet": this.state.indexTopTweet + 1 } );
 //   }
  }
});

module.exports = TweetContainer;
