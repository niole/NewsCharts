"use strict";

var React = require('react');
var TweetCollection = require('./TweetCollection.jsx');

var TweetContainer = React.createClass({
  propTypes: {
    tweets: React.PropTypes.array,
    index: React.PropTypes.number,
    showContainer: React.PropTypes.string,
    indexLastTweet: React.PropTypes.number
  },
  getInitialState: function() {
    return ( { "indexLastTweet": this.props.indexLastTweet,
                "indexTopTweet": this.props.index } );
  },
  render: function() {

    console.log('this.props.tweets.length: '+this.props.tweets.length);
    console.log('indexLast: '+this.state.indexLastTweet);
    console.log('indextop: '+this.state.indexTopTweet);

    if ( this.props.tweets.length > 0 ) {
      return (
        <div className="tweet-container">
          <nav>
            <div className="nav-wrapper" onClick={this.scrollUp}/>
          </nav>
            <TweetCollection indexLastTweet={this.state.indexLastTweet}
              indexTopTweet={this.state.indexTopTweet} tweets={this.props.tweets}/>
          <nav>
            <div className="nav-wrapper" onClick={this.scrollDown}/>
          </nav>
        </div>


      );
    } else {
      return ( <div/> );
    }
  },
  scrollUp: function(e) {
    e.preventDefault();
    if ( this.state.indexTopTweet > 0 && this.state.indexLastTweet > 4) {
      this.setState( { "indexTopTweet": this.state.indexTopTweet - 1,
                        "indexLastTweet": this.state.indexLastTweet - 1 } );
    }
  },
  scrollDown: function(e) {
    e.preventDefault();
    if ( Math.abs(this.state.indexTopTweet - this.state.indexLastTweet) < 4 ) {
      this.setState( { "indexLastTweet": this.state.indexLastTweet + 1 } );
    }
    if ( Math.abs(this.state.indexTopTweet - this.state.indexLastTweet) === 4 &&
          this.state.indexLastTweet < this.props.tweets.length - 1 ) {
        this.setState( { "indexLastTweet": this.state.indexLastTweet + 1,
                          "indexTopTweet": this.state.indexTopTweet + 1 } );
    }

  }
});

module.exports = TweetContainer;
