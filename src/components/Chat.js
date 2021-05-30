import React, { useRef, useState, useEffect } from "react";
import {Button, Form, Col, Container, Row} from "react-bootstrap";
import "../styles/chat.css";
import {firestore} from "./Firebase";
import {auth} from "./Firebase";
import { useAuth } from "../contexts/AuthContext";
import firebase from "firebase/app";


export default function Chat(props) {
   const {signup, currentUser} = useAuth();
   const [username, setUsername] = useState("");
   const [receiver, setReceiver] = useState("");
   const [messages, setMessages] = useState([]);
   const [formValue, setFormValue] = useState("");
   const [formValue2, setFormValue2] = useState("");
   const [key, setKey] = useState("");

   const messagesRef = firestore.collection("messages");
   const usersRef = firestore.collection("users").doc(currentUser.uid);
   const formRef = useRef();


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
               setMessages(doc.data().message);
            });
            setKey(key);
         } 
         else {
            messagesRef.doc(key2).get().then((doc) => {
               if (doc.exists) {
                  console.log("Document data:", doc.data().username);
                  messagesRef.doc(key2)
                  .onSnapshot({
                        includeMetadataChanges: true
                  }, (doc) => {
                        setMessages(doc.data().message);
                  });
                  setKey(key2);
               }
               else {
                  // doc.data() will be undefined in this case
                  //create a new doc
                  messagesRef.doc(key).set({
                     message: []
                  })
                  messagesRef.doc(key)
                  .onSnapshot({
                     includeMetadataChanges: true
                  }, (doc) => {
                     setMessages(doc.data().message);
                  });
                  console.log("Created document!");
                  setKey(key);
               }
            }).catch((error) => {
               console.log("Error getting document:", error);
            });
         }
      }).catch((error) => {
         console.log("Error getting document:", error);
      });
   }

   const handleSubmit2 = (e) => {
      // send message to firebase
      e.preventDefault();
      messagesRef.doc(key).update({
         message: firebase.firestore.FieldValue.arrayUnion({id: currentUser.uid, message: formValue2, timestamp: new Date()})
      });
      formRef.current.reset();
   }

   const handleChange = (event) => {
      //console.log(event.target.name);
      if(event.target.name === "username-form")
         setFormValue(event.target.value);
      if(event.target.name === "message-form"){
         setFormValue2(event.target.value);
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
   }, [currentUser]);

   return(
      <div id="chatroom">
         <div id="usernameBox">
            <Form onSubmit={handleSubmit} onChange={handleChange}>
               <Form.Row id="username">
                  <Col >
                     <Form.Control
                        name="username-form" 
                        placeholder="Username"
                     />
                  </Col>
                  <Col xs="auto">
                     <Button id="send-button1" type="submit" className="mb-2" style={{background: "#E84F11", border: "#E84F11"}}>
                        Submit
                     </Button>
                  </Col>
               </Form.Row>
            </Form>    
         </div>
         <flexContainer id="messagesBox">
            <div id="messages">
               {messages && messages.map((msg, index) => <ChatMessage key={index} message={msg.message} uid={msg.id}/>)}   
            </div>
         </flexContainer>
         <div id="sendBox">
            <Form  ref = {formRef} onSubmit={handleSubmit2} onChange={handleChange}>
               <Form.Row id ="form">
                  <Col >
                     <Form.Control 
                        name="message-form"
                        placeholder="Message"
                     />
                  </Col>
                  <Col xs="auto">
                     <Button id="send-button2" type="submit" className="mb-2" style={{background: "#E84F11", border: "#E84F11"}}>
                        Send
                     </Button>
                  </Col>
               </Form.Row>
            </Form>
         </div>
      </div>
   );
}

function ChatMessage(props) {
   var messageClass = "";
   if(props.uid === auth.currentUser.uid) {
      messageClass = 'sent';
   }
   else{
      messageClass = 'received';
   }
   return ( 
      <div className={`message ${messageClass}`}>
         <p>{props.message}</p>
      </div>
   )
}
