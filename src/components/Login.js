
import React, {useRef, useState} from 'react'
import {Alert, Card, Button, Form, FormControl, Container, Image} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import  { Link, useHistory } from 'react-router-dom'
import Logo from '../Logo2.png';


export default function Login(){
   const emailRef = useRef();
   const passwordRef = useRef();
   const {login } = useAuth();
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const history = useHistory()


   async function handleSubmit(e){
      e.preventDefault()

      
      try{
         setError("")
         setLoading(true)
         await login(emailRef.current.value, passwordRef.current.value)
         history.push('/')
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
         <Image style={{marginLeft: "auto", width:"100%"}} src={Logo}/>
         <Card>
            <Card.Body>
               <h2 className = "text-center mb-4">Log In</h2>
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
                  <Button style={{background: "#E84F11", border: "#E84F11"}} disabled = {loading} className = "w-100" type="submit">Log In</Button>
               </Form>
            </Card.Body>
         </Card>
         <div className = "w-100 test-center mt-2">
            Need an account? <Link to = "/signup" style={{color: "#E84F11"}} > Sign Up</Link>
         </div>
         </div>
      
      </Container>

   )
}