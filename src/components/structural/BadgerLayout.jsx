import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import crest from '../../assets/uw-crest.svg'
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import BadgerLogin from "../auth/BadgerLogin"

function BadgerLayout(props) {

    // TODO @ Step 6:
    // You'll probably want to see if there is an existing
    // user in sessionStorage first. If so, that should
    // be your initial loginStatus state.
    const storedLoginStatus = JSON.parse(sessionStorage.getItem("loginStatus"));
    const [loginStatus, setLoginStatus] = useState(storedLoginStatus || false);



    useEffect(() => {
        if (storedLoginStatus !== null) {
            setLoginStatus(storedLoginStatus);
        }
    }, []);


    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {!loginStatus && <Nav.Link as={Link} to="login">Login</Nav.Link>}
                        {!loginStatus && <Nav.Link as={Link} to="register">Register</Nav.Link>}
                        {loginStatus && <Nav.Link as={Link} to="logout">Logout</Nav.Link>}
                        <NavDropdown title="Chatrooms">
                            {props.chatrooms.map(chatroom => {
                                return <NavDropdown.Item
                                as={Link}
                                key={chatroom}
                                to={'chatrooms/' + chatroom}>{chatroom}</NavDropdown.Item>
                            })}
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ margin: "1rem" }}>
                <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
                    <Outlet />
                </BadgerLoginStatusContext.Provider>
            </div>
        </div>
    );
}

export default BadgerLayout;