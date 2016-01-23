var server = require('server').hapi
var config = require('config')

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
          Deck.members.get({event: config.event.current}, reply)
        }, assign: 'members' },
        { method: function getCompanies (request, reply) {
          var Deck = request.server.methods.deck
          Deck.companies.get({event: config.event.current}, reply)
        }, assign: 'companies' },
        { method: 'deck.speakers.getFeedback()', assign: 'speakers' }
      ]
    ],
    handler: function (request, reply) {
      var moonboots = request.pre.moonboots
      var speakers = request.pre.speakers
      var companies = request.pre.companies
      var members = request.pre.members

      reply.view('home', {
        speakers: speakers,
        companies: companies,
        members: members,
        cssFileName: '/' + moonboots.result.css.fileName
      })
    }
  }
})
