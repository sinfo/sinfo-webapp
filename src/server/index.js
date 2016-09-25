'use strict'

const Hapi = require('hapi')
const webpackConfig = require('../../config/webpack.config.dev')

const server = new Hapi.Server()
server.connection({ port: 3000 })

server.register([
  { register: require('inert') },
  {
    register: require('huyang'),
    options: webpackConfig
  }
], (err) => {
  if (err) throw err

  server.start((err) => {
    if (err) throw err
    console.log(`Server running at: ${server.info.uri}`)
  })
})
