import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

export default class Member extends Component {
  render () {
    const style = { backgroundImage: 'url(' + this.props.img + ')' }
    const email = 'mailto:' + this.props.mail
    const twitterLink = 'https://twitter.com/' + this.props.twitter
    const gitHubLink = 'https://github.com/' + this.props.github

    return (
      <Col sm={6} md={2} lg={2} key={this.props.index} className='member'>
        <div className='name'>{this.props.name}</div>
        <div className='img' style={style} />
        <a target='_blank' href={email} className='social-icon fa fa-envelope-o' />
        <a target='_blank' href={twitterLink} className='social-icon fa fa-twitter' />
        <a target='_blank' href={gitHubLink} className='social-icon fa fa-github' />
      </Col>
    )
  }
}
