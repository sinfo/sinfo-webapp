var AmpCollection = require('ampersand-rest-collection')
var achievement = require('./achievement')
var config = require('client/js/helpers/clientconfig')
var log = require('bows')('achievements')

module.exports = AmpCollection.extend({
  model: achievement,
  url: config.cannonUrl + '/achievements'
})
