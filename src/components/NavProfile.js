import React, {useState, useEffect} from "react";
import {NavDropdown, Image} from "react-bootstrap";
import  { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "../profile_avatar2.jpg";
import {firestore, storage} from "./Firebase";


export default function NavProfile() {
   const { currentUser, logOut } = useAuth();
   const [error, setError] = useState();
   const [rating, setRating] = useState();
   const [isPremium, setPremium] = useState(false);
   const history = useHistory();
   const [profilePicture, setProfilePicture] = useState(Avatar);
   
   console.log(currentUser);

   const usersRef = firestore.collection("users").doc(currentUser.uid);
   useEffect(() => {
      usersRef.get().then((doc) => {
         if (doc.exists) {
            storage.ref("pictures").child(doc.data().ProfilePicture).getDownloadURL().then((temp) => {setProfilePicture(temp);});
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

      usersRef.get().then((doc) => {
         if (doc.exists) {
            setPremium(doc.data().premium);
            setRating(doc.data().stars);
         } 
         else {
            // doc.data() will be undefined in this case
            console.log("No such document! useEffect navprofile");
         }
      }).catch((error) => {
            console.log("Error getting document:", error);
         });

   }, []);

   async function handleLogOut(){
      setError("");

   //    const usersRef = firestore.collection("users").doc(currentUser.uid);
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
         await logOut();
         history.push("/login");
      }catch(error1){
         setError(error1.message);
         console.log(error);
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
      
         {isPremium && <NavDropdown.Item href = "Profile">You are premium</NavDropdown.Item>}
         <NavDropdown.Item href = "Profile">Profile</NavDropdown.Item>
         <NavDropdown.Item href = "/">Home</NavDropdown.Item>
         {!isPremium && rating >= 4 &&  <NavDropdown.Item href = "Premium">Apply for premium</NavDropdown.Item>}
        
         <NavDropdown.Item onClick = {handleLogOut}>Logout</NavDropdown.Item>
      </NavDropdown> 
      </div>
   );
}
