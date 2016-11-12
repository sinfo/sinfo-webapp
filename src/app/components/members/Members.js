import React, { Component } from 'react'
import axios from 'axios'
import { Grid, Row } from 'react-bootstrap'

import Member from './Member'

export default class Members extends Component {
  constructor (props) {
    super(props)
    this.state = { members: [] }
  }

  componentDidMount () {
    const self = this
    axios.get('https://deck.sinfo.org:443/api/members?event=24-sinfo&&participations=true')
    .then(res => {
      self.setState({ members: res.data })
    })
  }

  render () {
    return (
      <Grid fluid className='members'>
        <Grid>
          <h1 className='title'>The team</h1>
          <Row>
            {
              this.state.members.map((member, index) => {
                return (<Member key={index} name={member.name} img={member.img} twitter={member.twitter} github={member.github} mail={member.mail} />)
              })
            }
          </Row>
        </Grid>
      </Grid>
    )
  }
}
