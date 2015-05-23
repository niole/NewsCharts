/** @jsx React.DOM */
"use strict";

//var React = require('react');
var React = require('react/addons');
//var classSet = addons.classSet;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


var Tweet = React.createClass({
  propTypes: {
    tweet: React.PropTypes.object,
  },
  render: function(){
    var tweet = this.props.tweet;

    return (
      <div>
        <li className="tweet">
          <img src={tweet.user.profile_image_url} className="avatar"/>
          <blockquote className="twitter-tweet" data-link-color="#55acee" lang="es">
            <cite>
              <a href={"http://www.twitter.com/" + tweet.user.screen_name}>{tweet.user.name}</a>
              <span className="screen-name">{" " + tweet.user.screen_name}</span>
            </cite>
            <span className="content" lang="en">{" " + tweet.text}</span>
          </blockquote>
        </li>
     </div>
   );
 }
});


var TweetCollection = React.createClass({
  propTypes: {
    tweets: React.PropTypes.array,
  },
  getInitialState: function() {
    console.log('GETINITSTATE TWEETCOLLECTION');
    return  ( { "indexTopTweet": 0 } );
  },
  // Render our tweets
  render: function() {
    console.log('RENDER TWEETCOLLECTIONS');

    // Build list items of single tweet components using map
      var content = [];

      for ( var i = this.state.indexTopTweet; i < this.state.indexTopTweet + 5 && i < this.props.tweets.length; i++ ) {

          content.push(
            React.createElement( Tweet, {
              key: this.props.tweets[i].id,
              tweet: this.props.tweets[i],
              })
          );
      }
    // Return ul filled with our mapped tweets
    return (
      React.createElement( ReactCSSTransitionGroup, {
        transitionName:"example",
        transitionAppear: "true"
        },
        React.createElement( "ul", {
          className: "tweets"
        },
        content
        )
      )
    );
  }
});

module.exports = TweetCollection;

