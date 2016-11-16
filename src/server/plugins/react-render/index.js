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

  // Only generate the bundle tags once
  const bundles = getBundles()

  server.route({
    method: 'GET',
    path: '/{p*}',
    handler: appRouter
  })

  // Extract resources to embed in the template
  function getBundles () {
    let tags = {js: '', css: ''}
    const assets = server.plugins.huyang.stats.assets

    // Extract scripts to pass to the template
    const bundles = filter(assets, (asset) => asset.chunkNames.indexOf('main') !== -1)
    bundles.forEach((bundle) => {
      if (bundle.name.match(/\w\.js$/)) tags.js += `<script async src=${bundle.name}></script>`
      if (bundle.name.match(/\w\.css$/)) tags.css += `<link rel="stylesheet" href=${bundle.name}>`
    })
    return tags
  }

  // The logic for the webapp router
  function appRouter (request, reply) {
    // Don't do server rendering in dev
    if (options.isDev) return reply.view('./template.pug', bundles, {path: __dirname})
    // Let the react router handle the rest
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
      return reply.view('./template.pug', {
        js: bundles.js,
        css: bundles.css,
        reactPage,
        head
      }, {path: __dirname})
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
