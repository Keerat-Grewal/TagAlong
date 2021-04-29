import React from 'react'
import Navigation from './Navigation'
import SimpleMap from './SimpleMap'
import Chat from './Chat'

export default function MainContent() {
   return (
    <div className="App">
      <Navigation></Navigation>
      <SimpleMap></SimpleMap>
      <Chat></Chat>
    </div>
   )
}



