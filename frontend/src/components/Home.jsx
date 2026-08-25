import { useContext, useEffect } from "react";
import CategoryBanner from "./CategoryBanner";
import FeaturedBanner from "./FeaturedBanner";

import { FooterCopy } from "./FooterCopy";
import Header from "./Header";
import Hero from "./Hero";
import Testimonial from "./Testimonial";
import SearchContext from "../context/SearchContext";

function Home(){
    const {searchOn, setSearchOn}= useContext(SearchContext);
    useEffect(()=>{
        setSearchOn(false);
    },[]);
    return(
    <>
    <Header/>
    <Hero/>
    <CategoryBanner/>
    <FeaturedBanner/>
    <Testimonial/>
    
    </>
    )
};
export default Home;