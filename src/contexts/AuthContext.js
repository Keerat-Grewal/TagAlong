import React, { useContext, useEffect, useRef, useState } from 'react'
import {auth} from '../components/Firebase'
import {firestore} from '../components/Firebase'

const AuthContext = React.createContext();

export function useAuth(){
   return useContext(AuthContext)
}

export function AuthProvider({children}){
   const [currentUser, setCurrentUser] = useState()
   const [loading, setLoading] = useState(true)

   function signup(email, password, userName){
      return auth.createUserWithEmailAndPassword(email, password).then(registeredUser => {
         firestore.collection("users").doc(registeredUser.user.uid)
         .set({
           uid: registeredUser.user.uid,
           userName: userName
         })
       })
   }

   function login(email, password){
      return auth.signInWithEmailAndPassword(email, password)
   }

   function logOut(){
      return auth.signOut()
   }

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
         setCurrentUser(user)
         setLoading(false)
      })

      return unsubscribe
   }, [])

   

   const value = {
      currentUser,
      signup,
      login,
      logOut
   }

   
   return (
      <div>
         <AuthContext.Provider value={value}>
            {!loading && children}
         </AuthContext.Provider>
      </div>
   )
}