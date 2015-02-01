var AmpCollection = require('ampersand-rest-collection');
var session = require('./session');
var config = require('clientconfig');
var log = require('bows')('sessions');

module.exports = AmpCollection.extend({
  model: session,
  url: client.baseURL + 'sessions'
});