import React from "react";
import { Nav, Navbar } from "react-bootstrap";

function NavBar(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Rent a Car</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav.Link href="/login">Login</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
