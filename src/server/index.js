'use strict'
// Set babel require hook
require('babel-register')(require('../../config/babel.config'))

const Hapi = require('hapi')
const config = require('../../config/app.config')

// Require the correct webpack config
const webpackConfig = config.isDev
  ? require('../../config/webpack.dev')
  : require('../../config/webpack.prod')

const server = new Hapi.Server({
  // Get error logs from the pug compiler
  debug: {
    request: ['error']
  }
})

server.connection({
  host: config.server.host,
  port: config.server.port
})

server.register([
  {register: require('vision')},
  {register: require('inert')},
  {
    register: require('huyang'),
    options: webpackConfig
  },
  {
    register: require('./plugins/react-render'),
    options: {
      routes: require('../app/routes')
    }
  }
], (err) => {
  if (err) throw err

  // Setup the pug view template engine
  server.views({
    engines: { pug: require('pug') },
    encoding: 'utf8',
    isCached: true,
    compileOptions: {
      pretty: true
    }
  })

  // Start the server
  server.start((err) => {
    if (err) throw err
    console.log(`Server running at: ${server.info.uri}`)
  })
})
