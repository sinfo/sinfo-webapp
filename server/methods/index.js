var Async = require('async')
var Boom = require('boom')
var request = require('request')
var config = require('config')
var httpHandler = require('server/helpers/httpHandler')
var server = require('server').hapi
var deckRequest = request.defaults({
  baseUrl: config.client.deckUrl + '/api',
  json: true
})

server.method('deck.speakers.get', getSpeakers, {})
server.method('deck.speakers.getFeedback', getSpeakersFeedback, {})
server.method('deck.companies.get', getCompanies, {})
server.method('deck.members.get', getMembers, {})

function getSpeakersFeedback (options, cb) {
  cb = cb || options
  if (typeof options === 'function') options = {}

  deckRequest({
    method: 'GET',
    uri: '/speakers',
    qs: {
      event: options.event
    }
  }, function (err, res, body) {
    httpHandler(err, res, body, function filterSpeakers (err, speakers) {
      if (err) return cb(err)
      var resultSpeakers = []

      Async.each(speakers, function iterator (speaker, cbIt) {
        if (speaker.feedback) resultSpeakers.push(speaker)
        cbIt()
      }, function done (err) {
        if (err) return cb(Boom.badImplementation())
        cb(null, resultSpeakers)
      })
    })
  })
}

function getSpeakers (options, cb) {
  cb = cb || options
  if (typeof options === 'function') options = {}

  deckRequest({
    method: 'GET',
    uri: '/speakers',
    qs: {
      event: options.event
    }
  }, function (err, res, body) { httpHandler(err, res, body, cb) })
}

function getCompanies (options, cb) {
  cb = cb || options
  if (typeof options === 'function') options = {}

  deckRequest({
    method: 'GET',
    uri: '/companies',
    qs: {
      event: options.event
    }
  }, function (err, res, body) { httpHandler(err, res, body, cb) })
}

function getMembers (options, cb) {
  cb = cb || options
  if (typeof options === 'function') options = {}

  deckRequest({
    method: 'GET',
    uri: '/members',
    qs: {
      event: options.event
    }
  }, function (err, res, body) { httpHandler(err, res, body, cb) })
}
