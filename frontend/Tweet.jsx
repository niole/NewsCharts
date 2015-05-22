/** @jsx React.DOM */
"use strict";

//+ (tweet.active ? ' active' : '')}>

var React = require('react');

module.exports = Tweet;

var Tweet = React.createClass({
  propTypes: {
    tweet: React.PropTypes.object
  },
  render: function(){
    var tweet = this.props.tweet;
    return (
      <div>
        <li className="tweet">
          <img src={tweet.avatar} className="avatar"/>
          <blockquote className="twitter-tweet" data-link-color="#55acee" lang="es">
            <cite>
              <a href={"http://www.twitter.com/" + tweet.screenname}>{tweet.author}</a>
              <span className="screen-name">{tweet.screenname}</span>
            </cite>
            <span className="content" lang="en">{tweet.text}</span>
          </blockquote>
        </li>
      </div>
    );
  }
});


/*<blockquote class="twitter-tweet"
  data-link-color="#55acee" lang="es">
<p lang="en">just setting up my twttr</p>
— Jack Dorsey (@jack)
<a href="https://twitter.com/jack/status/20">
  marzo 21, 2006
</a>
</blockquote>*/
