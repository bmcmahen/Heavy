var express = require('express');
var user = express.Router();
var db = require('../db');
var mongo = require('mongojs');

var requireUser = require('./require_user');

user.all('/', requireUser());

user.get('/', function(req, res, next){
  return res.json(req.user);
})

user.put('/', function(req, res, next){
  var _id = req.user._id;
  var body = req.body;

  db.users.findAndModify({
    query: { _id : mongo.ObjectId(_id) },
    update: { $set: body }
  }, function(err, doc){
    if (err) return res.send(404);
    res.json(doc);
  });

});

module.exports = user;