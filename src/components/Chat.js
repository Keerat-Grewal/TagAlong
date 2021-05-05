// import React, {Component} from 'react';
import React, { useRef, useState, useEffect } from 'react';
import {Button, Form, Col, Container, Row} from 'react-bootstrap';
import "../styles/chat.css";
import {firestore} from './Firebase';
import {auth} from './Firebase';
import { useAuth } from '../contexts/AuthContext'


export default function Chat(props) {
    const {signup, currentUser} = useAuth();
    const [username, setUsername] = useState('');
    const [receiver, setReceiver] = useState('');
    const [messages, setMessages] = useState([]);
    const [formValue, setFormValue] = useState('');
    const [formValue2, setFormValue2] = useState('');
    const [key, setKey] = useState('');

    const messagesRef = firestore.collection('messages');
    const usersRef = firestore.collection('users').doc(currentUser.uid);

    console.log("START");

    const handleSubmit = (e) => {
        e.preventDefault();
        // get other username
        const key = formValue + username;
        const key2 = username + formValue;
        messagesRef.doc(key).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data().username);
                messagesRef.doc(key)
                .onSnapshot({
                    includeMetadataChanges: true
                }, (doc) => {
                    //...
                    var newMessages = [];
                    newMessages.push(doc.data().message);
                    setMessages(newMessages);
                });
                setKey(key);

            } else {
                doc = messagesRef.doc(key2).get();
                if (doc.exists) {
                    console.log("Document data:", doc.data().username);
                    messagesRef.doc(key2)
                    .onSnapshot({
                        includeMetadataChanges: true
                    }, (doc) => {
                        //...
                        var newMessages = [];
                        newMessages.push(doc.data().message);
                        setMessages(newMessages);
                    });
                    setKey(key2);
                }
                else {
                    // doc.data() will be undefined in this case
                    //create a new doc
                    messagesRef.doc(key).set({
                        message: ""
                    })
                    messagesRef.doc(key)
                    .onSnapshot({
                        includeMetadataChanges: true
                    }, (doc) => {
                        //...
                        var newMessages = [];
                        newMessages.push(doc.data().message);
                        setMessages(newMessages);
                    });
                    console.log("Created document!");
                    setKey(key);
                }
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        // firestore.collection("messages").where("username", "==", formValue)
        // .onSnapshot((querySnapshot) => {
        //     var newMessages = [];
        //     querySnapshot.forEach((doc) => {
        //         newMessages.push(doc.data().message);
        //     });
        //     setMessages(newMessages);
        // });
        
    }

    const handleSubmit2 = (e) => {
        // send message to firebase
        e.preventDefault();
        messagesRef.doc(key).set({
            id: currentUser.uid,
            message: formValue2
        });
    }

    const handleChange = (event) => {
        //console.log(event.target.name);
        if(event.target.name === "username-form")
            setFormValue(event.target.value)
        if(event.target.name === "message-form"){
            setFormValue2(event.target.value)
        }
    }

    useEffect(() => {
        usersRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data().username);
                setUsername(doc.data().username);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        // const res = messagesRef.where("id", "==", "gOSPjHGns0b5LAV2NLYQHeUGmc72")
        //     .get()
        //     .then((querySnapshot) => {
        //         var newMessages = [];
        //         querySnapshot.forEach((doc) => {
        //             // doc.data() is never undefined for query doc snapshots
        //             newMessages.push(doc.data().message);
        //         });
        //         setMessages(n => newMessages);
        //     })
        //     .catch((error) => {
        //         console.log("Error getting documents: ", error);
        //     });
    
        // firestore.collection("messages").where("id", "==", currentUser.uid)
        //     .onSnapshot((querySnapshot) => {
        //         if (formValue != "") {
        //             var newMessages = [];
        //             querySnapshot.forEach((doc) => {
        //                 newMessages.push(doc.data().message);
        //             });
        //             setMessages(newMessages);
        //         }
        
        //     });

    }, [currentUser]);

    return(
        <>
        <Container fluid id="chatroom">
            <Form onSubmit={handleSubmit} onChange={handleChange}>
                <Form.Row id="username">
                    <Col >
                        <Form.Control
                            name="username-form" 
                            // className="mb-2 mr-sm-2"
                            placeholder="Username"
                        />
                    </Col>
                    <Col xs="auto">
                        <Button id="send-button1" type="submit" className="mb-2">
                            >
                        </Button>
                    </Col>
                </Form.Row>
            </Form>
            <div id="messages">
                {messages && messages.map(msg => <ChatMessage key={msg} message={msg}/>)}   
            </div>
            <Form  onSubmit={handleSubmit2} onChange={handleChange}>
                <Form.Row id ="form">
                    <Col >
                        <Form.Control 
                            name="message-form"
                            // className="mb-2 mr-sm-2"
                            placeholder="Message"
                        />
                    </Col>
                    <Col xs="auto">
                        <Button id="send-button2" type="submit" className="mb-2">
                            >
                        </Button>
                    </Col>
                </Form.Row>
            </Form>
        </Container>
        </>
    );

}

function ChatMessage(props) {
    // const { msg } = props.message;
    return (<>
        <p>{props.message}</p>
    </>)
  }
  