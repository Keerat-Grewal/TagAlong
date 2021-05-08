import {React, Component} from 'react';
import { useState, useEffect } from "react";
import useGeoLocation from './Location';
import {Button, Modal, Form, Container, Row, Col} from 'react-bootstrap';
// import GoogleMapReact from 'google-map-react'
// import Login from './Login'
// // import Marker from './Marker'
// import useGeoLocation from './Location'
// import {Button, Form, FormControl, Col, Container, Row} from 'react-bootstrap';
// import {Marker} from 'google-maps-react'
// import {GoogleApiWrapper, Map} from 'google-maps-react';
// import PropTypes from 'prop-types';
// export default function GoogleMap() {
//     const location = useGeoLocation();
//     return (
//         <div className="google-map" style = {{width : "60vw", height : "80vh"}}>
        
//         {location.loaded && <GoogleMapReact
//             bootstrapURLKeys={{ key: "AIzaSyA5RrHJw-KMVU6LziZGJEZajE2MoOCFcoc"}}
//             defaultZoom={15}
//             defaultCenter = {location.coordinates}
//         >
//             {/* <Marker
//                 lat={location.coordinates.lat}
//                 lng={location.coordinates.lng}
//                 text="my marker"
//             /> */}
//             <Marker>
//                 title={'The marker`s title will appear as a tooltip.'}
//                 position={{lat: location.coordinates.lat, lng: location.coordinates.lng}}
//             </Marker>
//         </GoogleMapReact>}
        
//         <Form></Form>

//         </div>
//     )
// }

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {firestore} from './Firebase';
import { useAuth } from '../contexts/AuthContext'
import "../styles/map.css";
import CreateRide from './Ride'

function MapContainer() {
    const location = useGeoLocation();

    const style = {
        width: '60%',
        height: '90%'
    }
    
    const [showingInfoWindow, setshowingInfoWindow] = useState(false);
    const {signup, currentUser} = useAuth();
    const [activeMarker, setactiveMarker] = useState({});
    const [markers, setMarkers] = useState([]);
    const [showModal, setModal] = useState(false);
    const ridesRef = firestore.collection('rides');
    //const [selectedPlace, setselectedPlace] = useState({});
    
    const onMarkerClick = (props, marker, e) => {
        setactiveMarker(marker);
        setshowingInfoWindow(true);
    }
    
    const onMapClicked = (props) => {
        if (showingInfoWindow) {
            setshowingInfoWindow(false);
            setactiveMarker(null);
        }
    };

    const onHideChange = (formValues) => {
        // set modal to false so its not visible
        // call firebase to submut new ride
        ridesRef.doc(currentUser.uid).set({
            formValues
        })
        setModal(false);
    }

    // const handleClick = () => {
    //     console.log("CLICKED");
    //     setModal(true);
    // }

    useEffect(() => {
        // setup initial markers here from firebase
        
    }, []);

    return (
        <div>
            {location.loaded && 
                <Container fluid>
                    <Row>
                        <Col></Col>
                        <Map 
                            google={window.google} 
                            onClick={onMapClicked}
                            initialCenter={location.coordinates}
                            containerStyle={style}
                            // style={style}
                            zoom={14}>
                            <Marker
                                onClick={onMarkerClick}
                                title={'testsssts'}
                                name={'SOMA'}
                                position={location.coordinates} >
                            </Marker>
                            <InfoWindow 
                                    marker={activeMarker}
                                    visible={showingInfoWindow}>
                                    <p>hello yurr</p>
                            </InfoWindow>
                        </Map>
                    </Row>
                </Container>
            }      
        </div>
    );
  
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA5RrHJw-KMVU6LziZGJEZajE2MoOCFcoc"
})(MapContainer)

