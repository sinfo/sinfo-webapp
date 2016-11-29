import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory, match } from 'react-router'
import routes from './routes'

const mountNode = document.getElementById('root')

match({ history: browserHistory, routes }, (err, redirectLocation, renderProps) => {
  if (err) throw err
  render(<Router {...renderProps} />, mountNode)
})
