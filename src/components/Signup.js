import React, {useRef} from 'react'
import {Card, Button, Form, FormControl, Container} from 'react-bootstrap'


export default function Signup(){
   const emailRef = useRef();
   const passwordRef = useRef();
   const passwordConfirmRef = useRef();
   return (

      <Container className = "d-flex align-items-center justify-content-center"
      style={{minHeight : "100vh"}}>
        <div className="w-100" style = {{maxWidth : "400px"}}>
         <Card>
            <Card.Body>
               <h2 className = "text-center mb-4">Sign Up</h2>
               <Form>
                  <Form.Group id="email">
                     <Form.Label>Email</Form.Label>
                     <Form.Control type = "email" ref={emailRef} required></Form.Control>
                  </Form.Group>
                  <Form.Group id="Password">
                     <Form.Label>Password</Form.Label>
                     <Form.Control type = "password" ref={passwordRef} required></Form.Control>
                  </Form.Group>
                  <Form.Group id="password-confirm">
                     <Form.Label>Password Confirmation</Form.Label>
                     <Form.Control type = "password" ref={passwordConfirmRef} required></Form.Control>
                  </Form.Group>
                  <Button className = "w-100" type="submit">Sign up</Button>
               </Form>
            </Card.Body>
         </Card>
         <div className = "w-100 test-center mt-2">
            Already have an account? LoginLink
         </div>
         </div>
      
      </Container>

   )
}