import React, { useRef, useState} from "react";
import {Button, Form, Col, Modal} from "react-bootstrap";
import Searchbar from "./Searchbar";
import {firestore} from "./Firebase";
import { useAuth } from "../contexts/AuthContext";
import "../styles/ride.css";
import firebase from "firebase/app";
import useGeoLocation from "./Location";

export default function CreateRide() {
   const {currentUser} = useAuth();
   const [showModal, setModal] = useState(false);
   const location = useGeoLocation();
   
   const [formValue, setFormValue] = useState({
      reports: "reports",
      
   });

   const destRef = useRef(null); 
   const reportsRef = firestore.collection("reports");

   const handleClick = () => {
      setModal(false);

      reportsRef.doc(currentUser.uid).set({
         username: formValue.username,
         reports: formValue.reports,
      });
      console.log("CLICKED MODAL");
   };

   const handleHide = () => {
      setModal(false);
   };

   const handleChange = (e) => {
      if(e.target.id === "destination") {
         const currentState = destRef.current;
         console.log("INSIDE destination");
         console.log(currentState);
         setFormValue({ 
               ...formValue, 
               [e.target.id]: currentState.state.name
         });
      }
      else {
         setFormValue({ 
               ...formValue, 
               [e.target.id]: e.target.value
         });
      }
   };
   
   return (
      <>
         <Button id="ride-btn" style={{marginLeft: 10, background: "#E84F11", border: "#E84F11"}} onClick={() => setModal(true)}>
               Report Profile
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
                  Report Form
               </Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form.Group>
                     <Form.Label id="sign-up-text">Report Form</Form.Label>
                     {/* <Form.Control id="destination" type="email" placeholder="Destination" onChange={handleChange} /> */}
                     <Form.Row>
                           
                           
                     </Form.Row>
                     <Form.Control id="username" type="text" placeholder="Enter Username" onChange={handleChange}/>
                     <Form.Control id="reports" type="text" placeholder="Reason for report" onChange={handleChange}/>
                     
                  </Form.Group>
               </Modal.Body>
               <Modal.Footer>
                  <Button style={{background: "#E84F11", border: "#E84F11"}} onClick={handleClick}>Submit</Button>
               </Modal.Footer>
         </Modal>
      </>
   );
}