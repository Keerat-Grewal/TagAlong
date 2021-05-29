import React, { useState, useEffect, useRef } from 'react'
import Navigation from './Navigation'
import { useAuth } from '../contexts/AuthContext'

import { storage} from './Firebase';
import {Container, Form, Image, Row, Card, Modal, Col} from 'react-bootstrap';
import Avatar from '../profile_avatar2.jpg';

import '../styles/profile.css';
import ReactStars from "react-rating-stars-component";


export default function OtherProfile(props) {
   const userInfo = props.location.state.userInfo
   const profilePicture = props.location.state.profilePicture

   const [show, setShow] = useState()

   const [userReviews, setUserReviews] = useState([])


   useEffect(() => {

            const getReviews = async () => {
               const build = []
               const reviews = userInfo.reviews;
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
         }, [])



   const handleClose = () => {
      setShow(false); 
   }
   
   const handleShow = () => (setShow(true))

  
   return (

      <div>
      <Navigation update={() => {}} display={false}/>
         <Container fluid style={{width : "100vw", marginTop: "20px"}}>
            <Row className="justify-content-md-center">
               <Col className="justify-content-md-center">
                  <Container fluid>
                     <Row >
                        <Col xs={3} className="justify-content-md-center">
                           {profilePicture && <Image style={{height: "350px", width: "350px"}} roundedCircle fluid src={profilePicture}></Image>}
                           {!profilePicture && <Image id="avatar" src={Avatar}></Image>}
                     
                        </Col>
                        <Col xs={5} className="justify-content-center" style={{wordWrap: "break-word"}}>
                           <h2 style={{fontFamily: "Verdana"}}>{userInfo.firstName + " " + userInfo.lastName}</h2>
                           <h2 style={{fontFamily: "Verdana", color: "#E84F11", fontSize: "18pt"}}>{"@" + userInfo.username}</h2>
                           {userInfo && <ReactStars
                                 count={5}
                                 value={userInfo.stars}
                                 size={24}
                                 activeColor="#E84F11"
                                 edit={false}
                                 isHalf={true}
                                 />
                                 }
                           <h2 style={{fontFamily: "Verdana", marginTop: "40px"}}>{userInfo.bio}</h2>
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
         </div>
   )
}
