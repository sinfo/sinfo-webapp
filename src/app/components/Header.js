import React, { Component } from 'react'
import { Nav, Navbar, NavItem } from 'react-bootstrap'

class Header extends Component {
  handleSelect (selectedKey) {
    window.alert('selected ' + selectedKey)
  }

  render () {
    return (
      <Navbar inverse className='header'>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='#'><img src='https://static.wixstatic.com/media/e91543_2a60c36724e24e05a748a43d34a0e4f1~mv2.png/v1/fill/w_42,h_42,al_c,usm_0.66_1.00_0.01/e91543_2a60c36724e24e05a748a43d34a0e4f1~mv2.png' /></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav activeKey={1} onSelect={this.handleSelect.bind(this)}>
            <NavItem eventKey={1} href='#home'>Events</NavItem>
            <NavItem eventKey={2} href='#home'>About Us</NavItem>
            <NavItem eventKey={3} href='#home'>Speakers</NavItem>
            <NavItem eventKey={3} href='#home'>Sponsor Us</NavItem>
            <NavItem eventKey={4} href='#home'>COC</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Header
