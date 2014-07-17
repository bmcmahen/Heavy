var express = require('express');
var weights = express.Router();
var mongo = require('mongojs');
var db = require('../db');

var requireUser = require('./require_user');

weights.all('/', requireUser());

/**
 * Get all the user's weights
 */

weights.get('/', function(req, res, next){
  var _id = mongo.ObjectId(req.user._id);
  db.weights
    .find({ user: _id })
    .sort({ date: 1})
    .toArray(function(err, docs){
      if (err) return next(err);
      return res.json(docs);
    });
});


/**
 * Add a new user weight
 */

weights.post('/', function(req, res, next){
  var body = req.body;
  body.user = mongo.ObjectId(req.user._id);

  db.weights.insert(body, function(err, doc){
    if (err) return next(err);
    return res.json(doc);
  });
});

weights.post('/following', function(req, res, next){
  // send array of following + weights
});

/**
 * Edit an existing weight
 */

weights.put('/:id', function(req, res, next){

});

/**
 * Delete an existing weight
 */

weights.delete('/:id', function(req, res, next){
  var _id = req.params.id;
  db.weights.remove({ _id : mongo.ObjectId(_id) }, function(err){
    if (err) return next(err);
    res.send(200);
  })
});

module.exports = weights;