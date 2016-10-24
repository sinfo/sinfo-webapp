import React, { Component } from 'react'
import { Link } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import Head from './components/Head'
import Carousel from './components/Carousel'

class App extends Component {
  componentDidMount () {
    // We need to require css here in order for it to be isomorphic
    require('bootstrap/dist/css/bootstrap.css')
    require('./css/App.css')
    require('./css/react-boostrap-carousel.css')
    // logo = require('./images/logo.svg')
  }
  render () {
    return (
      <div className='App'>
        <Head />
        <Header />
        <Carousel />
        <div className='App-header'>
          <h2>Welcome to React</h2>
        </div>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to='/test'> BATATA POWER</Link>
        <Footer />
      </div>
    )
  }
}

export default App
