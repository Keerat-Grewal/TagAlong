// import React, {Component} from 'react';
import React, { useRef, useState, useEffect } from 'react';
import {Button, Form, FormControl, Col, Container, Row} from 'react-bootstrap';
import "../styles/chat.css";
import {firestore} from './Firebase';
import {auth} from './Firebase';
import { useAuth } from '../contexts/AuthContext'


export default function Chat() {
    const {signup, currentUser } = useAuth();

    const [messages, setMessages] = useState([]);
    const [formValue, setFormValue] = useState('');
    const messagesRef = firestore.collection('messages');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        var newMessages = this.state.messages.slice();
        newMessages.push(this.state.currMessage);
        this.setState({messages: newMessages});
    }

    const handleChange = (input) => {
        setFormValue(input.target.value)
    }

    // firestore.collection("messages").where("id", "==", "gOSPjHGns0b5LAV2NLYQHeUGmc72")
    // .onSnapshot((querySnapshot) => {
    //     var newMessages = messages.slice();
    //     console.log("HERE");
    //     querySnapshot.forEach((doc) => {
    //         newMessages.push(doc.data().message);
    //     });
    //     setMessages(newMessages);
    // });

    useEffect(() => {
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
    
        firestore.collection("messages").where("id", "==", currentUser.uid)
            .onSnapshot((querySnapshot) => {
                var newMessages = [];
                querySnapshot.forEach((doc) => {
                    newMessages.push(doc.data().message);
                });
                setMessages(newMessages);
            });

    }, [messages]);

    return(
        <>
        <Container fluid id="chatroom">
            <div id="messages">
                {messages && messages.map(msg => <ChatMessage key={msg} message={msg}/>)}   
            </div>
            <Form onSubmit={handleSubmit} onChange={handleChange}>
                <Form.Row id = "form">
                    <Col >
                        <Form.Control 
                            // className="mb-2 mr-sm-2"
                            placeholder="Message"
                        />
                    </Col>
                    <Col xs="auto">
                        <Button id="send-button" type="submit" className="mb-2">
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
  
// class Chat extends Component {
//     constructor(props){
//         super(props);
//         this.state = {messages: [], currMessage:""};
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     componentDidMount() {
//         // get the messages from firebase
//         const messagesRef = firestore.collection('messages');
//         const query = messagesRef.orderBy('createdAt').limit(25);

//     }

//     handleSubmit(e){
//         e.preventDefault();
//         var newMessages = this.state.messages.slice();
//         newMessages.push(this.state.currMessage);
//         console.log(newMessages);
//         this.setState({messages: newMessages});
//     }

//     handleChange(input) {
//         let message = input.target.value;
//         this.setState({currMessage: message})
//     }


//     render() {
//         return(
//             <>
//             <Container fluid id="chatroom">
//                 <div id="messages">
//                     {this.state.messages && this.state.messages.map(msg => <p key={msg}> {msg} </p>)}   
//                 </div>
//                 <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
//                     <Form.Row id = "form">
//                         <Col >
//                             <Form.Control 
//                                 // className="mb-2 mr-sm-2"
//                                 placeholder="Message"
//                             />
//                         </Col>
//                         <Col xs="auto">
//                             <Button id="send-button" type="submit" className="mb-2">
//                                 >
//                             </Button>
//                         </Col>
//                     </Form.Row>
//                 </Form>
//             </Container>
//             </>
//         )
//     }
// }

// export default Chat;