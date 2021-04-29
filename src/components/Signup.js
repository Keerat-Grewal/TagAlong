
import React, {useRef, useState} from 'react'
import {Alert, Card, Button, Form, FormControl, Container} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function Signup(){
   const emailRef = useRef();
   const passwordRef = useRef();
   const passwordConfirmRef = useRef();
   const {signup } = useAuth();
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);

   async function handleSubmit(e){
      e.preventDefault()
      if(passwordRef.current.value !== passwordConfirmRef.current.value){
         return setError("Passwords do not match");
      }  
      
      try{
         setError("")
         setLoading(true)
         await signup(emailRef.current.value, passwordRef.current.value)
      } catch(error){
         console.log(error);
         setError(error.message)
      }
      setLoading(false)
   }

   return (

      <Container className = "d-flex align-items-center justify-content-center"
      style={{minHeight : "100vh"}}>
        <div className="w-100" style = {{maxWidth : "400px"}}>
         <Card>
            <Card.Body>
               <h2 className = "text-center mb-4">Sign Up</h2>
               {error && <Alert variant = "danger"> {error} </Alert>}
               <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                  </Form.Group>
                     <Form.Label>Email</Form.Label>
                     <Form.Control type = "email" ref={emailRef} required></Form.Control>
                  <Form.Group id="Password">
                     <Form.Label>Password</Form.Label>
                     <Form.Control type = "password" ref={passwordRef} required></Form.Control>
                  </Form.Group>
                  <Form.Group id="password-confirm">
                     <Form.Label>Password Confirmation</Form.Label>
                     <Form.Control type = "password" ref={passwordConfirmRef} required></Form.Control>
                  </Form.Group>
                  <Button disabled = {loading} className = "w-100" type="submit">Sign up</Button>
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