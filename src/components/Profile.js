import React, { useState, useEffect, useRef } from 'react'
import Navigation from './Navigation'
import { useAuth } from '../contexts/AuthContext'

import {firestore, storage} from './Firebase';
import { Button, Container, Form, Image, Row, Card, Modal, Col } from 'react-bootstrap';
import Avatar from '../profile_avatar2.jpg';
import { set } from 'ol/transform';


export default function Profile() {
   const { currentUser} = useAuth()

   const formRef1 = useRef()
   const bioRef = useRef()
   const [bio, setBio] = useState("")

   const inputRef = useRef()
   const [name, setName] = useState()
   const [showSubmit, setShowSubmit] = useState(false)

   const [show, setShow] = useState()
   const [userName, setUserName] = useState()

   const [profilePicture, setProfilePicture] = useState(undefined)
   const [profilePictureFlag, setProfilePictureFlag] = useState(false)

   const [profilePictureUrl, setProfilePictureUrl] = useState()
   
   const usersRef = firestore.collection('users').doc(currentUser.uid);
   function changeBio(){
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


   useEffect(() => {
      usersRef.get().then((doc) => {
         if (doc.exists) {
            setBio(doc.data().bio)
            setName(doc.data().name)
            console.log("HERE", doc.data().username)
            setUserName(doc.data().username)
            var a = storage.ref('pictures').child(doc.data().ProfilePicture)
            var b = a.getDownloadURL().then((temp) => {setProfilePicture(temp)})
            setProfilePictureFlag(true)
            setProfilePicture(b)
         } 
         else {
            // doc.data() will be undefined in this case
                 console.log("No such document!");
         }
      }).catch((error) => {
         console.log("Error getting document:", error);
   });

   }, [])

   useEffect(() => {
      console.log("bio is ", bio)
      changeBio(bio)
   }, [bio])

   useEffect(() => {
      changeName(name)
   }, [name])



   const handleClose = () => {
      setShow(false); 
      setShowSubmit(false)
   }
   
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

   const onImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
         let img = e.target.files[0];
         setProfilePicture(URL.createObjectURL(img))
         setProfilePictureFlag(true)
         setProfilePictureUrl(img)
         setShowSubmit(true)
      }
   }

   const uploadPicture = () => {
      const uploadTask = storage.ref(`pictures/${profilePictureUrl.name}`).put(profilePictureUrl);
      console.log("uploading this" + profilePictureUrl)
      uploadTask.on(
         "state_changed ",
         snap_shot => {},
         error => {console.log(error)
         },

         () => {
            storage.ref("pictures").child(profilePictureUrl.name).getDownloadURL().then(url => console.log(url))
         }

      )
      usersRef.get().then((doc) => {
         if (doc.exists && bio !== "") {
            usersRef.set({
               ProfilePicture : profilePictureUrl.name
            }, { merge: true })
            // setBio("This is bio lmao")
         } else {
               // doc.data() will be undefined in this case
               console.log("No such document!");
         }
      }).catch((error) => {
         console.log("Error getting document:", error);

      });
      setShowSubmit(false)
   }

   return (
      <div>
         <Navigation update={() => {}} display={false}/>
            
         <Container fluid style={{width : "100vw"}}>
            <Row className="justify-content-md-center text-center">
               <Col className="justify-content-md-center">
                  <Card>
                     <Card.Body>
                        <Container fluid >
                           {profilePictureFlag && <Image fluid roundedCircle src={profilePicture}></Image>}
                           {!profilePictureFlag && <Image id="avatar" src={Avatar}></Image>}
                        </Container>
                           <h2  style={{fontFamily: "Verdana"}}>{userName}</h2>
                           
                           <h2 style={{fontFamily: "Verdana"}}>{bio}</h2>
                        
                           <Button onClick={handleShow}>Edit </Button>
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
            
            
               <Container className="justify-content-md-center text-center">
                  <div>
                  {profilePictureFlag && <Image onClick = {() => inputRef.current.click()} style={{   height: "80px", width: "80px"}} fluid roundedCircle src={profilePicture}></Image>}
                  {!profilePictureFlag && <Image id="avatar" src={Avatar}></Image>}
                  </div>
                  {showSubmit && <Button onClick = {uploadPicture}> Submit Picture</Button>}
               </Container>
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


         <input style = {{display : "none"}} ref = {inputRef} type = "file" name = "profilePicture" onChange={onImageChange}></input>

         {/* <Image src = {profilePicture}></Image> */}

      </div>
   )
}
