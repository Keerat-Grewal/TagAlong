import React from 'react'
import Navigation from './Navigation'
import SimpleMap from './SimpleMap'
import Chat from './Chat'
import OLMapFragment from './SimpleMap'
import GoogleMap from './GoogleMap'

export default function MainContent() {
   return (
    <div className="App">
      
      <Navigation></Navigation>
      <GoogleMap></GoogleMap>
      <Chat></Chat>
    </div>
   )
}



