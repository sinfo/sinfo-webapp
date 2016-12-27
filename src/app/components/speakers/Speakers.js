import React, { Component } from 'react'
import axios from 'axios'
import { Grid, Row } from 'react-bootstrap'

import Speaker from './Speaker'

export default class Speakers extends Component {
  constructor (props) {
    super(props)
    this.state = { speakers: [] }
  }

  componentDidMount () {
    const self = this
    axios.get('https://deck.sinfo.org/api/speakers')
    .then(res => {
      self.setState({ speakers: res.data })
    })
  }

  render () {
    return (
      <Grid fluid className='speakers'>
        <Grid>
          <h1 className='title'>Speakers</h1>
          <Row>
            {
              this.state.speakers.map((spkr, index) => {
                if (spkr.img) {
                  return (<Speaker key={index} name={spkr.name} img={spkr.img} />)
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
