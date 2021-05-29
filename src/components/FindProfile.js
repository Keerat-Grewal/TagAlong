import React, {useState, useEffect, useRef} from 'react';
import {Button, Form, Col, Modal, Image, Row, Container} from 'react-bootstrap';
import Avatar from '../avatar3_clear.png';
import { useAuth } from '../contexts/AuthContext';
import {firestore, storage} from './Firebase';
import ReactStars from "react-rating-stars-component";
import firebase from 'firebase/app'

export default function FindProfile() {

    const {signup, currentUser} = useAuth();
    const [showModal, setModal] = useState(false);
    const [showUser, setUser] = useState(false);
    const [showError, setError] = useState(false);
    const [userInfo, setUserInfo] = useState('');
    const [formValue, setFormValue] = useState({username: ""});
    const [profilePicture, setProfilePicture] = useState(undefined);
    const [profilePictureFlag, setProfilePictureFlag] = useState(false);
    const [rating, setRating] = useState(0)
    const reviewRef = useRef()
    const [reviews, setReviews] = useState([])

    const handleHide = () => {
        setUser("")
        setModal(false);
    }

    const handleChange = (e) => {
        setFormValue({ 
            ...formValue, 
            [e.target.id]: e.target.value
        });
    }

    const handleClick = () => {
        //console.log(formValue.username);
        firestore.collection("users").where("username", "==", formValue.username)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    setUser(true);

                    setUserInfo(doc.data());
                    setReviews(doc.data().reviews)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                setUser(false);
            });
    }


    useEffect(() => {
        // usersRef.get().then((doc) => {
        //    if (doc.exists) {
        //       setBio(doc.data().bio)
        //       setFirstName(doc.data().firstName)
        //       setLastName(doc.data().lastName)
        //       setUserName(doc.data().username)
        //       storage.ref('pictures').child(doc.data().ProfilePicture).getDownloadURL().then((temp) => {setProfilePicture(temp);
        //                                                    setPreviewPic(temp)})
        //       setProfilePictureFlag(true)
        //       // setProfilePicture(b)
        //       // setPreviewPic(b)
        //    } 
        //    else {
        //       // doc.data() will be undefined in this case
        //       console.log("No such document! useEffect");
        //    }
        // }).catch((error) => {
        //       console.log("Error getting document:", error);
        //    });
        if(userInfo !== '' && setUser) {
            storage.ref('pictures').child(userInfo.ProfilePicture).getDownloadURL().then((temp) => {setProfilePicture(temp);});
            setProfilePictureFlag(true);
        }
     }, [userInfo])

     const ratingChanged = (newRating) => {
      setRating(newRating)
      setRating(((userInfo.Stars * userInfo.reviews.length) + newRating)/(userInfo.reviews.length + 1))

     }

   //   useEffect(() => {
   //       const usersRef = firestore.collection('users').doc(userInfo.uid);
            
   //       usersRef.get().then((doc) => {
   //          if (doc.exists) {
   //             usersRef.set({
   //                Stars : rating,
   //                reviews : reviews
   //             }, { merge: true })
   //             // setBio("This is bio lmao")
   //          } else {
   //                // doc.data() will be undefined in this case
   //                console.log("No such document! FIND PROFILE");
   //          }
   //       }).catch((error) => {
   //             console.log("Error getting document:", error);
   //          });
   //          console.log(reviews)
   //       },
   //       [reviews.length])

     const submitReview = (e) => {
         e.preventDefault()
         console.log("value form" + reviewRef.current.value)
         
         // setReviews(reviews => {return [...reviews, {
         //    id : reviews.length,
         //    value : reviewRef.current.value
         // }]})

         const usersRef = firestore.collection('users').doc(userInfo.uid);   
         const newRating = ((userInfo.Stars * userInfo.reviews.length) + rating)/(userInfo.reviews.length + 1)
         console.log((userInfo.Stars * userInfo.reviews.length) + rating)
         console.log(userInfo.Stars)
         console.log(userInfo.reviews.length)
         console.log((userInfo.reviews.length + 1))
         usersRef.update({
            Stars : newRating,
            reviews: firebase.firestore.FieldValue.arrayUnion({review: reviewRef.current.value, rating : rating, firstName : userInfo.firstName,
               lastName : userInfo.lastName,
               timestamp: new Date(),
               username : userInfo.userName})
        });
         // const usersRef = firestore.collection('users').doc(userInfo.uid)
         // usersRef.get().then((doc) => {
         //    if (doc.exists) {
         //       usersRef.set({
         //          Stars : rating,
         //          reviews : reviews
         //       }, { merge: true })
         //       // setBio("This is bio lmao")
         //    } else {
         //          // doc.data() will be undefined in this case
         //          console.log("No such document! FIND PROFILE");
         //    }
         // }).catch((error) => {
         //       console.log("Error getting document:", error);
         //    });
         setRating(0)
     }

    return (
        <>
            <Button id="ride-btn" style={{marginLeft: 10, background: "#E84F11", border: "#E84F11"}} onClick={() => setModal(true)}>
                Find Profile<Image style={{height: "25px", width: "35px"}} src={Avatar}></Image>
            </Button>
            <Modal
                show={showModal}
                onHide={handleHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header onClick={handleHide} closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Find Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Row>
                            <Col xs={11}>
                                <Form.Control id="username" placeholder="Enter username" onChange={handleChange}></Form.Control>
                            </Col>
                            
                            <Col xs={1}>
                                <Button style={{background: "#E84F11", border: "#E84F11"}} type="submit" id="destination" onClick={handleClick}>&#10003;</Button>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                </Modal.Body>
                {showUser && profilePictureFlag && 
                    <Container fluid>
                        <Row>
                            <Col xs={6}>
                                <Image style={{marginLeft: "10px", marginBottom: "10px", height: "350px", width: "350px"}} roundedCircle fluid src={profilePicture}></Image>
                            </Col>
                            <Col xs={6}>
                                <h2 style={{fontFamily: "Verdana"}}>{userInfo.firstName + " " + userInfo.lastName}</h2>
                                <h2 style={{fontFamily: "Verdana", color: "#E84F11", fontSize: "18pt"}}>{"@" + userInfo.username}</h2>
                                <h2 style={{fontFamily: "Verdana", marginTop: "40px", wordWrap: "break-word", fontSize: "12pt"}}>{userInfo.bio}</h2>
                             
                                 <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={24}
                                    activeColor="#E84F11"
                                 />
                                 <Form onSubmit={submitReview} >
                                    <Form.Group id="email">
                                       <Form.Control ref = {reviewRef} placeholder="Add a review!" name = "myForm"></Form.Control>
                                    </Form.Group>
                                 </Form>
         
                            </Col>
                        </Row>

                    </Container>}
                {/* {!showUser && <p> User does not exist! </p>} */}
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
}