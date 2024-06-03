import React from 'react';
import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function BadgerRegister() {

    const usernameRef = useRef();
    const passwordRef = useRef();
    const repeatPasswordRef = useRef();

    function handleRegistration(e) {
        e?.preventDefault();  // prevents default form submit action
        if (usernameRef.current.value === "" || passwordRef.current.value === "") {
            alert("You must provide both a username and password!")
        } else if (passwordRef.current.value !== repeatPasswordRef.current.value) {
            alert("Your passwords do not match!")
        } else {
            fetch("https://cs571.org/api/s24/hw6/register", {
            method:"POST",
            credentials:"include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                password: passwordRef.current.value
            })
            })
            .then(res => {
                if(res.status === 200) {
                    alert("Registration was successful!")
                } else if(res.status === 409) {
                    alert("That username has already been taken!")
                }
            })
    }
        }


    return <>
        <h1>Register</h1>
        <Form onSubmit={handleRegistration}>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control id="usernameInput" ref={usernameRef}></Form.Control>
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control id="passwordInput" ref={passwordRef}></Form.Control>
            <Form.Label id="repeatPassword">Repeat Password</Form.Label>
            <Form.Control id="repeatPassword" ref={repeatPasswordRef}></Form.Control>
            <br></br>
            <Button type="submit" onClick={handleRegistration}>Register</Button>
        </Form>
    
    </>
}
