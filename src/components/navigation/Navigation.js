import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";


function Navigation(props) {
    return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="light" className="navbar-custom">
            <Container fluid>
                <Navbar.Brand href="#home">FoodQue</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Link className="nav-link" to="/login">Login</Link>
                        <Link className="nav-link" to="/register">Register</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
