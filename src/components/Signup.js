
import React, {useRef, useState} from 'react'
import {Alert, Card, Button, Form, FormControl, Container, Image} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import Logo from '../Logo2.png';
import Background from '../background_3.jpeg'

export default function Signup(){
   const emailRef = useRef();
   const passwordRef = useRef();
   const passwordConfirmRef = useRef();
   const userNameRef = useRef();
   const {signup, currentUser } = useAuth();
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const history = useHistory()

   async function handleSubmit(e){
      e.preventDefault()
      if(passwordRef.current.value !== passwordConfirmRef.current.value){
         return setError("Passwords do not match");
      }  
      
      try{
         setError("")
         setLoading(true)
         await signup(emailRef.current.value, passwordRef.current.value, userNameRef.current.value)
         history.push('/')
      } catch(error){
         console.log(error);
         setError(error.message)
      }
      setLoading(false)
   }

   return (

      <Container fluid className = "d-flex align-items-center justify-content-center"
      style={{         
         backgroundPosition: 'center',
         backgroundSize: 'cover',
         backgroundRepeat: 'no-repeat',
         width: '100vw',
         height: '100vh',
         backgroundImage: `url(${Background})`}}>
         <div className="w-100" style = {{maxWidth : "400px"}}>
            <Image style={{marginLeft: "auto", width:"100%"}} src={Logo}/>
            <Card>
               <Card.Body>
                  <h2 className = "text-center mb-4">Sign Up</h2>
                  {currentUser && currentUser.email}
                  {error && <Alert variant = "danger"> {error} </Alert>}
                  <Form onSubmit={handleSubmit}>
                     <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type = "email" ref={emailRef} required></Form.Control>
                     </Form.Group>
                     <Form.Group id="username">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control ref={userNameRef} required></Form.Control>
                     </Form.Group>                  
                     <Form.Group id="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type = "password" ref={passwordRef} required></Form.Control>
                     </Form.Group>
                     <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type = "password" ref={passwordConfirmRef} required></Form.Control>
                     </Form.Group>
                     <Button style={{background: "#E84F11", border: "#E84F11"}} disabled = {loading} className = "w-100" type="submit">Sign up</Button>
                  </Form>
                  <div className = "w-100 test-center mt-2">
                     Already have an account? <Link to="/login" style={{color: "#E84F11"}} > Log In</Link>
                  </div>
               </Card.Body>
            </Card>
         </div>
      
      </Container>

   )
}