import React, { useState, useEffect, useRef } from 'react'
import Navigation from './Navigation'
import { useAuth } from '../contexts/AuthContext'

import {firestore, storage} from './Firebase';
import { Button, Container, Form, Image, Row, Card, Modal, Col} from 'react-bootstrap';
import Avatar from '../profile_avatar2.jpg';
import { set } from 'ol/transform';
import '../styles/profile.css';
import ReactStars from "react-rating-stars-component";

export default function Profile() {
   const { currentUser} = useAuth()

   const formRef1 = useRef()
   const bioRef = useRef()
   const [bio, setBio] = useState("")

   const inputRef = useRef()
   const [firstName, setFirstName] = useState()
   const [lastName, setLastName] = useState()

   const [showSubmit, setShowSubmit] = useState(false)

   const [show, setShow] = useState()
   const [userName, setUserName] = useState()

   const [profilePicture, setProfilePicture] = useState(undefined)
   const [profilePictureFlag, setProfilePictureFlag] = useState(false)
   const [previewPic, setPreviewPic] = useState(undefined)

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
               console.log("No such document! change bio");
         }
      }).catch((error) => {
         console.log("Error getting document:", error);

      });
   }

   useEffect(() => {
      usersRef.get().then((doc) => {
         if (doc.exists) {
            setBio(doc.data().bio)
            setFirstName(doc.data().firstName)
            setLastName(doc.data().lastName)
            setUserName(doc.data().username)
            storage.ref('pictures').child(doc.data().ProfilePicture).getDownloadURL().then((temp) => {setProfilePicture(temp);
                                                         setPreviewPic(temp)})
            setProfilePictureFlag(true)
            // setProfilePicture(b)
            // setPreviewPic(b)
         } 
         else {
            // doc.data() will be undefined in this case
            console.log("No such document! useEffect");
         }
      }).catch((error) => {
            console.log("Error getting document:", error);
         });

   }, [])

   useEffect(() => {
      changeBio(bio)
   }, [bio])


   const handleClose = () => {
      setShow(false); 
      setShowSubmit(false)
      setPreviewPic(profilePicture)
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
         // setProfilePicture(URL.createObjectURL(img))
         setPreviewPic(URL.createObjectURL(img))
         setProfilePictureFlag(true)
         setProfilePictureUrl(img)
         setShowSubmit(true)
      }
   }

   const uploadPicture = () => {      
      const uploadTask = storage.ref(`pictures/${profilePictureUrl.name}`).put(profilePictureUrl);
      // console.log("uploading this" + profilePictureUrl)
      uploadTask.on(
         "state_changed ",
         snap_shot => {},
         error => {console.log(error)
         },

         () => {
            storage.ref("pictures").child(profilePictureUrl.name).getDownloadURL().then(setProfilePicture(previewPic))
         }
      )
      usersRef.get().then((doc) => {
         if (doc.exists && bio !== "") {
            usersRef.set({
               ProfilePicture : profilePictureUrl.name
            }, { merge: true })
         } else {
               console.log("No such document! uploadPicture");
         }
      }).catch((error) => {
         console.log("Error getting document:", error);

      });
      setShowSubmit(false)
   }

   return (
      <div>
         <Navigation update={() => {}} display={false}/>
            
         <Container fluid style={{width : "100vw", marginTop: "20px"}}>
            <Row className="justify-content-md-center">
               <Col className="justify-content-md-center">
                  <Container fluid>
                     <Row >
                        <Col xs={3} className="justify-content-md-center">
                           {profilePictureFlag && <Image style={{height: "350px", width: "350px"}} roundedCircle fluid src={profilePicture}></Image>}
                           {!profilePictureFlag && <Image id="avatar" src={Avatar}></Image>}
                           <Button fluid style={{width : "200px", marginLeft:"65px", marginTop:"10px", background: "#E84F11", border: "#E84F11"}}onClick={handleShow}>Edit Profile</Button>
                        </Col>
                        <Col xs={9} className="justify-content-md-center" style={{wordWrap: "break-word"}}>
                           <h2 style={{fontFamily: "Verdana"}}>{firstName + " " + lastName}</h2>
                           <h2 style={{fontFamily: "Verdana", color: "#E84F11", fontSize: "18pt"}}>{"@" + userName}</h2>
                           <h2 style={{fontFamily: "Verdana", marginTop: "40px"}}>{bio}</h2>
                        </Col>
                     </Row>
                     <Row >
                        <Col xs={3} className="justify-content-md-center">
                        </Col>
                        <Col xs={9} className="justify-content-md-center" style={{wordWrap: "break-word"}}>
                           {/* need to figure out how many stars will be checked */}
                           {/* <span className="fa fa-star checked"></span>
                           <span className="fa fa-star checked"></span>
                           <span className="fa fa-star checked"></span>
                           <span className="fa fa-star"></span>
                           <span className="fa fa-star"></span> */}
                             <ReactStars
                                 count={5}
                                 value={4}
                                 size={24}
                                 activeColor="#ffd700"
                                 edit={false}/>,

                           <h2 style={{fontFamily: "Verdana"}}>{"Ratings/Reviews"}</h2>
                           {/* need to add the actual reviews here */}
                        </Col>
                     </Row>
                  </Container>
               </Col>
            </Row>
         </Container>


         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Edit Personal Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Container className="justify-content-md-center text-center">
                  <div>
                  {profilePictureFlag && <Image onClick = {() => inputRef.current.click()} style={{height: "80px", width: "80px"}} fluid roundedCircle src={previewPic}></Image>}
                  {!profilePictureFlag && <Image onClick = {() => inputRef.current.click()} id="avatar" src={Avatar}></Image>}
                  </div>
                  {showSubmit && <Button onClick = {uploadPicture}> Submit Picture</Button>}
                  <div>
                  {/* <Button onClick = {removePicture}> Submit Picture</Button> */}
                  </div>
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
