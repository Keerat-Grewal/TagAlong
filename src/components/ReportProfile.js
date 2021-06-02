import React, {useState, useEffect, useRef} from "react";
import {Button, Form, Col, Modal, Image, Row, Container} from "react-bootstrap";
import Avatar from "../avatar3_clear.png";
import { useAuth } from "../contexts/AuthContext";
import {firestore, storage} from "./Firebase";
import ReactStars from "react-rating-stars-component";
import firebase from "firebase/app";
import  {useHistory } from "react-router-dom";

export default function ReportProfile() {

const {currentUser} = useAuth();
const [showModal, setModal] = useState(false);
const [showUser, setUser] = useState(false);
const [userInfo, setUserInfo] = useState("");
const [formValue, setFormValue] = useState({username: ""});
const [profilePicture, setProfilePicture] = useState(undefined);
const [profilePictureFlag, setProfilePictureFlag] = useState(false);
const [rating, setRating] = useState(0);
const reviewRef = useRef();
const [currentUserReview, setCurrentUserReview] = useState();
const formRef = useRef();
const history = useHistory();

const handleHide = () => {
    setUser("");
    setModal(false);
};

const handleChange = (e) => {
    setFormValue({ 
        ...formValue, 
        [e.target.id]: e.target.value
    });
};

const handleClick = () => {
    //console.log(formValue.username);
    firestore.collection("Report").where("username", "==", formValue.username)
    setUser("")
    setModal(false)
};

useEffect(() => {
    if(userInfo !== "" && setUser) {
        storage.ref("pictures").child(userInfo.ProfilePicture).getDownloadURL().then((temp) => {setProfilePicture(temp);});
        setProfilePictureFlag(true);
    }
}, [userInfo]);

useEffect(() => {
    firestore.collection("users").doc(currentUser.uid).get().then((doc) => {
        if (doc.exists) {
            setCurrentUserReview(doc.data());
        }
        else {
            // doc.data() will be undefined in this case
            console.log("No such document! change bio");
        }
    }
    ).catch((error) => {
        console.log("Error getting document:", error);
    });
}, []);


const ratingChanged = (newRating) => {
    setRating(newRating);
};

const submitReview = (e) => {
    e.preventDefault();
    console.log("value form" + reviewRef.current.value);

    const usersRef = firestore.collection("users");   
    console.log(usersRef);
    const newRating = ((userInfo.stars * userInfo.reviews.length) + rating)/(userInfo.reviews.length + 1);
    console.log(userInfo);
    usersRef.doc(userInfo.uid).update({
        stars : newRating,
        reviews: firebase.firestore.FieldValue.arrayUnion({review: reviewRef.current.value, rating : rating, firstName : currentUserReview.firstName,
            lastName : currentUserReview.lastName,
            timestamp: new Date(),
            username : currentUserReview.username,
            reviewerPic : currentUserReview.ProfilePicture})
    });

    setRating(0);
    formRef.current.reset();
};

return (
    <>
        <Button id="ride-btn" style={{marginLeft: 10, background: "#E84F11", border: "#E84F11"}} onClick={() => setModal(true)}>
            Report Profile<Image style={{height: "25px", width: "35px"}} src={Avatar}></Image>
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
                    Report Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Row>
                        <Col xs={11}>
                            <Form.Control id="username" placeholder="Enter username" onChange={handleChange}></Form.Control>
                            <Form.Control id="username" placeholder="Reason for report" onChange={handleChange}></Form.Control>
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
                            <Form onSubmit={submitReview} ref={formRef}>
                                <Form.Group id="email">
                                    <Form.Control ref = {reviewRef} placeholder="Add a review!" name = "myForm"></Form.Control>
                                </Form.Group>
                                <Button style={{border : "#E84F11", backgroundColor: "#E84F11"}}type="submit" onClick={submitReview}>Submit</Button>
    
                            </Form>
                            <Button  style={{marginTop : "20px", border : "#E84F11", backgroundColor: "#E84F11"}} onClick={() => history.push({
                                pathname : "/otherProfile",
                                state : {
                                    userInfo : userInfo,
                                    profilePicture : profilePicture
                                }
                            })}>See full profile</Button>
                        </Col>
                    </Row>

                </Container>}
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    </>
);
}