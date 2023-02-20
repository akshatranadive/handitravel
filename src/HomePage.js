import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import './HomePage.css';

const HomePage = () => {
  return (
      
    <div className="">
      <Navbar sticky="top" expand="lg" variant="dark" bg="blue">
        <Container>
          <Navbar.Brand>Handi Travel</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link>Home</Nav.Link>
              <Nav.Link>Guides</Nav.Link>
              <Nav.Link>Community</Nav.Link>
              <Nav.Link>About Us</Nav.Link>
              <Button variant="info">Log In</Button>{' '}
              <Button variant="info">Sign Up</Button>{' '}
              <Nav.Link></Nav.Link>
              <NavDropdown title="Settings">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item>Account</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <h1>Handi Travel</h1>
      <p>Welcome to Handi Travel, the premier travel community for people with disabilities.</p>
    </div>
  );
};


export default HomePage;
