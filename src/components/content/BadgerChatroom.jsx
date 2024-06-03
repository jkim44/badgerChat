import React, { useRef, useEffect, useState, useContext } from "react"
import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import BadgerMessage from "./BadgerMessage"
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerChatroom(props) {

    const [success, setSuccess] = useContext(BadgerLoginStatusContext)
    const [messages, setMessages] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const titleRef = useRef();
    const contentRef = useRef();

    const loadMessages = () => {
        fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}&page=1`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    const buildPaginator = () => {
        // Calculate # of pages
        let pages = [];
        const num_pages = 4;

        // Create pages
        for (let i = 1; i <= num_pages; i++) {
            pages.push(
                <Pagination.Item
                    key={i}
                    active={activePage === i}
                    onClick={() => setActivePage(i)}
                >
                    {i}
                </Pagination.Item>
            )
        }
        return pages;
    }

    function createPost(e) {
        e.preventDefault()
        if (success === false) {
            alert("You must be logged in to post")
        } else if (titleRef.current.value === "" || contentRef.current.value === "") {
            alert("You must provide both a title and content!")
        } else {
            fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}`, {
                method: "POST",
                credentials: "include",
                headers:{
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: titleRef.current.value,
                    content: contentRef.current.value
                })
            }) 
            .then(res => {
                if (res.status === 200) {
                    alert("Successfully posted!")
                    window.location.reload();
                }
            })
        }
    }

    function deletePost(id) {
        fetch(`https://cs571.org/api/s24/hw6/messages?id=${id}`, {
            method: "DELETE",
            credentials: "include",
            headers:{
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.status === 200) {
                alert("Successfully deleted the post!")
                window.location.reload();
            }
        })
    }


    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props]);

    return <>
        <h1>{props.name} Chatroom</h1>
        <hr></hr>
        <div style={{ display: "flex" }}>
        {
            <Col xs={4}>
            <Form onSubmit={createPost}>
                <Form.Label htmlFor="postTitle">Post Title</Form.Label>
                <Form.Control id="postTitle" ref={titleRef}></Form.Control>
                <Form.Label htmlFor="postContent">Post Content</Form.Label>
                <Form.Control id="postContent" ref={contentRef}></Form.Control>
                <br></br>
                <Button type="submit" onClick={createPost}>Create Post</Button>
            </Form>
            </Col>
        }
        {
            messages.length > 0 ?
                <div>
                    <Container fluid>
                        <Row>
                        {messages
                         .slice((activePage - 1) * 25, activePage * 25)
                        .map(message => (
                            <Col
                            xs={4}
                            // sm={12}
                            // md={6}
                            // lg={4}
                            // xl={3}
                            key={message.id}
                            >
                                <BadgerMessage
                                {...message}
                                deletePost={deletePost}
                                >
                                </BadgerMessage>
                            </Col>
                        ))
                        }
                        </Row>
                    </Container>
                    <Pagination>
                        {buildPaginator()}
                    </Pagination>
                </div>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }


        </div>
    </>
}
