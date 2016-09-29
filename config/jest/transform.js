const babelDev = require('../babel.config')
const babelJest = require('babel-jest')

module.exports = babelJest.createTransformer(babelDev)
