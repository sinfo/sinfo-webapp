'use strict'

const path = require('path')
const fs = require('fs')

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const config = {
  isDev: process.env.NODE_ENV !== 'production',
  app: {},
  server: {}
}

config.server = {
  host: process.env.WEBAPP_HOST || 'localhost',
  port: process.env.WEBAPP_PORT || 3000
}

config.app.paths = {
  appBuild: resolveApp('build'),
  appIndexJs: resolveApp('src/app/index.js'),
  appSrc: resolveApp('src/app'),
  testsSetup: resolveApp('src/app/setupTests.js'),
  appNodeModules: resolveApp('node_modules')
}

module.exports = config
