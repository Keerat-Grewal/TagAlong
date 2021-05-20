import React, { useState, useEffect, useRef } from 'react'
import Navigation from './Navigation'
import { useAuth } from '../contexts/AuthContext'

import {firestore, storage} from './Firebase';
import { Button, Form } from 'react-bootstrap';


export default function Profile() {
   const bioRef = useRef()
   const formRef = useRef()
   const { currentUser} = useAuth() 
   var a;

   
    

   
   const [bio, setBio] = useState(a)


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

   useEffect(() => {  const usersRef = firestore.collection('users').doc(currentUser.uid);
   usersRef.get().then((doc) => {
      if (doc.exists) {
         console.log(doc.data().username)
         console.log(doc.data().bio)
         setBio(doc.data().bio)
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




   function handleSubmit(e){
      e.preventDefault()
      setBio(bioRef.current.value)
      console.log(bioRef.name)
      formRef.current.reset()
   }


   return (
      <div>
         <Navigation canCreate = {false} canSearch = {false}/>

         <h5 className="mb-0">Your Bio</h5>
         <div className="p-4 rounded shadow-sm bg-light">
            <p className="font-italic mb-0">{bio}</p>
         </div>

         <Form  onSubmit= {handleSubmit} ref = {formRef}>
            <Form.Group id="email">
               <Form.Label>Add Bio</Form.Label>
               <Form.Control ref = {bioRef} name = "myForm"></Form.Control >
            </Form.Group>
            <Button style={{background: "#E84F11", border: "#E84F11"}}  type="submit">Add bio</Button>
         </Form>

      </div>
   )
}
