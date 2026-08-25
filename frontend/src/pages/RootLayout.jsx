import { Outlet } from "react-router-dom"
import Header from "../components/Header"

import { FooterCopy } from "../components/FooterCopy"

function RootLayout(){
    return(
        <>
        <Header/>
        <Outlet/>
        <FooterCopy/>
        </>
    )
};
export default RootLayout