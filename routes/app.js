var express = require('express');
var app = express.Router();
var db = require('../db');

var requireUser = require('./require_user');

app.get('/', function(req, res, next){
  return res.render('index');
});

app.get('/app', requireUser(true), function(req, res, next){
  return res.render('app');
});

module.exports = app;