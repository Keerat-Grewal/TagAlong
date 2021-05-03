import React from 'react'
import Navigation from './Navigation'
import SimpleMap from './SimpleMap'
import Chat from './Chat'
import OLMapFragment from './SimpleMap'

export default function MainContent() {
   return (
    <div className="App">
      
      <Navigation></Navigation>
      <OLMapFragment></OLMapFragment>
      <Chat></Chat>
    </div>
   )
}



