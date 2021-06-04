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
               Meet our Team!
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
                  Meet our Team!
               </Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form.Group>
                        
                     <Form.Row>
                     <label>Keerat Grewel</label> 
                     </Form.Row>
                     <Form.Row>
                     <label>Brandon Burana</label>
                     </Form.Row>
                     <Form.Row>
                     <label>Ishaan Karvir</label>
                     </Form.Row>
                     <Form.Row>
                     <label>Jack Nelson</label>
                     </Form.Row>
                    
                  </Form.Group>
               </Modal.Body>
               <Modal.Footer>
                  
               </Modal.Footer>
         </Modal>
      </>
   );
}