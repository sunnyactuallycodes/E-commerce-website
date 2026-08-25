import { useCallback, useEffect, useState } from 'react';
import PriceContext from './PriceContext.js';


const getInitialPrice= ()=>{
    const currentPrice = sessionStorage.getItem("currentPrice");
    if(!currentPrice) return null;

    try{
        return JSON.parse(currentPrice);

    }catch(error){
        console.error("Failed to parse the price: ", error);
        sessionStorage.removeItem("currentPrice");
        return null;
    }
};

const PriceContextProvider = ({children})=>{
    const [price , setPrice ]= useState(getInitialPrice);
    useEffect(()=>{
            if(price){
                sessionStorage.setItem("currentPrice", JSON.stringify(price));
            }else{
                sessionStorage.removeItem("currentPrice");
            }
    },[price]);


    //setting the price to the useState function 
    const adjustprice= useCallback((data)=>{
        setPrice(data);
    },[]);

    return(
    <PriceContext.Provider value={{adjustprice, price, setPrice}}>
        {children}
    </PriceContext.Provider>
    
)

};

export default PriceContextProvider;


