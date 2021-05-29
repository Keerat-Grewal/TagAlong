import React, { useState, useEffect, useRef } from 'react'
import Navigation from './Navigation'
import { useAuth } from '../contexts/AuthContext'

import {firestore, storage} from './Firebase';
import { Button, Container, Form, Image, Row, Card, Modal, Col} from 'react-bootstrap';
import Avatar from '../profile_avatar2.jpg';
import { set } from 'ol/transform';
import '../styles/profile.css';
import ReactStars from "react-rating-stars-component";
import { connect } from 'net';

export default function Profile() {
   const { currentUser} = useAuth()

   const formRef1 = useRef()
   const bioRef = useRef()
   const inputRef = useRef()

   const [bio, setBio] = useState("")
   const [firstName, setFirstName] = useState()
   const [lastName, setLastName] = useState()
   const [showSubmit, setShowSubmit] = useState(false)
   const [show, setShow] = useState()
   const [userName, setUserName] = useState()
   const [profilePicture, setProfilePicture] = useState(undefined)
   const [profilePictureFlag, setProfilePictureFlag] = useState(false)
   const [previewPic, setPreviewPic] = useState(undefined)
   const [profilePictureUrl, setProfilePictureUrl] = useState()
   const [userInfo, setUserInfo] = useState()
   const [userReviews, setUserReviews] = useState([])

   const usersRef = firestore.collection('users').doc(currentUser.uid);

   function changeBio(){
      usersRef.get().then((doc) => {
         if (doc.exists && bio !== "") {
            console.log("Inside real bio")
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
            console.log(doc.data())
            setUserInfo(doc.data())
            setBio(doc.data().bio)
            setFirstName(doc.data().firstName)
            setLastName(doc.data().lastName)
            setUserName(doc.data().username)
            storage.ref('pictures').child(doc.data().ProfilePicture).getDownloadURL().then((temp) => {setProfilePicture(temp);
                                                         setPreviewPic(temp)})
            setProfilePictureFlag(true)

            const getReviews = async () => {
               const build = []
               //const link = await storage.ref('pictures').child("IMG").getDownloadURL();
               const reviews = doc.data().reviews;
               for(let i in reviews) {
                  console.log(reviews[i])
                  const curr_review = reviews[i]
                  const link = await storage.ref('pictures').child(curr_review.reviewerPic).getDownloadURL();
                  build.push({
                     id : curr_review.username,
                     review : curr_review.review,
                     picture : link,
                     rating : curr_review.rating,
                     firstName : curr_review.firstName,
                     lastName : curr_review.lastName,
                     username : curr_review.username
                  });
               }
               setUserReviews(build)
            }
            getReviews()
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
         if (doc.exists) {
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
                        <Col xs={5} className="justify-content-center" style={{wordWrap: "break-word"}}>
                           <h2 style={{fontFamily: "Verdana"}}>{firstName + " " + lastName}</h2>
                           <h2 style={{fontFamily: "Verdana", color: "#E84F11", fontSize: "18pt"}}>{"@" + userName}</h2>
                           {userInfo && <ReactStars
                                 count={5}
                                 value={userInfo.stars}
                                 size={24}
                                 activeColor="#E84F11"
                                 edit={false}
                                 isHalf={true}
                                 />
                                 }
                           <h2 style={{fontFamily: "Verdana", marginTop: "40px"}}>{bio}</h2>
                        </Col>
                        <Col xs={4}>
                           {userInfo && <h2 style={{fontFamily: "Verdana", fontSize: "18pt"}}>{"Ratings & Reviews (" + 
                                 userInfo.reviews.length + ")"}</h2>}
                           <flexContainer id="reviewsBox">
                              {userReviews.map((temp, index) => {
                                    return (
                                    <div key={index}>
                                       <Card>
                                          <Card.Body>
                                             <Container >
                                                <Row>
                                                   <Col xs={2}>                                                  
                                                      <Image style={{height: "50px", width: "50px", marginRight:"5px"}} roundedCircle src={temp.picture}></Image>   
                                                   </Col>
                                                   <Col>
                                                      <div>
                                                         {temp.firstName + " " + temp.lastName}
                                                      </div>
                                                      <div style={{fontFamily: "Verdana", color: "#E84F11"}}>
                                                         {"@" + temp.username}
                                                      </div>
                                                   </Col>
                                                </Row>
                                                <Row>
                                                   <ReactStars
                                                         count={5}
                                                         value={temp.rating}
                                                         size={24}
                                                         activeColor="#E84F11"
                                                         edit={false}
                                                         isHalf={true}
                                                      />
                                                </Row>
                                                <div style={{marginLeft : "-12px", wordWrap: "break-word"}}>
                                                   {temp.review}
                                                </div>
                                          
                                             </Container>
                                          </Card.Body>
                                    
                                       {/* <Row >
                                          <Col style={{wordWrap: "break-word"}}>
                                             {temp.review}
                                          </Col>
                                       </Row> */}
                                    </Card>
                                 </div>
                           

                              )})}
                           </flexContainer>
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
