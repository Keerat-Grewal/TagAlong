import {React, Component} from 'react';
import { useState, useEffect } from "react";
import useGeoLocation from './Location';
import {Button, Modal, Form} from 'react-bootstrap';
import mapStyles from './mapStyles';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {firestore} from './Firebase';
import { useAuth } from '../contexts/AuthContext'
import firebase from 'firebase/app'


function MapContainer(props) {
    const location = useGeoLocation();
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
        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const currDate = new Date();
        const month = months[currDate.getMonth()];
        const day = currDate.getDay();
        const year = currDate.getFullYear();
        const date = month + " " + day + ", " + year;
        const timestamp = firebase.firestore.Timestamp.fromDate(new Date(date));
        console.log("INSIDE useEffect google");
        console.log(props.filter)
        if(props.filter === '') {
            firestore.collection("rides").where("departure", ">", timestamp)
                .onSnapshot((querySnapshot) => {
                    var newMarkers = [];
                    querySnapshot.forEach((doc) => {
                        newMarkers.push({coordinates: { lat: doc.data().lat, lng: doc.data().lng }});
                    });
                    setMarkers(newMarkers);
                });
        }
        else{
            firestore.collection("rides").where("departure", ">", timestamp).where("destination", "==", props.filter)
            .onSnapshot((querySnapshot) => {
                var newMarkers = [];
                querySnapshot.forEach((doc) => {
                    newMarkers.push({coordinates: { lat: doc.data().lat, lng: doc.data().lng }});
                });
                setMarkers(newMarkers);
            });
        }

    }, [props.filter]);

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

