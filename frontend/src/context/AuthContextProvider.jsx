import axios from "axios";
import { useEffect, useState } from "react"
import AuthContext from "./AuthContext";

const AuthContextProvider= ({children})=>{
    const [loggedUser, setLoggedUser]= useState(null);
    const [loadingLog, setLoadingLog] = useState(false);

    const checkingMe = async ()=>{
        try {
            setLoadingLog(true);
            await axios.get("https://e-commerce-website-lac-eight.vercel.app/api/v1/user/login",{withCredentials:true}).then((response)=>setLoggedUser(response.data));
            setLoadingLog(false);
        } catch (error) {
            console.error("An error occured while loading the data");
            setLoggedUser(null);
        }
    };

    useEffect(()=>{
        checkingMe();
    },[]);

    const loggingFunction = (userdata)=> setLoggedUser(userdata);
    const logoutFunction = async()=>{
        await axios.get('https://e-commerce-website-lac-eight.vercel.app/api/v1/logout',{withCredentials:true});
        setLoggedUser(null);
    };
    return(
        <AuthContext.Provider value={{loggedUser, setLoggedUser, loggingFunction, logoutFunction, loadingLog}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;