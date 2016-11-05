import React, { Component } from 'react'
import {React_Boostrap_Carousel as ReactBoostrapCarousel} from 'react-boostrap-carousel'

export default class Carousel extends Component {
  render () {
    return (
      <ReactBoostrapCarousel animation className='carousel-fade'>
        <div style={{background: "url('https://static.wixstatic.com/media/e91543_23a90ebe20264acfab7aef98e6e3b099~mv2_d_3888_2592_s_4_2.jpg/v1/fill/w_2560,h_1396,al_c,q_90,usm_0.66_1.00_0.01/e91543_23a90ebe20264acfab7aef98e6e3b099~mv2_d_3888_2592_s_4_2.jpg') center / cover"}}>
          <span className='title'>Estamos à tua espera!</span>
        </div>
        <div style={{background: "url('https://static.wixstatic.com/media/035244_5bf357cd7b9e451dade2e1d74dc1e40d.jpeg/v1/fill/w_1080,h_589,al_c,q_85/035244_5bf357cd7b9e451dade2e1d74dc1e40d.jpeg') center / cover"}}>
          <span className='title'>Workshop de Gajas</span>
          <br />
          <span className='sub-title'>Formador: João Antunes</span>
        </div>
        <div style={{background: 'url("https://static.wixstatic.com/media/e91543_cff98aaeb2494d38bb73e133534acb20~mv2_d_5184_3456_s_4_2.jpg/v1/fill/w_2560,h_1396,al_c,q_90,usm_0.66_1.00_0.01/e91543_cff98aaeb2494d38bb73e133534acb20~mv2_d_5184_3456_s_4_2.jpg") center / cover'}}>
          <span className='title'>A SINFO24 esta a chegar!</span>
        </div>
      </ReactBoostrapCarousel>
    )
  }
}
