import React from 'react';
import { useRef, useState, useEffect, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerLogin(props) {

    const usernameRef = useRef();
    const passwordRef = useRef();
    const [success, setSuccess] = useContext(BadgerLoginStatusContext)
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault()
        if (usernameRef.current.value === "" || passwordRef.current.value === "") {
            alert("You must provide both a username and password!")
        } else {
            fetch("https://cs571.org/api/s24/hw6/login", {
                method:"POST",
                credentials: "include",
                headers:{
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value
                })
            })
            .then(res => {
                if (res.status === 200) {
                    setSuccess(true)
                    sessionStorage.setItem("loginStatus", JSON.stringify(true));
                    alert("Login was successful!")
                    sessionStorage.setItem("username", JSON.stringify(usernameRef.current.value))
                } else if (res.status === 401) {
                    alert("Incorrect username or password!")
                }
            })
        }
    }

    useEffect(() => {
        if (success) {
            navigate("/");
        }
    }, [success, navigate])

    return <>
        <h1>Login</h1>
        <Form onSubmit={handleLogin}>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control id="usernameInput" ref={usernameRef}></Form.Control>
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control id="passwordInput" type="password" ref={passwordRef}></Form.Control>
            <br></br>
            <Button type="submit" onClick={handleLogin}>Login</Button>
        </Form>
    </>
}
