
import React, {useRef, useState} from "react";
import {Alert, Card, Button, Form, Container, Image} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import  { Link, useHistory } from "react-router-dom";
import Logo from "../logo_3.png";
import Background from "../background_3.jpeg";

export default function Login(){
   const emailRef = useRef();
   const passwordRef = useRef();
   const {login } = useAuth();
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const history = useHistory();


   async function handleSubmit(e){
      e.preventDefault();

      
      try{
         setError("");
         setLoading(true);
         await login(emailRef.current.value, passwordRef.current.value);
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
         //backgroundImage: `url(${Background})`
      }}>

        <div className="w-100" style = {{maxWidth : "500px"}}>
           
            <Image style={{marginLeft: "auto", width:"100%"}} src={Logo}/>
            <Card style={{background: "#F2F2F2"}}>
               <Card.Body>
                  <h2 className = "text-center mb-4" style={{fontFamily: "Verdana"}}>Login</h2>
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
                  <div className = "w-100 test-center mt-2">
                     Need an account? <Link to = "/signup" style={{color: "#E84F11"}} > Sign Up</Link>
                  </div>
                  
               </Card.Body>
               
            </Card>

         </div>
         
      </Container>
   );
      
}
