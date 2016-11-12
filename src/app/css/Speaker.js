import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

export default class Speaker extends Component {
  render () {
    const style = { backgroundImage: 'url(' + this.props.img + ')' }
    return (
      <Col sm={6} md={2} lg={2} key={this.props.index} className='speaker'>
        <span>{this.props.name}</span>
        <div className='img' style={style} />
      </Col>
    )
  }
}
