import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";


function Navigation({auth,setAuth}) {
    console.log(auth)

    function logout(e) {
        e.preventDefault()
        setAuth(false)
        // setUser(null)
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
    }

    return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="light" className="navbar-custom mb-4">
            <Container fluid>
                <Navbar.Brand as={Link} to={"/"}>FoodQue</Navbar.Brand>
                {(auth) ? <> {/*for now*/}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/userprofle"  eventKey="1">Profile</Nav.Link>
                            <Nav.Link as={Link} to="/login" onClick={logout} eventKey="2">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </> : <>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/login"  eventKey="1">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register"  eventKey="2">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </>}
            </Container>
        </Navbar>
    );
}

export default Navigation;
