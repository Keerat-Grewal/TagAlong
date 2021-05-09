import React, {useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import {Alert, Card, Button, Form, FormControl, Container} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'

import {firestore} from './Firebase';

export default function Logout() {

   const { currentUser, logOut } = useAuth()
   const [error, setError] = useState("")
   const history = useHistory()

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
         <Button variant = "link" style={{color: "#E84F11"}} onClick = {handleLogOut}>Log Out</Button> 
      </div>
   )
}
