import React, {useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import {Alert, Card, Button, Form, FormControl, Container} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'



export default function Logout() {

   const { currentUser, logOut } = useAuth()
   const [error, setError] = useState("")
   const history = useHistory()

   async function handleLogOut(){
      setError('')
   
      try{  
         console.log("TRYING")
         await logOut()
         history.push('/login')
      }catch(error){
         setError(error.message)
   
      }
   }

   return (
      <div>
         <Button variant = "link" onClick = {handleLogOut}>Log Out</Button> 
      </div>
   )
}
