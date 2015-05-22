"use strict";

var React = require('react');
var TweetCollection = require('./TweetCollection.jsx');

var TweetContainer = React.createClass({
  propTypes: {
    tweets: React.PropTypes.array
  },
  render: function() {
    return (
      <div className="tweet-container">
        <nav>
          <div class="nav-wrapper"/>
        </nav>
        <TweetCollection tweets={this.props.tweets} />
        <nav>
          <div class="nav-wrapper"/>
        </nav>

      </div>
    );
  }

});

module.exports = TweetContainer;
