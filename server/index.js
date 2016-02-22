var Hapi = require('hapi')
var config = require('config')
var path = require('path')
var server = module.exports.hapi = new Hapi.Server(config.http.listen, config.http.port, {
  debug: {
    request: ['error']
  }
})
var moonbootsConfig = require('moonbootsConfig')
var internals = {}

var CONFIG_COOKIE_NAME = 'cannon-config'

// set clientconfig cookie
internals.configStateConfig = {
  encoding: 'none',
  ttl: 1000 * 60 * 15,
  isSecure: config.isSecure
}

server.state(CONFIG_COOKIE_NAME, internals.configStateConfig)
internals.clientConfig = JSON.stringify(config.client)
server.ext('onPreResponse', function (request, reply) {
  if (request.state && !request.state.config) {
    var response = request.response
    if (!response.state) {
      return reply()
    }
    response.state(CONFIG_COOKIE_NAME, encodeURIComponent(internals.clientConfig))

    return reply(response)
  } else {
    return reply()
  }
})

// Set view template engine
server.views({
  engines: { jade: require('jade') },
  path: path.join(__dirname, 'templates')
})

var publicAssets = {
  method: 'GET',
  path: '/static/{path*}',
  config: {
    handler: {
      directory: {
        path: './public/',
        listing: true,
        index: true
      }
    }
  }
}

server.route(publicAssets)
require('./methods')
require('./routes')

// require moonboots_hapi plugin
server.pack.register(
  [{plugin: require('moonboots_hapi'), options: moonbootsConfig}],
  function (err) {
    if (err) throw err
    // If everything loaded correctly, start the server:
    server.start(function (err) {
      if (err) throw err
      console.log('Cannon WebApp is running at: http://localhost:' + config.http.port + " Yep. That's pretty awesome.")
    })
  }
)
