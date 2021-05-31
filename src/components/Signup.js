
import React, {useRef, useState} from "react";
import {Alert, Card, Button, Form, Container, Image, Col} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import {Link, useHistory} from "react-router-dom";
import Logo from "../logo_3.png";
import Background from "../background_3.jpeg";

export default function Signup(){
   const emailRef = useRef();
   const passwordRef = useRef();
   const passwordConfirmRef = useRef();
   const userNameRef = useRef();
   const {signup, currentUser } = useAuth();
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const history = useHistory();
   const firstNameRef = useRef();
   const lastNameRef = useRef();

   async function handleSubmit(e){
      e.preventDefault();
      if(passwordRef.current.value !== passwordConfirmRef.current.value){
         return setError("Passwords do not match");
      }  
      
      
      try{
         setError("");
         setLoading(true);
         await signup(emailRef.current.value, passwordRef.current.value, userNameRef.current.value, 
            firstNameRef.current.value, lastNameRef.current.value);
         history.push("/");
      } catch(error){
         console.log(error);
         setError(error.message);
      }
      setLoading(false);
   }

   return (

      <Container fluid className = "d-flex align-items-center justify-content-center"
      style={{         
         backgroundPosition: "center",
         backgroundSize: "cover",
         backgroundRepeat: "no-repeat",
         width: "100vw",
         height: "100vh",
         backgroundImage: `url(${Background})`}}>
         <div className="w-100" style = {{maxWidth : "400px"}}>
            <Image style={{marginLeft: "auto", width:"100%"}} src={Logo}/>
            <Card style={{background: "#F2F2F2"}}>
               <Card.Body>
                  <h2 className = "text-center mb-4" style={{fontFamily: "Verdana"}}>Sign Up</h2>
                  {currentUser && currentUser.email}
                  {error && <Alert variant = "danger"> {error} </Alert>}
                  <Form onSubmit={handleSubmit}>
                     <Form.Group id = "name">
                        <Form.Row>
                           <Col>
                              <Form.Label>First Name</Form.Label>
                              <Form.Control type = "text" ref={firstNameRef} required></Form.Control>
                           </Col>   
                           <Col>
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control type = "text" ref={lastNameRef} required></Form.Control>
                           </Col>   
                        </Form.Row> 

                     </Form.Group>
                     <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type = "email" ref={emailRef} required></Form.Control>
                     </Form.Group>
                     <Form.Group id="username">
                        <Form.Label>Username</Form.Label>
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
   );
}