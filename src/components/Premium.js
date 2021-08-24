import React, { useRef, useState } from 'react';
import {
  Alert, Card, Button, Form, Container, Image, Col,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../logo_3.png';
import Background from '../background_3.jpeg';
import Navigation from './Navigation';
import { firestore } from './Firebase';

export default function Premium() {
  const userNameRef = useRef();
  const reasonRef = useRef();
  const { signup, currentUser } = useAuth();
  const [clicked, setClicked] = useState(false);
  const premiumRef = firestore.collection('premium');

  const handleSubmit = (e) => {
    console.log('INSIDE PREMIUM SUBMIT');
    e.preventDefault();
    premiumRef.doc(currentUser.uid).set({
      uid: currentUser.uid,
      reason: reasonRef.current.value,
      username: userNameRef.current.value,
    });
    setClicked(true);
  };

  return (
    <>
      <Navigation update={() => {}} display={false} />
      <Container fluid className="d-flex align-items-center justify-content-center">
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Image style={{ marginLeft: 'auto', width: '100%' }} src={Logo} />
          <Card style={{ background: '#F2F2F2' }}>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ fontFamily: 'Verdana' }}>Premium Application</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group id="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control ref={userNameRef} required />
                </Form.Group>
                <Form.Group id="reason">
                  <Form.Label>Reason</Form.Label>
                  <Form.Control size="lg" type="text" ref={reasonRef} required />
                </Form.Group>

                <Button style={{ background: '#E84F11', border: '#E84F11' }} className="w-100" type="submit">Submit</Button>
              </Form>
              {clicked && <p style={{ fontFamily: 'Verdana', marginTop: 10, textAlign: 'center' }}>Your application was submitted!!</p>}
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
