var server = require('server').hapi
var config = require('config')
var options = require('options')
var dateParser = require('server/helpers/dateParser')
var _ = require('underscore')

server.route({
  method: 'GET',
  path: '/',
  config: {
    pre: [
      [
        { method: function getMoonbootsApp (request, reply) {
          request.server.plugins.moonboots_hapi.clientApp(reply)
        }, assign: 'moonboots' },
        { method: function getMembers (request, reply) {
          var Deck = request.server.methods.deck
          Deck.members.get({event: config.event.members}, reply)
        }, assign: 'members' },
        { method: function getCompanies (request, reply) {
          var Deck = request.server.methods.deck
          Deck.companies.get({event: config.event.current}, reply)
        }, assign: 'companies' },
        { method: function getSpeakers (request, reply) {
          var Deck = request.server.methods.deck
          Deck.speakers.get({event: config.event.current}, reply)
        }, assign: 'speakers' },
        { method: function getSessions (request, reply) {
          var Deck = request.server.methods.deck
          Deck.sessions.get({event: config.event.current}, reply)
        }, assign: 'sessions' },
        { method: function getEvents (request, reply) {
          var Deck = request.server.methods.deck
          Deck.events.get(function (err, events) {
            if (err) return reply(err)
            events.map(function (e) {
              var dates = dateParser(e.date, e.duration)
              _.extend(e, dates)
              return e
            })
            reply(null, events)
          })
        }, assign: 'events' }
      ]
    ],
    handler: function (request, reply) {
      var moonboots = request.pre.moonboots
      var speakers = request.pre.speakers
      var companies = request.pre.companies
      var members = request.pre.members
      var sessions = request.pre.sessions
      var events = request.pre.events

      reply.view('home', {
        options: options,
        speakers: speakers,
        companies: companies,
        members: members,
        sessions: sessions,
        events: events,
        cssFileName: '/' + moonboots.result.css.fileName,
        // WARNING don't load the script on the homepage, it will duplicate everything
        jsFileName: '/' + moonboots.result.js.fileName
      })
    }
  }
})

server.route({
  method: 'GET',
  path: '/coc',
  config: {
    pre: [
      { method: function getMoonbootsApp (request, reply) {
        request.server.plugins.moonboots_hapi.clientApp(reply)
      }, assign: 'moonboots' }
    ],
    handler: function (request, reply) {
      var moonboots = request.pre.moonboots

      reply.view('coc', { cssFileName: '/' + moonboots.result.css.fileName })
    }
  }
})

server.route({
  method: 'GET',
  path: '/privacy-policy',
  config: {
    pre: [
      { method: function getMoonbootsApp (request, reply) {
        request.server.plugins.moonboots_hapi.clientApp(reply)
      }, assign: 'moonboots' }
    ],
    handler: function (request, reply) {
      var moonboots = request.pre.moonboots

      reply.view('privacy-policy', { cssFileName: '/' + moonboots.result.css.fileName })
    }
  }
})
