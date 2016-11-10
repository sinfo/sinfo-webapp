import React, { Component } from 'react'
import axios from 'axios'
import { Grid, Row } from 'react-bootstrap'

import Member from './Member'

export default class Team extends Component {
  constructor (props) {
    super(props)
    this.state = { team: [] }
  }

  componentDidMount () {
    const self = this
    axios.get('https://deck.sinfo.org:443/api/members?event=24-sinfo&&participations=true')
    .then(res => {
      self.setState({ team: res.data })
    })
  }

  render () {
    return (
      <Grid fluid className='team'>
        <Grid>
          <h1 className='title'>Team</h1>
          <Row>
            {
              this.state.team.map((member, index) => {
                if (member.participations.event === '24-sinfo') {
                  return (<Member key={index} name={member.name} img={member.img} />)
                }
                return
              })
            }
          </Row>
        </Grid>
      </Grid>
    )
  }
}
