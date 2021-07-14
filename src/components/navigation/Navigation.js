import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";


function Navigation(props) {
    return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="light" className="navbar-custom">
            <Container fluid>
                <Navbar.Brand href="#home">FoodQue</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/login"  eventKey="1">Login</Nav.Link>
                        <Nav.Link as={Link} to="/register"  eventKey="2">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
