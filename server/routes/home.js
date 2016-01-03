var server = require('server').hapi

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.view('home')
  }
})
