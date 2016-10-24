import React, { Component } from 'react'
import {React_Boostrap_Carousel as ReactBoostrapCarousel} from 'react-boostrap-carousel'

export default class Carousel extends Component {
  render () {
    return (
      <ReactBoostrapCarousel animation className='carousel-fade'>
        <div style={{height: 300, width: '100%', backgroundColor: 'skyblue'}}>
          123
        </div>
        <div style={{height: 300, width: '100%', backgroundColor: 'aqua'}}>
          456
        </div>
        <div style={{height: 300, width: '100%', backgroundColor: 'lightpink'}}>
          789
        </div>
      </ReactBoostrapCarousel>
    )
  }
}
