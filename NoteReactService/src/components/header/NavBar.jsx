import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import NavItem from './NavItem';
import NavbarLogo from './NavbarLogo';
import '../../styles/NavBar.css';

const NavBar = ({ token, onLogout }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/"><NavbarLogo /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavItem token={token} onLogout={onLogout} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
