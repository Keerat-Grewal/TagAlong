
import React, { useRef, useState, useEffect, createRef} from 'react';
import {Button, Form, Col, Modal, Container, Row} from 'react-bootstrap';
import Searchbar from './Searchbar';
import {firestore} from './Firebase';
import {auth} from './Firebase';
import { useAuth } from '../contexts/AuthContext'


export default function FindRide() {
    const {signup, currentUser} = useAuth();
    const [showModal, setModal] = useState(false);
    const [formValue, setFormValue] = useState({
                destination: "",
            });
    const destRef = useRef(null); 

    const handleClick = () => {
        setModal(false);
        // do firebase stuff ok
        console.log(formValue);
        console.log("CLICKED MODAL")
    }

    const handleHide = () => {
        console.log(formValue);
        setModal(false);
    }

    const handleChange = (e) => {
        if(e.target.id === "destination") {
            const currentState = destRef.current;
            // console.log("INSIDE destination")
            // console.log(currentState)
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
            <Button id="ride-btn" style={{marginLeft: 10, background: "#E84F11", border: "#E84F11"}} onClick={() => setModal(true)}>
                Search Ride <i className="fa fa-search"></i>
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
                        Find Ride
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        {/* <Form.Label id="sign-up-text">Information</Form.Label> */}
                        {/* <Form.Control id="destination" type="email" placeholder="Destination" onChange={handleChange} /> */}
                        <Form.Row>
                            <Col>
                                <Searchbar ref={destRef}></Searchbar>
                            </Col>
                            
                            <Col>
                                <Button style={{background: "#E84F11", border: "#E84F11"}} id="destination" onClick={handleChange}>&#10003;</Button>
                            </Col>
                            
                        </Form.Row>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{background: "#E84F11", border: "#E84F11"}} onClick={handleClick}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}