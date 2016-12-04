import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import config from '../config.json'
import Speakers from './speakers/Speakers.js'
import Companies from './Companies.js'
import Members from './members/Members.js'

class EditionPicker extends Component {
  constructor () {
    super()
    this.state = {
      edition: 'sinfo24'
    }
  }

  shouldChildRender (componentName) {
    return config[this.state.edition].indexOf(componentName) > -1
  }

  render () {
    return (
      <div className='Edition-picker'>
        <Button onClick={() => this.setState({edition: 'sinfo21'})}>SINFO 21</Button>
        <Button onClick={() => this.setState({edition: 'sinfo22'})}>SINFO 22</Button>
        <Button onClick={() => this.setState({edition: 'sinfo23'})}>SINFO 23</Button>
        <Button onClick={() => this.setState({edition: 'sinfo24'})}>SINFO 24</Button>
        {this.shouldChildRender('Speakers') && <Speakers />}
        {this.shouldChildRender('Companies') && <Companies />}
        {this.shouldChildRender('Members') && <Members />}
      </div>
    )
  }
}

export default EditionPicker
