import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap'

class Header extends Component {
  handleSelect(selectedKey) {
      alert('selected ' + selectedKey);
  }

  render() {
    return (
      <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">SINFO</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav activeKey={1} onSelect={this.handleSelect.bind(this)}>
              <NavItem eventKey={1} href="#home">Events</NavItem>
              <NavItem eventKey={2} href="#home">About Us</NavItem>
              <NavItem eventKey={3} href="#home">Speakers</NavItem>
              <NavItem eventKey={3} href="#home">Sponsor Us</NavItem>
              <NavItem eventKey={4} href="#home">COC</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default Header;

