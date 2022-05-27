import { signOut } from 'firebase/auth';
import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { auth } from './firebase-config';
import { useNavigate } from "react-router-dom";

function AreaNavbarr() {

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth)
    navigate("/")
  }

  return (
    <div>
      <Navbar style={{ height: '70px' }} collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/area">Area</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                {/* <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                {/* // <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                //     <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                //     <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                //     <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                //     <NavDropdown.Divider />
                //     <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                // </NavDropdown> */}
                </Nav>
                <Nav>
                {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
                <Nav.Link onClick={logout}>Log out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  );
}

export default AreaNavbarr;