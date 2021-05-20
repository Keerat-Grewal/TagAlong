
import React, { useRef, useState, useEffect, createRef} from 'react';
import {Button, Form, Col, Modal, Container, Row} from 'react-bootstrap';
import Searchbar from './Searchbar';
import {firestore} from './Firebase';
import {auth} from './Firebase';
import { useAuth } from '../contexts/AuthContext'


export default function FindRide(props) {
    const {signup, currentUser} = useAuth();
    const [showModal, setModal] = useState(false);
    const [formValue, setFormValue] = useState({destination: ""});

    const searchRef = useRef(null); 

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
            const currentState = searchRef.current;
            // console.log("INSIDE destination")
            // console.log(currentState)
            setFormValue({ 
                ...formValue, 
                [e.target.id]: currentState.state.name
            });
            props.update(currentState.state.name)
            
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
                        Find Ride <i className="fa fa-search"></i>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        {/* <Form.Label id="sign-up-text">Information</Form.Label> */}
                        {/* <Form.Control id="destination" type="email" placeholder="Destination" onChange={handleChange} /> */}
                        <Form.Row>
                            <Col xs={11}>
                                <Searchbar ref={searchRef}></Searchbar>
                            </Col>
                            
                            <Col xs={1}>
                                <Button style={{background: "#E84F11", border: "#E84F11"}} id="destination" onClick={handleChange}>&#10003;</Button>
                            </Col>
                            
                        </Form.Row>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button style={{background: "#E84F11", border: "#E84F11"}} onClick={handleClick}>Submit</Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}