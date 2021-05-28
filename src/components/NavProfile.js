import React, {useState, useEffect} from 'react'
import {Navbar, Nav, Form, FormControl, Button, NavDropdown, Image, NavItem} from 'react-bootstrap'
import  { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Avatar from '../profile_avatar2.jpg';
import {firestore, storage} from './Firebase';

export default function NavProfile() {
   const { currentUser, logOut } = useAuth()
   const [error, setError] = useState()
   const history = useHistory()
   const [profilePicture, setProfilePicture] = useState(Avatar)
   
   function goProfile(){
      history.push("/profile")
   }

   const usersRef = firestore.collection('users').doc(currentUser.uid)
   useEffect(() => {
      usersRef.get().then((doc) => {
         if (doc.exists) {
            storage.ref('pictures').child(doc.data().ProfilePicture).getDownloadURL().then((temp) => {setProfilePicture(temp);})
            // setProfilePicture(b)
            // setPreviewPic(b)
         } 
         else {
            // doc.data() will be undefined in this case
            console.log("No such document! useEffect navprofile");
         }
      }).catch((error) => {
            console.log("Error getting document:", error);
         });

   }, [])

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
         {/* <Dropdown>
      <Dropdown.Toggle variant = "danger" id="dropdown-basic">
         Profile
      </Dropdown.Toggle>
         <Dropdown.Menu>
         <Dropdown.Item  href="/profile" >Profile</Dropdown.Item>
         <Dropdown.Item href="/">Home</Dropdown.Item>
         <Dropdown.Item onClick = {handleLogOut}>Logout</Dropdown.Item>
         </Dropdown.Menu>
         </Dropdown> */}

      <NavDropdown alignRight title={<Image id="avatar" src={profilePicture} roundedCircle />}>
         {/* <NavDropdown.Item id="profile-name">{name}</NavDropdown.Item>
         <NavDropdown.Divider/>
         <NavDropdown.Item active id="logout" onClick={this.props.logout}>Logout</NavDropdown.Item> */}
      
        
         <NavDropdown.Item href = "Profile">Profile</NavDropdown.Item>
         <NavDropdown.Item href = "/">Home</NavDropdown.Item>
        
         <NavDropdown.Item onClick = {handleLogOut}>Logout</NavDropdown.Item>
      </NavDropdown> 
      </div>
   )
}
