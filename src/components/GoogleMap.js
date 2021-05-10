import {React, Component} from 'react';
import { useState, useEffect } from "react";
import useGeoLocation from './Location';
import {Button, Modal, Form} from 'react-bootstrap';
import mapStyles from './mapStyles';
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
import firebase from 'firebase/app'

function CreateRide(props) {

    const [formValue, setFormValue] = useState({
        destination: "",
        departure: "",
        firstname: "",
        lastname: "",
        username: ""
    });

    const handleChange = (e) => {
        setFormValue({ 
            ...formValue, 
            [e.target.id]: e.target.value
        });
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a Ride!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group>
                <Form.Label id="sign-up-text">Sign-up</Form.Label>
                <Form.Control id="destination" type="email" placeholder="Destination" onChange={handleChange} />
                <Form.Control id="departure" type="password" placeholder="Departure Date (Month Day, Year)" onChange={handleChange}/>
                <Form.Control id="firstname" type="text" placeholder="First Name" onChange={handleChange}/>
                <Form.Control id="lastname" type="text" placeholder="Last Name" onChange={handleChange}/>
                <Form.Control id="username" type="text" placeholder="Username" onChange={handleChange}/>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide(formValue)}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
}
  

function MapContainer() {
    const location = useGeoLocation();
    console.log(location)
    const style = {
        
        width: '70%',
        height: '90%'
        
    }
    
    const [showingInfoWindow, setshowingInfoWindow] = useState(false);
    const {signup, currentUser} = useAuth();
    const [activeMarker, setactiveMarker] = useState({});
    const [markers, setMarkers] = useState([]);
    const [showModal, setModal] = useState(false);
    const ridesRef = firestore.collection('rides');
    const iconBase = "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
    //const [selectedPlace, setselectedPlace] = useState({});
    console.log("INSIDE GOOGLE MAP")
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

    useEffect(() => {
        // setup initial markers here from firebase
        // const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        // const timestamp = "2";
        firestore.collection("rides").where("firstname", "==", "Brandon")
            .onSnapshot((querySnapshot) => {
                var newMarkers = [];
                querySnapshot.forEach((doc) => {
                    newMarkers.push({coordinates: { lat: doc.data().lat, lng: doc.data().lng }});
                });
                console.log(newMarkers);
                setMarkers(newMarkers)
            });

    }, []);
    console.log(markers)
    return (
        <div className="map-container">
            {location.loaded && 
                <>
                <Map 
                    google={window.google} 
                    onClick={onMapClicked}
                    initialCenter={location.coordinates}
                    containerStyle={style}
                    zoom={14}
                    styles={mapStyles.dark}
                    >
                    
                    <Marker
                        icon={iconBase + "info-i_maps.png"}
                        onClick={onMarkerClick}
                        title={'testsssts'}
                        name={'You are here'}
                        position={location.coordinates} >
                    </Marker>
                    <InfoWindow 
                                    marker={activeMarker}
                                    visible={showingInfoWindow}>
                                    <p>{activeMarker && activeMarker.name}</p>
                    </InfoWindow>
                                    
                        {markers && markers.map((m, index) => 
                            <Marker 
                                key={index} 
                                position={m.coordinates}
                                onClick={onMarkerClick}
                                title={'nani'}
                                name={'Brandon is offering ride to San Jose. Username: bburana'}/>
                                )}
                </Map>

                </>
            }      
        </div>
    );
  
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA5RrHJw-KMVU6LziZGJEZajE2MoOCFcoc"
})(MapContainer)

