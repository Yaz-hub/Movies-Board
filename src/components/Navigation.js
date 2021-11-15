import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Container} from "react-bootstrap";

function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg"variant="dark">
      <Container>
        <Navbar.Brand href="/"><img src="/logo.png" alt="Movies Board" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/movies">Movies List</Nav.Link>
            <Nav.Link href="/add">Add a movie </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
