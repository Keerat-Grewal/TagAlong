import React from 'react'
import Navigation from './Navigation'
import SimpleMap from './SimpleMap'
import Chat from './Chat'
import OLMapFragment from './SimpleMap'
import MapContainer from './GoogleMap'
import CreateRide from './Ride'

export default function MainContent() {
   return (
    <div className="App">
      
      <Navigation canCreate = {true} canSearch = {true}></Navigation>
      {/* <GoogleMap></GoogleMap> */}
      <MapContainer></MapContainer>
      {/* <CreateRide></CreateRide> */}
      <Chat></Chat>
    </div>
   )
}



