import {NavLink, useLocation} from 'react-router-dom';
import {Search, Menu ,X, User, ShoppingBag, CornerUpLeftIcon, Axis3D, Flashlight, UserCheck2Icon, Phone, Package, ChevronRight, Heart, LogOut} from 'lucide-react';
import {useMediaQuery} from 'react-responsive';
import { useContext, useEffect, useEffectEvent, useState } from 'react';
import {toast, ToastContainer} from 'react-toastify';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { useLoadingBar } from "react-top-loading-bar";
import ReactLoading from 'react-loading';

import AuthContext from '../context/AuthContext';
import LoadingBar from '../utils/LoadingBar';
import SearchContext from '../context/SearchContext';



function Header(){

    const {searchOn, setSearchOn}= useContext(SearchContext);
  

    const mobileView = useMediaQuery({maxWidth:'740px'});
    const [searchOpen, setSearchOpen]= useState(false);
    const [account, setAccount] = useState(false);

    // for mobile status bar 
    const [statusbar, SetStatusbar]= useState(false);
    


   
    const {loggedUser, loggingFunction,logoutFunction, loadingLog}= useContext(AuthContext);
    

   
    const location = useLocation();
    const {pathname}= location;
    console.log(pathname);

    //information from backend of login
    const [loginMessage, setLoginMessage]= useState({});
   




    // if user exists then now he can also logout by clicking on the symbol as it is. 
    const [isMenuClicked, setIsMenuClicked]= useState(false);

    

    //loading bar
    const {start, complete}= useLoadingBar({
        color:'blue',
        height:'2'
    });


    const [name, setName]= useState("");
    const [phoneNumber, setPhoneNumber]= useState(0);
    const [password, setPassword]= useState("");

   


    //if it is true than the signup will appear on the page.
    const [signup, setSignup]= useState(false);
    

    //messages from backend if the work is done
    const [messages, setMessages]= useState({});

    //loading fallback if needed
    const [loading, setLoading]= useState(false);


    // for user logout 
    const loggingOutUser = async()=>{
        try {
            const backendRes = await axios.get('https://e-commerce-website-lac-eight.vercel.app/api/v1/logout', {withCredentials:true}).then(()=>logoutFunction());
            toast.success("Logged out"); 
            window.location.reload();

        } catch (error) {
            console.error("There might be an error while logging out the user: ", error);
            toast.error("Internal Server Error");
        }
    }

    // for user signup
    const sendingUserInformationToUser= async(e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            start();
            const backendRes= await axios.post("https://e-commerce-website-lac-eight.vercel.app/api/v1/signup", {name, phoneNumber, password},{withCredentials:true});
            const response = await backendRes.data;
            setMessages(response);
            setLoading(false);
            complete();
            return toast.success("Successfully signed up") && setSignup(!signup);
            
        } catch (error) {
            console.error("An internal server error occured: ", error);
            complete();
            return toast.error("Server Error");
        }
    }

    // for user login
    const gettingBackUserInformationToClient= async(e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            start();
            const backendRes= await axios.post("https://e-commerce-website-lac-eight.vercel.app/api/v1/login",{phoneNumber, password}, {withCredentials:true});
            const response = await backendRes.data; 
            await loggingFunction(response.user);
            console.log("login successfull");
            setLoading(false);
            complete();
            setAccount(false);
        } catch (error) {
            console.error("An internal server error occured: ", error);
            complete();
            return toast.error("Server Error");
        }
    }

    
    return(
        <>
        <ToastContainer/>
        {
            statusbar && 
            <>
            <div style={{
                position:"fixed",
                top:0,
                marginTop:"80px",
                zIndex:500,
                width:"100vw",
                display:"flex",
                flexDirection:"row"
            }}>
                <div style={{
                   width:"100%",
                   display:"flex",
                   flexDirection:"column",
                   backgroundColor:"#F7F5F0",
                   gap:"20px",
                   padding:"15px",
                   justifyContent:"center",
                   zIndex:400000
                  
                }}>
                    <NavLink onClick={()=>SetStatusbar(false)} to="/shop" className="text-sm tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground transition-colors text-left">Shop</NavLink>
                    <NavLink onClick={()=>SetStatusbar(false)} to="/shoes" className="text-sm tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground transition-colors text-left">Shoes</NavLink>
                    <NavLink onClick={()=>SetStatusbar(false)} to="/clothing" className="text-sm tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground transition-colors text-left">clothing</NavLink>
                    <NavLink onClick={()=>SetStatusbar(false)} to="/newArrivals" className="text-sm tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground transition-colors text-left">new arrivals</NavLink>
                     <NavLink onClick={()=>SetStatusbar(false)} to="/sale" className="text-sm tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground transition-colors text-left">sale</NavLink>
                     <div style={{
                        width:"100%",
                        border:"0.2px solid black",
                        opacity:0.2
                     }}/>
                    <div style={{
                        display:"flex",
                        flexDirection:'column',
                        gap:"10px",
                        justifyContent:"center"
                    }}>
                     <NavLink to="/orders" onClick={()=>SetStatusbar(false)} className="text-sm tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground transition-colors text-left">My orders</NavLink>
                     {
                     loggedUser && loggedUser.user.name ==="Sunny Sirohi" && 
                     <NavLink onClick={()=>SetStatusbar(false)} to="/admin" className="text-sm tracking-[0.25em] uppercase text-[#C8A96E]">Admin</NavLink>
                     }
                    </div>


                </div> 
            </div>
            </>
        }

      

        {
            account && !loggedUser && 
            
                <div style={{
                    position:"fixed",
                    backdropFilter:"blur(10px)",
                    zIndex:5000,
                    top:0,
                    height:"100vh",
                    width:"100vw"
                }}>
                    {
                        signup && 
                      
                          <form style={{ margin:"10rem auto",
                    padding:"3rem",
                    position:'relative'}}  className="bg-white text-gray-500 max-w-96 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
                          <X onClick={()=>setAccount(!account)} style={{position:"absolute", top:-5,left:"94%", backgroundColor:"white", borderRadius:'30px'}} color='red' size={30}/>
            <h2 style={{
                marginBottom:"15px",
                marginTop:'15px',
                padding:"10px"
            }} className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        
            <input style={{
                padding:"10px",
                marginTop:"15px"
            }} id="email" className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="text" placeholder="Username" value={name} onChange={(e)=>setName(e.target.value)} required />
            <input style={{ padding:"10px",
                marginTop:"15px"}} id="email" min={10} max={10} className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="text" value={phoneNumber===0?``:phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} placeholder="Phone Number" required />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} style={{ padding:"10px",
                marginTop:"15px"}} id="password" className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3" type="password" placeholder="Password" required />
        
            <button style={{
                 padding:"10px",
                marginTop:"15px"
            }} type='submit' onClick={sendingUserInformationToUser} className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">Create Account</button>
            
            <p style={{marginTop:"15px", marginBottom:"15px"}} className="text-center mt-4">Already have an account? <button onClick={()=>setSignup(!signup)} className="text-blue-500 underline">Log In</button></p>
        </form>
       
                    }

                   { !signup && 
                  <div style={{
                    margin:"10rem auto",
                    padding:"3rem",
                    position:'relative'
                  }}  className="bg-white text-gray-500 max-w-96 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Welcome back</h2>
             <X onClick={()=>setAccount(!account)} style={{position:"absolute", top:-5,left:"94%", backgroundColor:"white", borderRadius:'30px'}} color='red' size={30}/>



            <form>
                <input value={phoneNumber===0?``:phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} style={{marginTop:"30px",marginBottom:"15px",padding:"10px"
                }} id="phoneNumber" className="w-full bg-transparent border border-gray-500/30 outline-none rounded-full" type="text" placeholder="Enter your phone number" required />
                <input value={password} onChange={(e)=>setPassword(e.target.value)} style={{
                    padding:"10px"
                }} id="password" className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full" type="password" placeholder="Enter your password" required />
                <div style={{marginTop:"10px", marginBottom:"10px"}} className="text-right py-4">
                    <a className="text-blue-600 underline" href="#">Forgot Password</a>
                </div>
                <button style={{
                    padding:"10px",
                    marginBottom:"15px"
                }} type="submit" onClick={gettingBackUserInformationToClient} className="w-full mb-3 bg-indigo-500 rounded-full text-white">Log in</button>
            </form>
            <p style={{
                marginBottom:"15px"
            }} className="text-center mt-4">Don’t have an account? <button onClick={()=>setSignup(!signup)} style={{
                cursor:"pointer"
            }}  className="text-blue-500 underline">Signup</button></p>
            <button type='button' style={{padding:'10px',marginBottom:"15px"}} className="w-full flex items-center gap-2 justify-center mt-5 bg-black rounded-full text-white">
                <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="appleLogo" />
                Log in with Apple
            </button>
            <button onClick={()=>window.location.href="http://localhost:4000/auth/google/callback"} style={{padding:'10px',cursor:"pointer"}} type="button" className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800">
                <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" />
                Log in with Google
            </button>
                  </div>
                   }

                </div>
           
        }


        {/* 
        desktop responsive
        till 746px width
        */}
        <header style={{
            position:'fixed',
            top:0,
            left:0,
            zIndex:1000,
            borderBottom:'0.5px solid black',
            width:'100vw'
        }}>
            
           <div style={{
                paddingLeft:'20px',
                paddingTop:"10px",
                paddingBottom:"10px",
                paddingRight:'20px',
                display:'flex',
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                width:'100%',
                backgroundColor:"white",
                position:'relative'
            }}>
                <div>
                <NavLink to={'/'}>
                    <img style={{
                      width:'150px',
                      height:'70px'
                    }} src="/gemini-svg.svg" alt="logo" />   
                </NavLink>
                </div>
                <div style={{
                    display:`${mobileView?"none":"flex"}`,
                    flexDirection:"row",
                    justifyContent:"center",
                    alignItems:"center",
                    gap:'40px',
                    fontFamily:"Inter",
                    opacity:"0.7"
                   
                }}>
                   <NavLink to={'/shop'} style={{
                    textDecoration:"none",
                    color:"black",
                    fontFamily:'Inter',
                    fontSize:'0.9rem'
                   }}>SHOP</NavLink>
                   <NavLink to={'/shop'} style={{
                    textDecoration:"none",
                    fontFamily:'inter',
                    color:"black",
                    fontSize:'0.9rem'
                   }}>SHOES</NavLink>
                   <NavLink to={'/shop'} style={{
                    textDecoration:"none",
                    color:"black",
                    fontFamily:"Inter",
                    fontSize:'0.9rem'
                   }}>CLOTHING</NavLink>
                   <NavLink to={'/shop'} style={{
                    textDecoration:"none",
                    color:'black',
                    fontFamily:"Inter",
                    fontSize:'0.9rem'
                   }}>SALE</NavLink>
                   {
                    loggedUser && loggedUser.user.name==="Sunny Sirohi" && 
                     <NavLink to={'/admin'} style={{
                    textDecoration:"none",
                    color:'black',
                    fontFamily:"Inter",
                    fontSize:'0.9rem'
                   }}>ADMIN</NavLink>
                   }

                </div>
                <div style={{
                    display:'flex',
                    flexDirection:"row",
                    alignItems:'center',
                    gap:'16px'
                }}>
                    {
                     pathname==="/shop" &&    
                        <button onClick={()=>{
                        setSearchOpen(!searchOpen);
                        setSearchOn(!searchOn);
                    }} style={{
                        textDecoration:'none',
                        padding:"0.5rem",
                        color:'black',
                        cursor:"pointer",
                        zIndex:112312313
                    }}>
                        <Search/>
                    </button>
                    }
                    {
                        !loadingLog && 
                        <button onClick={()=>setIsMenuClicked(!isMenuClicked)} style={{
                            display:`${mobileView?'none':""}`,
                            textDecoration:"none",
                            padding:"0.5rem",
                            color:"green",
                            cursor:"pointer"
                        }}>
                            <UserCheck2Icon/>
                        </button>
                    }
                    {!loggedUser  && <button onClick={()=>setAccount(!account)} style={{
                        display:`${mobileView?'none':''}`,
                        textDecoration:'none',
                        padding:"0.5rem",
                        color:'black'
                    }}>
                       <User />
                    </button>
                    }
                      <NavLink style={{
                        textDecoration:'none',
                        padding:"0.5rem",
                        position:"relative",
                        color:'black'
                    }} to={'/shop/cart'}>
                        <ShoppingBag/>
                        <span style={{
                            position:'absolute',
                            top:'-0.5px',
                            right:'-0.5px',
                            color:'white',
                            backgroundColor:"#C8A96E",
                            display:'flex',
                            flexDirection:"row",
                            justifyContent:'center',
                            alignItems:'center',
                            borderRadius:"15px",
                            fontSize:'10px',
                            width:'16px',
                            height:'16px'
                        }}>
                            2
                        </span>

                    </NavLink>
                   
                  
                    {
                       mobileView && !statusbar && <Menu onClick={()=>SetStatusbar(true)}/>
                    }
                    {
                        mobileView && statusbar && 
                        <X style={{zIndex:10000}} onClick={()=>SetStatusbar(false)}/>
                    }
                </div>
                {
                    isMenuClicked && 
                    <>
                    <div style={{position:"absolute",marginTop:"20rem", right:5, width:'300px'}}>
                       <div style={{
                        backgroundColor:"black",
                        color:'white',
                        display:"flex",
                        flexDirection:"row",
                        alignItems:"center",
                        gap:"10px",
                        padding:"20px"
                       }}>
                            <div className='uppercase' style={{display:'flex', alignItems:"center", justifyContent:"center", color:"black", padding:"10px",backgroundColor:"white"}}>
                                <img style={{width:"60px", height:'40px'}} src='/gemini-svg.svg'/>
                            </div>
                            <div style={{
                                display:"flex",
                                flexDirection:"column"
                            }}>
                                <span style={{fontFamily:"Inter"}}>{loggedUser && loggedUser.user.name}</span>
                                <span style={{fontFamily:"Inter", fontSize:"0.76rem", opacity:"0.5"}}>{loggedUser && loggedUser.user.phoneNumber}</span>
                            </div>
                       </div>
                       <div style={{
                        padding:'20px',
                        backgroundColor:"white"
                       }}>
                        <div style={{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:"space-between",
                            alignItems:'center'
                        }}>
                            <NavLink onClick={()=>setIsMenuClicked(false)} to={'/orders'}>
                            <div style={{
                                display:'flex',
                                flexDirection:'row',
                                alignItems:'center',
                                gap:"8px"
                            }}>
                                
                                <Package size={30} style={{
                                    backgroundColor:"whitesmoke",
                                    padding:'4px'
                                }}/>
                                
                                  <div style={{
                                display:"flex",
                                flexDirection:"column"
                                }}>
                                    <span style={{fontFamily:"Inter",fontSize:"0.75rem"}}>My Orders</span>
                                    <span style={{fontFamily:"Inter", fontSize:"0.65rem", opacity:"0.5"}}>View Orders</span>
                                </div>     
                            </div>
                            </NavLink>
                            <ChevronRight size={12}/>
                        </div>
                        <div style={{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:"space-between",
                            alignItems:'center',
                            marginTop:"25px"
                        }}>
                            <div style={{
                                display:'flex',
                                flexDirection:'row',
                                alignItems:'center',
                                gap:"8px"
                            }}>
                                
                                <Heart size={30} style={{
                                    backgroundColor:"whitesmoke",
                                    padding:'4px'
                                }}/>
                                  <div style={{
                                display:"flex",
                                flexDirection:"column"
                                }}>
                                    <span style={{fontFamily:"Inter",fontSize:"0.75rem"}}>Wishlist</span>
                                    <span style={{fontFamily:"Inter", fontSize:"0.65rem", opacity:"0.5"}}>saved items</span>
                                </div>     
                            </div>
                            <ChevronRight size={12}/>
                        </div>
                        <div style={{
                            border:'0.2px solid black',
                            opacity:"0.4",
                            width:'100%',
                            marginTop:"15px"
                        }}/>

                        <div style={{
                            display:"flex",
                            flexDirection:'row',
                            alignItems:"center",
                            gap:'7px',
                            marginTop:"20px"
                        }}>
                            <LogOut size={15}/>
                            <button onClick={loggingOutUser} style={{fontFamily:"Inter", fontSize:'0.75rem', cursor:"pointer"}}>Sign Out</button>
                        </div>

                       </div>
                    </div>
                    </>
                }
            </div>

             
        </header>
  
        </>
    )
};
export default Header;