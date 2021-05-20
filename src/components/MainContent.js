import React, { useRef, useState, useEffect } from 'react';
import Navigation from './Navigation'
import Chat from './Chat'
import MapContainer from './GoogleMap'


export default function MainContent() {
    const [filter, setFilter] = useState('');
    return (
        <div className="App">
        
        <Navigation update={setFilter} canCreate = {true} canSearch = {true}></Navigation>
        {/* <GoogleMap></GoogleMap> */}
        <MapContainer filter={filter}></MapContainer>
        {/* <CreateRide></CreateRide> */}
        <Chat></Chat>
    </div>
   )
}



