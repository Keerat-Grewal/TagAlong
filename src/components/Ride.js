import React, { useRef, useState, useEffect, createRef} from 'react';
import {Button, Form, Col, Modal, Container, Row} from 'react-bootstrap';
import Searchbar from './Searchbar';
import {firestore} from './Firebase';
import {auth} from './Firebase';
import { useAuth } from '../contexts/AuthContext'
import '../styles/ride.css'
import firebase from 'firebase/app'
import useGeoLocation from './Location';

export default function CreateRide() {
    const {signup, currentUser} = useAuth();
    const [showModal, setModal] = useState(false);
    const location = useGeoLocation();
    
    const [formValue, setFormValue] = useState({
                destination: "",
                departure: "",
                firstname: "",
                lastname: "",
                username: ""
            });

    const destRef = useRef(null); 
    const ridesRef = firestore.collection('rides');

    const handleClick = () => {
        setModal(false);
        // do firebase stuff
        const timestamp = firebase.firestore.Timestamp.fromDate(new Date(formValue.departure));
        const real_lat = location.coordinates.lat - 0.01;
        const real_lng = location.coordinates.lng - 0.01;

        ridesRef.doc(currentUser.uid).set({
            destination: formValue.destination,
            departure: timestamp,
            firstname: formValue.firstname,
            lastname: formValue.lastname,
            username: formValue.username,
            lat: real_lat,
            lng: real_lng
        })
        console.log("CLICKED MODAL")
    }

    const handleHide = () => {
        setModal(false);
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
            <Button id="ride-btn" style={{background: "#E84F11", border: "#E84F11"}} onClick={() => setModal(true)}>
                Create Ride +
            </Button>
            <Modal
                show={showModal}
                onHide={handleHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header onClick={handleHide} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Ride Form
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label id="sign-up-text">Information</Form.Label>
                        {/* <Form.Control id="destination" type="email" placeholder="Destination" onChange={handleChange} /> */}
                        <Form.Row>
                            <Col xs={11}>
                                <Searchbar ref={destRef}></Searchbar>
                            </Col>
                            
                            <Col xs={1}>
                                <Button style={{background: "#E84F11", border: "#E84F11"}} id="destination" onClick={handleChange}>&#10003;</Button>
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
                    <Button style={{background: "#E84F11", border: "#E84F11"}} onClick={handleClick}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}