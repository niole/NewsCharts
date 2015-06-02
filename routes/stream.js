"use strict";
var express = require('express');
var dotenv = require('dotenv');
var router = express.Router();
var Twitter = require('twitter');
var _ = require('lodash');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});


/* get past 20 tweets from this news service */
router.post('/gettweets/:SN', function(req, res) {
  var SN = req.params.SN;

  console.log('Twitter client GET with sn=' + SN);

  client.get("statuses/user_timeline", { screen_name: SN, count: 20 }, function(error, tweets, response){

    if (!error) {

      res.json( tweets );

    console.log('error');
    console.log(error);
    }

 });

});

module.exports = router;
