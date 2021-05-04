import React from 'react'
import GoogleMapReact from 'google-map-react'

import Login from './Login'
import Marker from './Marker'

const location = {
   address: '1600 Amphitheatre Parkway, Mountain View, california.',
   lat: 35.282753,
   lng: -120.659615,
 }


 const AnyReactComponent = ({text}) => <div>{text}</div>;

export default function GoogleMap() {
   return (
      <div className="google-map" style = {{width : "50vw", height : "100vh"}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY}}
        defaultZoom={50}
        defaultCenter = {location}
      >
          <Marker
            lat={35.282753}
            lng={-120.659615}
            text="shit"
          />
      </GoogleMapReact>
    </div>
   )
}
