var Hapi = require('hapi');
var config = require('config');
var server = new Hapi.Server(config.http.listen, config.http.port);
var moonbootsConfig = require('./moonbootsConfig');
var internals = {};

// set clientconfig cookie
internals.configStateConfig = {
  encoding: 'none',
  ttl: 1000 * 60 * 15,
  isSecure: config.isSecure
};

server.state('config', internals.configStateConfig);
internals.clientConfig = JSON.stringify(config.client);
server.ext('onPreResponse', function(request, reply) {
  if (request.state && !request.state.config) {
    var response = request.response;
    if(!response.state) {
      return reply();
    }
    response.state('config', encodeURIComponent(internals.clientConfig));

    return reply(response);
  }
  else {
    return reply();
  }
});

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
};

server.route(publicAssets);

// require moonboots_hapi plugin
server.pack.register({plugin: require('moonboots_hapi'), options: moonbootsConfig}, function (err) {
  if (err) throw err;
  // If everything loaded correctly, start the server:
  server.start(function (err) {
    if (err) throw err;
    console.log('Cannon WebApp is running at: http://localhost:' + config.http.port + ' Yep. That\'s pretty awesome.');
  });
});
