import React, { useState, useEffect, useRef } from 'react'
import Navigation from './Navigation'
import { useAuth } from '../contexts/AuthContext'

import {firestore, storage} from './Firebase';
import { Button, Container, Form, Image, Row, Card, Modal, Col } from 'react-bootstrap';
import Avatar from '../profile_avatar2.jpg';


export default function Profile() {
   const { currentUser} = useAuth()

   const formRef1 = useRef()
   const bioRef = useRef()
   const [bio, setBio] = useState("")

   const formRef2 = useRef()
   const nameRef = useRef()
   const [name, setName] = useState()

   const [show, setShow] = useState()
   const [userName, setUserName] = useState()

   function changeBio(){
      const usersRef = firestore.collection('users').doc(currentUser.uid);
      usersRef.get().then((doc) => {
         if (doc.exists && bio !== "") {
            usersRef.set({
               bio : bio
            }, { merge: true })
            // setBio("This is bio lmao")
         } else {
               // doc.data() will be undefined in this case
               console.log("No such document!");
         }
      }).catch((error) => {
         console.log("Error getting document:", error);

      });
   }

   function changeName(){
      const usersRef = firestore.collection('users').doc(currentUser.uid);
      usersRef.get().then((doc) => {
         if (doc.exists && bio !== "") {
            usersRef.set({
               name : name
            }, { merge: true })
            // setBio("This is bio lmao")
         } else {
               // doc.data() will be undefined in this case
               console.log("No such document!");
         }
      }).catch((error) => {
         console.log("Error getting document:", error);

      });
   }


   useEffect(() => {  const usersRef = firestore.collection('users').doc(currentUser.uid);
   usersRef.get().then((doc) => {
      if (doc.exists) {
         setBio(doc.data().bio)
         setName(doc.data().name)
         console.log("HERE", doc.data().username)
         setUserName(doc.data().username)
      } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
      }
   }).catch((error) => {
      console.log("Error getting document:", error);

   });}, [])

   useEffect(() => {
      console.log("bio is ", bio)
      changeBio(bio)
   }, [bio])

   useEffect(() => {
      changeName(name)
   }, [name])



   const handleClose = () => (setShow(false))
   const handleShow = () => (setShow(true))

   function handleSubmit(e){
      e.preventDefault()
      if(bioRef.current.value !== ""){   
         if(bioRef.current.value !== bio){ 
            setBio(bioRef.current.value)
            formRef1.current.reset()
         }
      }

      handleClose()
      // console.log(bioRef.name)

   }


   return (
      <div>
         <Navigation update={() => {}} display={false}/>
            
         <Container fluid style={{width : "100vw"}}>
            <Row className="justify-content-md-center">
               <Col className="justify-content-md-center">
                  <Card>
                     <Card.Body>
                        <Container fluid >
                           <Image id="avatar" src={Avatar}></Image>
                        </Container>
                           <h2  style={{fontFamily: "Verdana"}}>{userName}</h2>
                           
                           <h2 style={{fontFamily: "Verdana"}}>{bio}</h2>
                        
                           <Button onClick={handleShow}>Edit shits</Button>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         </Container>


         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form  onSubmit= {handleSubmit} ref = {formRef1}>
                  <Form.Group id="email">
                     <Form.Label>Add Bio</Form.Label>
                     <Form.Control ref = {bioRef}  placeholder="Say something about yourself!" name = "myForm"></Form.Control >
                     </Form.Group>
               </Form>               
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary" onClick={handleSubmit}>
                  Save Changes
               </Button>
            </Modal.Footer>
         </Modal>


      </div>
   )
}
