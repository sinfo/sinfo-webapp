import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory, match } from 'react-router'
import routes from './routes'
// import logo from './images/logo.svg'

const mountNode = document.getElementById('root')

// Hack to get webpack [HMR] to work see:
// github.com/glenjamin/webpack-hot-middleware/issues/43
if (module.hot) module.hot.accept()

match({ history: browserHistory, routes }, (err, redirectLocation, renderProps) => {
  if (err) throw err
  render(<Router {...renderProps} />, mountNode)
})
