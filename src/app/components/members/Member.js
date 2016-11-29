import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

export default class Member extends Component {
  render () {
    const style = { backgroundImage: 'url(' + this.props.img + ')' }
    let mailLink
    if (this.props.mail) {
      mailLink = <a target='_blank' href={'mailto:' + this.props.mail} className='social-icon fa fa-envelope-o' />
    }
    let twitterLink
    if (this.props.twitter) {
      twitterLink = <a target='_blank' href={'https://twitter.com/' + this.props.twitter} className='social-icon fa fa-twitter' />
    }
    let gitHubLink
    if (this.props.github) {
      gitHubLink = <a target='_blank' href={'https://github.com/' + this.props.github} className='social-icon fa fa-github' />
    }
    return (
      <Col sm={6} md={2} lg={2} key={this.props.index} className='member'>
        <div className='name'>{this.props.name}</div>
        <div className='img' style={style} />
        {mailLink}
        {twitterLink}
        {gitHubLink}
      </Col>
    )
  }
}
