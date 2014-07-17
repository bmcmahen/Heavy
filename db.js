var mongojs = require('mongojs');
var db = mongojs('heavy', ['users', 'weights']);

module.exports = db;