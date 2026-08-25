import axios from "axios";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { useGeolocated } from "react-geolocated";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Draggable } from "leaflet";
import LocationPicker from "../utils/LocationPicker";


function Google({onLocationSelect}){
     
      const navigate = useNavigate();
      const {coords,isGeolocationAvailable,isGeolocationEnabled} = useGeolocated({
        positionOptions:{
          enableHighAccuracy:true
        },
        userDecisionTimeout:5000
      });

      const [selectedLat, setSelectedLat]= useState(null);
      const [selectedLng, setSelectedLng]= useState(null);
      
      const handleLocationSelect =(lat, lng)=>{
        setSelectedLat(lat);
        setSelectedLng(lng);
      };
      console.log(selectedLat, selectedLng);

      


    
    return(
        <>

       <h1 style={{
         marginTop:'10rem'
       }}>
        Google login button bellow
       </h1>
       <button onClick={()=>window.location.href="http://localhost:4000/auth/google/callback"}>Click me</button>

       {
        !isGeolocationEnabled && <p>no location is enabled please enable to start with us.</p>
       }
       {
        !coords && <p>please enable the coordinates first</p>
       }
       {
        coords && <p>{coords.latitude} and {coords.longitude}</p>
       }
       <h3>drag the location to checkout your delivery location</h3>
       <LocationPicker onLocationSelect={handleLocationSelect}/>
      

      <br/>
      <br/>

      
       

        </>
    )
}
export default Google;