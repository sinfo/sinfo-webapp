import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import './index.css'

// Hack to get webpack [HMR] to work see:
// github.com/glenjamin/webpack-hot-middleware/issues/43
if (module.hot) module.hot.accept()

ReactDOM.render(<App />, document.getElementById('root'))
