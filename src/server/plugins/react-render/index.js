'use strict'
const React = require('react')
const ReactDOM = require('react-dom/server')
const ReactRouter = require('react-router')
const Helmet = require('react-helmet')
const Boom = require('boom')
const filter = require('lodash.filter')
const forEach = require('lodash.foreach')

function register (server, options = {}, next) {
  const routes = options.routes
  const assets = server.plugins.huyang.stats.assets

  // Extract scripts to pass to the template
  const bundles = filter(assets, (asset) => asset.chunkNames.indexOf('main') !== -1)
  let scriptTags = ''
  let cssTags = ''
  bundles.forEach((bundle) => {
    if (bundle.name.match(/\w\.js$/)) scriptTags += `<script async src=${bundle.name}></script>`
    if (bundle.name.match(/\w\.css$/)) cssTags += `<link rel="stylesheet" href=${bundle.name}>`
  })

  server.route({
    method: 'GET',
    path: '/{p*}',
    handler: appRouter
  })

  function appRouter (request, reply) {
    ReactRouter.match({ routes, location: request.path }, (error, redirectLocation, renderProps) => {
      if (error) return reply(Boom.badImplementation(error.message))
      if (redirectLocation) return reply.redirect(302, redirectLocation.pathname + redirectLocation.search)
      // No component to render
      if (!renderProps) return reply(Boom.notFound())
      const reactPage = ReactDOM.renderToString(
        React.createElement(
          ReactRouter.RouterContext,
          Object.assign({}, renderProps)
        )
      )
      const headElems = Helmet.rewind()
      const head = {}
      forEach(headElems, (value, prop) => {
        head[prop] = value.toString()
      })
      return reply.view('./template.pug', {reactPage, scriptTags, cssTags, head}, {path: __dirname})
    })
  }

  next()
}

register.attributes = {
  name: 'react-render',
  version: '1.0.0'
}

const reactRender = {register}

module.exports = reactRender