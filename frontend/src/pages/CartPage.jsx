import { ArrowLeft, Delete, LocateIcon, X } from "lucide-react";
import {useMediaQuery} from 'react-responsive';
import { Minus, Plus } from "lucide-react";
import {ToastContainer, toast} from 'react-toastify';
import { useContext, useState } from "react";
import axios from 'axios';
import LoadingBar from "../utils/LoadingBar.jsx";
import { useEffect } from "react";
import LocationPicker from "../utils/LocationPicker.jsx";
import { useGeolocated } from "react-geolocated";
import PriceContextProvider from "../context/PriceContextProvider.jsx";
import PriceContext from "../context/PriceContext.js";
import LocationContext from "../context/LocationContext.js";
import { NavLink } from "react-router-dom";
import SearchContext from "../context/SearchContext.js";

function CartPage(){


    const middleView = useMediaQuery({maxWidth:"1000px"});
    const smallScreen = useMediaQuery({maxWidth:"770px"});

    const {searchOn, setSearchOn}= useContext(SearchContext);
    const {adjustprice, price, setPrice}= useContext(PriceContext);
    const {adjustLocation, location}= useContext(LocationContext);
    
    
    

    //location logic for the longitude and latitude for the maps 
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

  


    //loading the locationpicker since we want the lan,lng of the user to fetch shipping price for his/her cart 
    const [showMap, setShowMap]=useState(true);

    //after getting the shipping charges based on location 
    const [shippingCharges, setShippingCharges]= useState(0);


    //loading fallback to wait for the data to fetch
    const [loading, setLoading]= useState(false);
  
    // storing the cart items in the cart useState in order to map it 
    const [cart, setCart]= useState({});

    console.log(cart);
    // to fetch the products from cart which we saved in the product details page
    const fetchingProductsFromCart = async()=>{
        try {
            setLoading(true);
            const backendRes = await axios.get("http://localhost:4000/api/v1/get/cart/products",{withCredentials:true});
            const response = await backendRes.data;
            setCart(response);
            setLoading(false);
            // toast.success("Data loaded") && cart.success;
        } catch (error) {
            console.error("An internal server error occured while fetching your cart products: ", error);
            // return toast.error("Server Timeout");
        }
    };

    // fetching the shipping data from the order controller in order to display it on the screen for user to see if he/she still wants it.
    const uploadingLocationToBackend = async()=>{
        try {
            setLoading(true);
            adjustLocation({
                latitude:selectedLat,
                longitude:selectedLng
            });
            const backendRes= await axios.get(`http://localhost:4000/api/v1/shippingCharges/${selectedLat}/${selectedLng}`,{withCredentials:true});
            const response = await backendRes.data;
            setShippingCharges(response);
            adjustprice(response);
            setLoading(false);
            return toast.success("Shipping Price Confirmed") && setShowMap(false);
        } catch (error) {
            console.error("An unexpected error occured during uploading the location coordinates to the backend server: ", error);
            return toast.error("Server Timed out");
        }
    };

   const uploadingLocationToBackendWhen= async()=>{
    try {
        if(location.latitude && location.longitude){
            setLoading(true);
            const backendRes= await axios.get(`http://localhost:4000/api/v1/shippingCharges/${location.latitude}/${location.longitude}`,{withCredentials:true});
            const response = await backendRes.data;
            setShippingCharges(response);
            adjustprice(response);
            setLoading(false);
             return toast.success("Shipping Price Confirmed");
        };
    } catch (error) {
        console.error("Shipping price cannot be fetched: ", error);
    }
   };


   const deletingItemsFromCart= async (productId)=>{
    try {
        const backendRes= await axios.get(`http://localhost:4000/api/v1/delete/cart/${productId}`,{withCredentials:true});
        const response = await backendRes.data;
        console.log(response);
        console.log("completed task");
        window.location.reload();
    } catch (error) {
        console.error("There is a client side error while deleting products from cart: ", error);
    }
   }

    // to load the cart function whenever the component mounts on the browser
    useEffect(()=>{
        fetchingProductsFromCart();
        uploadingLocationToBackendWhen();
        setSearchOn(false);
    },[]);

    return(
        <>

        {/* loading the map in order to make the user select his lan, lng to serve it backend to fetch the price */}
        {
            !location && showMap && 
            <div style={{
                position:"sticky",
                top:'0',
                width:"100vw",
                height:"100vh",
                backdropFilter:"blur(6px)",
                zIndex:1000
            }}>
                <div style={{
                    margin:"3.5rem auto",
                    maxWidth:"70vw",
                    height:"50vh",
                    textAlign:"center",
                    backgroundColor:"white",
                    border:"0.2px solid black",
                    position:'relative'
                }}>
                    <h3>Drag the marker to confirm your location, the cart will not proceed without picking location</h3>
                    <LocationPicker onLocationSelect={handleLocationSelect}/>
                    {/* <X onClick={()=>setShowMap(!showMap)} style={{position:"absolute", top:-5,left:"98%", backgroundColor:"white", borderRadius:'30px'}} color='red' size={20}/> */}
                    <button onClick={uploadingLocationToBackend} style={{border:"0.2px solid black", backgroundColor:"black", color:'white', fontFamily:"Playfair Display", padding:"10px",marginBottom:"10px"}}>Confirm</button>
                </div>
               
            </div>
        }


        {
            loading && <LoadingBar/>
        }
        <ToastContainer/>
            <div style={{
            backgroundColor:'black',
            padding:"3rem",
            marginTop:"5rem"
        }}>
            <div style={{
                display:'flex',
                flexDirection:"column",
                gap:'20px'
            }}>
                <NavLink to={'/shop'}
                style={{
                    width:'fit-content'
                }}
                className="flex items-center gap-2 bg-[#0D0D0D] text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#C8A96E] hover:text-[#0D0D0D] transition-colors"
                >
                <ArrowLeft size={13} />
                Continue Shopping
                </NavLink>
                <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase mb-3">1 Items</p>
                <h1 className="font-['Playfair_Display'] text-white text-5xl md:text-6xl">Your Bag</h1>
            </div>
            </div>


            {/* products in the cart to be proceeded */}
            {
            !middleView && cart.success && 
            <div style={{
                marginTop:"3rem",
                display:"flex",
                flexDirection:"row",
                width:"100%",
                gap:"5px",
                paddingLeft:"3rem",
                paddingRight:"3rem"
            }}>
                <div style={{
                    display:"flex",
                    flexDirection:"column",
                    gap:"5px",
                   
                    width:'100%'
                }}>
                <div style={{
                    display:'flex',
                    width:"70%",
                    flexDirection:"row",
                    alignItems:"center"
                }}>
                    <div style={{width:"50%"}} className=" text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2">PRODUCT</div>
                    <div style={{width:"15%"}} className=" text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2">SIZE</div>
                    <div style={{width:'15%'}} className=" text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2">OTY</div>
                    <div style={{width:"20%"}} className=" text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2">TOTAL</div>
                </div>
                <div style={{
                    border:'0.5px solid black',
                    opacity:"0.3",
                    width:"80%",marginTop:"1.05rem"
                }}/>
                    
                     {
                        cart.success && cart.data.map((item)=>(
                            <div key={item._id}>
                    <div style={{
                        display:"flex",
                        width:'70%',
                        flexDirection:"row",
                        alignItems:"center"
                    }}>
                 
                     <div style={{
                        display:"flex",
                        flexDirection:"row",
                        gap:"10px",
                        alignItems:'center',
                        marginTop:"20px",
                        width:'50%'
                     }}>
                        <img src={item.products.productImages[0]} className="w-20 h-24" style={{
                        }} alt="null"/>
                        <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-[#C8A96E] mb-0.5">{item.products.brandName}</p>
                        <p className="text-sm text-foreground mb-1" style={{
                            fontFamily:'Inter'
                        }}>{item.products.productName}</p>
                        </div>
                     </div>
            
                       
                        <span style={{
                            fontFamily:"Inter",
                            opacity:"0.6",
                            paddingLeft:"10px",
                            paddingRight:'10px',
                            width:'15%'
                        }}>{item.productSize}</span>
                      
                    
                     
                 
                       
                        <span style={{
                            fontFamily:"Inter",
                            opacity:"0.6",
                            paddingLeft:"5px",
                            paddingRight:'5px',
                            width:"15%"
                        }}>{item.quantity}</span>
                       
                  
                      <span style={{
                        fontFamily:"Inter",
                        width:"15%"
                      }}>₹ {item.price}</span>
                      <span style={{
                        width:"5%",
                        cursor:"pointer"
                      }}>
                        <Delete onClick={()=>deletingItemsFromCart(String(item.products._id))} size={20} style={{color:"red"}}/>
                      </span>
                    
                       </div>
                            </div>
                        ))
                     }
                    
            
               
                </div>





                {/* right side of the page which contains the prices */}
                <div className="p-8 sticky top-24" style={{
                    width:"30%",
                    paddingTop:"3rem",
                    paddingBottom:"3rem",
                    paddingRight:"1.5rem",
                    paddingLeft:"1.5rem",
                    display:"flex",
                    flexDirection:"column",
                    marginTop:"1.6rem",
                    backgroundColor:"whitesmoke",
                    boxShadow:"0px 0px 2px 2px #F7F5F0"
                }}>
                    <h2 style={{
                        fontWeight:'500'
                    }} className="font-['Playfair_Display'] text-xl text-foreground mb-6">Order Summary</h2>
                    <div style={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:'center',
                        marginTop:"1.3rem"
                    }}>
                        <span style={{fontFamily:"Inter",opacity:"0.5"}} className="text-foreground/50">Subtotal</span>
                        <span>₹ {shippingCharges.subTotal}</span>
                    </div>
                     <div style={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:'center',
                        marginTop:"1.3rem"
                    }}>
                         <span style={{fontFamily:"Inter",opacity:"0.5"}} className="text-foreground/50">Shipping</span>
                        <span>₹ {shippingCharges.charges}</span>
                    </div>
                    <div style={{border:"0.2px solid black", opacity:"0.3", marginTop:"20px"}}/>
                     <div style={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:'center',
                        marginTop:"1.3rem"
                    }}>
                         <span style={{fontFamily:"Inter",opacity:"0.5"}} className="text-foreground/50">Total</span>
                        <span>₹ {shippingCharges.price}</span>
                    </div>
                    <div className="flex items-stretch gap-0" style={{
                        marginTop:"1.7rem"
                    }}>
                        <input style={{
                            paddingRight:"10px",
                            paddingLeft:"10px",
                            paddingTop:"14px",
                            paddingBottom:"14px"
                        }} type="text" placeholder="PROMO CODE" className="flex-1 bg-[#F7F5F0] text-xs outline-none placeholder:text-foreground/30 border border-r-0 border-black/10 focus:border-[#C8A96E] transition-colors"/>
                        <button style={{
                            paddingRight:"10px",
                            paddingLeft:"10px",
                            paddingTop:"14px",
                            paddingBottom:"14px",
                            
                        }} className="bg-[#0D0D0D] text-white text-xs tracking-wider hover:bg-[#C8A96E] hover:text-[#0D0D0D] transition-colors">Apply</button>
                    </div>
                    <NavLink to={'/shop/items/payment'}>
                    <button style={{
                        marginTop:"2rem",
                        paddingTop:"15px",
                        paddingBottom:"15px",
                        paddingLeft:"10px",
                        paddingRight:"10px"
                    }} className="w-full bg-[#0D0D0D] text-white py-4 flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase hover:bg-[#C8A96E] hover:text-[#0D0D0D] transition-colors">PROCEED TO PAYMENT</button>
                    </NavLink>
                </div>
                

            </div>
            }


            {/* middle view for screen with widhts of 1000px */}
            {
            middleView && !smallScreen &&
            <>
                <div style={{
                    marginTop:"3rem",
                    paddingLeft:"3rem",
                    paddingRight:"3rem",
                    display:'flex',
                    flexDirection:"column",
                    width:'100%'
                }}>
                    <div style={{
                        display:'flex',
                        flexDirection:"column",
                        width:'100%'
                    }}>
                        <div style={{
                            display:'flex',
                            flexDirection:"row",
                            width:"100%",
                            alignItems:"center"
                        }}>
                            <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2" style={{
                                width:"50%",

                            }}>Product</span>
                            <div style={{
                                width:"50%",
                                justifyContent:"space-between",
                                display:"flex",
                                flexDirection:'row'
                            }}>
                                <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2" style={{width:"30%"}}>Size</span>
                                <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2" style={{width:"30%"}}>Qty</span>
                                <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2" style={{width:"30%"}}>Total</span>
                            </div>
                        </div>


                            <div style={{
                                border:"0.5px solid black",
                                opacity:'0.2',
                                marginTop:"10px"
                            }}/>
                        {cart.success && cart.data.map((item)=>(
                            <div key={item._id}>
                                <div style={{
                            display:'flex',
                            flexDirection:"row",
                            width:"100%",
                            alignItems:"center",
                            marginTop:'20px'
                        }}>
                            <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2" style={{
                                width:"50%",
                                display:"flex",
                                flexDirection:"row",
                                alignItems:"center",
                                gap:"12px"
                            }}><img className="w-20 h-24" src={item.products.productImages[0]} />
                            <div>
                                <p className="text-[10px] tracking-[0.2em] uppercase text-[#C8A96E] mb-0.5">{item.products.brandName}</p>
                                <p className="text-sm text-foreground mb-1" style={{
                                fontFamily:'Playfair Display',
                                fontSize:"0.7rem"
                                }}>{item.products.productName}</p>
                               
                            </div>
                            
                            </span>
                            <div style={{
                                width:"50%",
                                justifyContent:"space-between",
                                display:"flex",
                                flexDirection:'row',
                                
                            }}>
                                <span style={{width:"30%"
                                }}>
                                    <span style={{width:"fit-content",
                                display:"flex",
                                flexDirection:"row",
                                alignItems:"center",
                                gap:"10px",
                                border:"0.2px solid black",
                                paddingRight:"5px",
                                paddingLeft:'5px',
                                
                              
                                }}>
                                   
                                    <p style={{
                                        fontFamily:"inter",
                                        width:"fit-content",
                                        fontSize:"0.75rem"
                                    }}>{item.productSize}</p>
                                   
                                </span>

                                    
                                
                                </span>
                                <span style={{width:"30%"}}>
                                    <span style={{
                                        fontFamily:"Playfair Display",
                                        fontSize:'0.75rem',
                                        display:"flex",
                                        alignItems:"center",
                                        border:"0.2px solid black",
                                        width:'fit-content',
                                        paddingLeft:'5px',
                                        paddingRight:'5px'
                                    }}>
                                        {item.quantity}
                                    </span>
                                
                                </span>
                                <span style={{width:"30%"}}>
                                    <span style={{
                                        fontFamily:"Poppins",
                                        fontSize:'0.9rem',
                                        display:"flex",
                                        alignItems:"center",
                                        width:'fit-content',
                                        
                                    }}>
                                        ₹ {item.price}
                                    </span>
                                </span>
                                  <span style={{
                                    width:"5%",
                                    cursor:"pointer"
                                }}>
                                    <Delete onClick={()=>deletingItemsFromCart(String(item.products._id))} size={20} style={{color:"red"}}/>
                                </span>
                            </div>
                        </div>
                            </div>
                        ))}
                          
                            


                    </div>


                    {/* Right hand side for the cart page */}

                     <div  style={{
                    width:"100%",
                    paddingTop:"3rem",
                    paddingBottom:"3rem",
                    paddingRight:"1.5rem",
                    paddingLeft:"1.5rem",
                    display:"flex",
                    flexDirection:"column",
                    marginTop:"5rem",
                    backgroundColor:"whitesmoke",
                    boxShadow:"0px 0px 2px 2px #F7F5F0"
                }}>
                    <h2 style={{
                        fontWeight:'500',

                    }} className="font-['Playfair_Display'] text-foreground mb-6">Order Summary</h2>
                    <div style={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:'center',
                        marginTop:"1.3rem"
                    }}>
                        <span  style={{fontFamily:"Inter",opacity:"0.5", fontSize:"0.8rem"}} className="text-foreground/50">Subtotal</span>
                        <span style={{fontSize:"0.8rem"}}>₹ {shippingCharges.subTotal}</span>
                    </div>
                     <div style={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:'center',
                        marginTop:"1.3rem"
                    }}>
                         <span style={{fontFamily:"Inter",opacity:"0.5", fontSize:'0.8rem'}} className="text-foreground/50">Shipping</span>
                        <span style={{fontSize:"0.8rem"}}>₹ {shippingCharges.charges}</span>
                    </div>
                    <div style={{border:"0.2px solid black", opacity:"0.3", marginTop:"20px"}}/>
                     <div style={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:'center',
                        marginTop:"1.3rem"
                    }}>
                         <span style={{fontFamily:"Inter",opacity:"0.5",fontSize:"0.8rem"}} className="text-foreground/50">Total</span>
                        <span style={{fontSize:"1rem",fontWeight:"500"}}>₹ {shippingCharges.price}</span>
                    </div>
                    <div className="flex items-stretch gap-0" style={{
                        marginTop:"1.7rem"
                    }}>
                        <input style={{
                            paddingRight:"10px",
                            paddingLeft:"10px",
                            paddingTop:"14px",
                            paddingBottom:"14px"
                        }} type="text" placeholder="PROMO CODE" className="flex-1 bg-[#F7F5F0] text-xs outline-none placeholder:text-foreground/30 border border-r-0 border-black/10 focus:border-[#C8A96E] transition-colors"/>
                        <button style={{
                            paddingRight:"10px",
                            paddingLeft:"10px",
                            paddingTop:"14px",
                            paddingBottom:"14px",
                            
                        }} className="bg-[#0D0D0D] text-white text-xs tracking-wider hover:bg-[#C8A96E] hover:text-[#0D0D0D] transition-colors">Apply</button>
                    </div>
                     <NavLink to={'/shop/items/payment'}>
                    <button style={{
                        marginTop:"2rem",
                        paddingTop:"15px",
                        paddingBottom:"15px",
                        paddingLeft:"10px",
                        paddingRight:"10px"
                    }} className="w-full bg-[#0D0D0D] text-white py-4 flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase hover:bg-[#C8A96E] hover:text-[#0D0D0D] transition-colors">PROCEED TO PAYMENT</button>
                    </NavLink>
                </div>
                </div>

            </>
            }


            {/* for small screens of width less than 770px */}
            {
            smallScreen &&
            <>  
                {cart.success && cart.data.map((item)=>(
                      <div key={item._id} style={{
                   
                    marginTop:"3rem",
                    paddingLeft:"3rem",
                    paddingRight:"3rem",
                    display:'flex',
                    flexDirection:"column",
                    width:'100%'
                }}>
                       <div style={{
                        display:'flex',
                        flexDirection:"column",
                        width:'100%'
                    }}>
                        <div style={{
                            width:"100%",
                            display:"flex",
                            flexDirection:"row",
                            justifyContent:"space-between",
                            alignItems:"center"
                        }}>
                            <div style={{
                                display:"flex",
                                flexDirection:"column",
                                gap:"10px",
                                width:"50%"
                            }}>
                                  <span style={{
                                    width:"5%",
                                    cursor:"pointer"
                                }}>
                                    <Delete onClick={()=>deletingItemsFromCart(String(item.products._id))} size={20} style={{color:"red"}}/>
                                </span>
                                <div style={{
                                    display:"flex",
                                    flexDirection:"row",
                                    alignItems:"center",
                                    gap:"10px",
                                    width:'100%'
                                }}>
                                    <img className="w-20 h-24" src={item.products.productImages[0]} alt="logo"  />
                                    <div>
                                     <p className="text-[10px] tracking-[0.2em] uppercase text-[#C8A96E] mb-0.5">Maison Black</p>
                                    <p className="text-sm text-foreground mb-1" style={{
                                    fontFamily:'Playfair Display',
                                    fontSize:"0.7rem"
                                    }}>Platform Chelsea</p>
                                    </div>
                                </div>
                                <div style={{
                                    display:"flex",
                                    flexDirection:"row",
                                    alignItems:'center',
                                    gap:"7px",
                                    marginTop:'5px',
                                    width:"fit-content",
                                    border:'0.1px solid black',
                                    paddingLeft:"10px",
                                    paddingRight:'10px'
                                    
                                }}>
                                    
                                    <span style={{fontFamily:"Poppins", fontSize:"0.75rem"}}>{item.quantity}</span>
                               
                                </div>
                            </div>


                            <div style={{
                                width:"50%",
                                display:"flex",
                                flexDirection:"row",
                                justifyContent:"flex-end",
                               
                                marginTop:'6.65rem'
                            }}>
                                <span style={{fontSize:'0.90rem', fontWeight:"500", fontFamily:"inter"}}>₹ {item.price}</span>
                            </div>
                        </div>
                    </div>
                    </div>
                ))}
                <div style={{
                   
                    marginTop:"3rem",
                    paddingLeft:"3rem",
                    paddingRight:"3rem",
                    display:'flex',
                    flexDirection:"column",
                    width:'100%'
                }}>
                             <div  style={{
                    width:"100%",
                    paddingTop:"3rem",
                    paddingBottom:"3rem",
                    paddingRight:"1.5rem",
                    paddingLeft:"1.5rem",
                    display:"flex",
                    flexDirection:"column",
                    marginTop:"5rem",
                    backgroundColor:"whitesmoke",
                    boxShadow:"0px 0px 2px 2px #F7F5F0"
                }}>
                    <h2 style={{
                        fontWeight:'500',

                    }} className="font-['Playfair_Display'] text-foreground mb-6">Order Summary</h2>
                    <div style={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:'center',
                        marginTop:"1.3rem"
                    }}>
                        <span  style={{fontFamily:"Inter",opacity:"0.5", fontSize:"0.8rem"}} className="text-foreground/50">Subtotal</span>
                        <span style={{fontSize:"0.8rem"}}>₹ {shippingCharges.subTotal}</span>
                    </div>
                     <div style={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:'center',
                        marginTop:"1.3rem"
                    }}>
                         <span style={{fontFamily:"Inter",opacity:"0.5", fontSize:'0.8rem'}} className="text-foreground/50">Shipping</span>
                        <span style={{fontSize:"0.8rem"}}>₹ {shippingCharges.charges}</span>
                    </div>
                    <div style={{border:"0.2px solid black", opacity:"0.3", marginTop:"20px"}}/>
                     <div style={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:'center',
                        marginTop:"1.3rem"
                    }}>
                         <span style={{fontFamily:"Inter",opacity:"0.5",fontSize:"0.8rem"}} className="text-foreground/50">Total</span>
                        <span style={{fontSize:"1rem",fontWeight:"500"}}>₹ {shippingCharges.price}</span>
                    </div>
                    <div className="flex items-stretch gap-0" style={{
                        marginTop:"1.7rem"
                    }}>
                        <input style={{
                            paddingRight:"10px",
                            paddingLeft:"10px",
                            paddingTop:"14px",
                            paddingBottom:"14px"
                        }} type="text" placeholder="PROMO CODE" className="flex-1 bg-[#F7F5F0] text-xs outline-none placeholder:text-foreground/30 border border-r-0 border-black/10 focus:border-[#C8A96E] transition-colors"/>
                        <button style={{
                            paddingRight:"10px",
                            paddingLeft:"10px",
                            paddingTop:"14px",
                            paddingBottom:"14px",
                            
                        }} className="bg-[#0D0D0D] text-white text-xs tracking-wider hover:bg-[#C8A96E] hover:text-[#0D0D0D] transition-colors">Apply</button>
                    </div>
                      <NavLink to={'/shop/items/payment'}>
                    <button  style={{
                        marginTop:"2rem",
                        paddingTop:"15px",
                        paddingBottom:"15px",
                        paddingLeft:"10px",
                        paddingRight:"10px"
                    }} className="w-full bg-[#0D0D0D] text-white py-4 flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase hover:bg-[#C8A96E] hover:text-[#0D0D0D] transition-colors">PROCEED TO PAYMENT</button>
                    </NavLink>
                </div>
                </div>
            </>
            }
        </>
    )
};
export default CartPage;