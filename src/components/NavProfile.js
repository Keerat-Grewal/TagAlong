import React, {useState} from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap';
import  { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

import {firestore} from './Firebase';

export default function NavProfile() {
   const { currentUser, logOut } = useAuth()
   const [error, setError] = useState("")
   const history = useHistory()
   function goProfile(){
      history.push("/profile")
   }
   
   async function handleLogOut(){
      setError('')

   //    const usersRef = firestore.collection('users').doc(currentUser.uid);
   //    usersRef.get().then((doc) => {
   //       if (doc.exists) {
   //          console.log("Document data:", doc.data().field);
   //       } else {
   //           // doc.data() will be undefined in this case
   //           console.log("No such document!");
   //       }
   //   }).catch((error) => {
   //       console.log("Error getting document:", error);
   //   });
  
      
      try{  
         await logOut()
         history.push('/login')
      }catch(error){
         setError(error.message)
   
      }
   }

   return (
      <div>
         <DropdownButton id="dropdown-basic-button" title="Profile">
         <Dropdown.Item  href="/profile" >Profile</Dropdown.Item>
         <Dropdown.Item href="/">Home</Dropdown.Item>
         <Dropdown.Item onClick = {handleLogOut}>Logout</Dropdown.Item>
         </DropdownButton>
      </div>
   )
}
