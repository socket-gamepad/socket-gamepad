var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  var room = shortid.generate();
  var roomURL = config.base_url+"?vrgamepad="+room;
  res.render('index', {room: room, roomURL: roomURL});
});

module.exports = router;
