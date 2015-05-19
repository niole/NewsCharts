"use strict";
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'NewsCharts' });
});

router.get('/settings', function(req, res) {
  res.render('settings', { title: 'Settings' });
});

module.exports = router;
