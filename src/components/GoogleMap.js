import {React, Component} from 'react';
import { useState, useEffect } from "react";
import useGeoLocation from './Location';
import mapStyles from './mapStyles';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {firestore} from './Firebase';
import { useAuth } from '../contexts/AuthContext'
import firebase from 'firebase/app'


function MapContainer(props) {
    const location = useGeoLocation();
    const style = {
        width: '74%',
        height: '90%'
    }
    
    const [showingInfoWindow, setshowingInfoWindow] = useState(false);
    const {signup, currentUser} = useAuth();
    const [activeMarker, setactiveMarker] = useState({});
    const [markers, setMarkers] = useState([]);
    const [showModal, setModal] = useState(false);
    const ridesRef = firestore.collection('rides');
    const iconBase = "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
    const icon2 = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
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

    useEffect(() => {
        // setup initial markers here from firebase
        // const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        // const timestamp = "2";
        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const currDate = new Date();
        console.log(currDate)
        const month = months[currDate.getMonth()];
        console.log(month)
        const day = currDate.getDate();
        console.log(day)
        const year = currDate.getFullYear();
        console.log(year)
        const date = month + " " + day + ", " + year;
        const timestamp = firebase.firestore.Timestamp.fromDate(new Date(date));
        console.log("INSIDE useEffect google");

        if(props.filter === '') {
            const unsubscribe = firestore.collection("rides").where("departure", ">", timestamp)
                .onSnapshot((querySnapshot) => {
                    var newMarkers = [];
                    querySnapshot.forEach((doc) => {
                        newMarkers.push({
                            coordinates: { lat: doc.data().lat, lng: doc.data().lng }, 
                            desc: doc.data().description,
                            dest: doc.data().destination,
                            first: doc.data().firstname,
                            last: doc.data().lastname,
                            username: doc.data().username
                            });
                    });
                    setMarkers(newMarkers);
                });
            return unsubscribe
        }
        else{
            const unsubscribe = firestore.collection("rides").where("departure", ">", timestamp).where("destination", "==", props.filter)
                .onSnapshot((querySnapshot) => {
                    var newMarkers = [];
                    querySnapshot.forEach((doc) => {
                        newMarkers.push({
                            coordinates: { lat: doc.data().lat, lng: doc.data().lng }, 
                            desc: doc.data().description,
                            dest: doc.data().destination,
                            first: doc.data().firstname,
                            last: doc.data().lastname,
                            username: doc.data().username
                            });
                    });
                    setMarkers(newMarkers);
                });
            return unsubscribe
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
                                title={''}
                                name={<p style={{fontFamily: "Verdana"}}>Name: {m.first} {m.last} <br/>
                                        Contact Info: {m.username} <br/>
                                        Destination: {m.dest} <br/><br/>
                                        {m.desc}</p>}/>
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

