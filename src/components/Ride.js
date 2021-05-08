import React, { useRef, useState, useEffect, createRef} from 'react';
import {Button, Form, Col, Modal, Container, Row} from 'react-bootstrap';
import Searchbar from './Searchbar';
import {firestore} from './Firebase';
import {auth} from './Firebase';
import { useAuth } from '../contexts/AuthContext'
import '../styles/ride.css'

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
    const destRef = useRef(null); 
    const ridesRef = firestore.collection('rides');
    console.log(destRef.current);
    const handleClick = () => {
        setModal(false);
        // do firebase stuff ok
        ridesRef.doc(currentUser.uid).set({
            formValue
        })
        console.log("CLICKED MODAL")
    }

    const handleChange = (e) => {
        if(e.target.id === "destination") {
            const currentState = destRef.current;
            console.log("INSIDE destination")
            console.log(currentState)
            setFormValue({ 
                ...formValue, 
                [e.target.id]: currentState.state.name
            });
        }
        else{
            setFormValue({ 
                ...formValue, 
                [e.target.id]: e.target.value
            });
        }
    }
    
    return (
        <>
            <Button id="ride-btn" variant="primary" onClick={() => setModal(true)}>
                Create Ride +
            </Button>
            <Modal
                show={showModal}
                onHide={handleClick}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header onClick={handleClick} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Ride Form
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label id="sign-up-text">Information</Form.Label>
                        {/* <Form.Control id="destination" type="email" placeholder="Destination" onChange={handleChange} /> */}
                        <Form.Row>
                            <Col>
                                <Searchbar ref={destRef}></Searchbar>
                            </Col>
                            
                            <Col>
                                <Button variant="primary" id="destination" onClick={handleChange}>&#10003;</Button>
                            </Col>
                            
                        </Form.Row>
                            {/* <Form.Control id="destination" type="text" value={destRef.current && destRef.current.state}/> */}
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