import React, { useRef, useState, useEffect, createRef} from 'react';
import {Button, Form, Col, Modal, Container, Row} from 'react-bootstrap';
import {firestore} from './Firebase';
import {auth} from './Firebase';
import { useAuth } from '../contexts/AuthContext'


export default function CreateRide() {
    const {signup, currentUser} = useAuth();
    const [showModal, setModal] = useState(false);
    const [formValue, setFormValue] = useState({
                destination: "",
                departure: "",
                firstname: "",
                lastname: "",
                username: ""
            });
    const myRef = createRef(); 
    const ridesRef = firestore.collection('rides');

    const handleClick = () => {
        setModal(false);
        // do firebase stuff ok
        ridesRef.doc(currentUser.uid).set({
            formValue
        })
        console.log("CLICKED MODAL")
    }

    const handleChange = (e) => {
        setFormValue({ 
            ...formValue, 
            [e.target.id]: e.target.value
        });
    }
    
    return (
        <>
            <Button id="ride-btn" variant="primary" onClick={() => setModal(true)}>
                Create Ride +
            </Button>
            <Modal
                ref={myRef}
                show={showModal}
                onHide={handleClick}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header onClick={handleClick} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create a Ride!
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label id="sign-up-text">Sign-up</Form.Label>
                        <Form.Control id="destination" type="email" placeholder="Destination" onChange={handleChange} />
                        <Form.Control id="departure" type="text" placeholder="Departure Date (Month Day, Year)" onChange={handleChange}/>
                        <Form.Control id="firstname" type="text" placeholder="First Name" onChange={handleChange}/>
                        <Form.Control id="lastname" type="text" placeholder="Last Name" onChange={handleChange}/>
                        <Form.Control id="username" type="text" placeholder="Username" onChange={handleChange}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClick}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}