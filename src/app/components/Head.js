import React, { Component } from 'react'
import Helmet from 'react-helmet'

class Base extends Component {
  render () {
    return (
      <div className='App'>
        <Helmet
          htmlAttributes={{'lang': 'en'}}
          titleTemplate='SINFO - %s'
          defaultTitle='SINFO'
          meta={[
            {'charset': 'utf-8'},
            {'name': 'viewport', 'content': 'width=device-width, initial-scale=1'}
          ]}
          link={[
            {'rel': 'shortcut icon', 'href': '/src/app/favicon.ico'}
          ]}
        />
      </div>
    )
  }
}

export default Base
