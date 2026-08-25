import { useCallback, useEffect, useState } from 'react';
import LocationContext from './LocationContext';


const getInitialPrice= ()=>{
    const currentLocation = sessionStorage.getItem("currentLocation");
    if(!currentLocation) return null;

    try{
        return JSON.parse(currentLocation);

    }catch(error){
        console.error("Failed to parse the location: ", error);
        sessionStorage.removeItem("currentLocation");
        return null;
    }
};

const LocationContextProvider = ({children})=>{
    const [location , setLocation ]= useState(getInitialPrice);
    useEffect(()=>{
            if(location){
                sessionStorage.setItem("currentLocation", JSON.stringify(location));
            }else{
                sessionStorage.removeItem("currentLocation");
            }
    },[location]);


    //setting the price to the useState function 
    const adjustLocation= useCallback((data)=>{
        setLocation(data);
    },[]);

    return(
    <LocationContext.Provider value={{adjustLocation, location, setLocation}}>
        {children}
    </LocationContext.Provider>
    
)

};

export default LocationContextProvider;


