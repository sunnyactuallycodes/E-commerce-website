import {ArrowLeft, Heart, ShoppingBag, Star, Truck,RotateCcw, Shield,ChevronUp,ChevronDown,} from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import { useLoadingBar } from 'react-top-loading-bar';
import { X } from 'lucide-react';
import SearchContext from '../context/SearchContext';
import AuthContext from '../context/AuthContext';
import LoadingBar from '../utils/LoadingBar';

function ProductsDetails(){
    // context to check whether the user is there or not
   
    const {loggedUser, loggingFunction,logoutFunction, loadingLog}= useContext
    (AuthContext);
   
    const [responseFromBackend, setResponseFromBackend]= useState({});
    console.log(responseFromBackend);
  
    const [products_all, setProducts_all]= useState({});

    const {searchOn , setSearchOn}= useContext(SearchContext);

    const [source, setSource]= useState("");
   
    //the loading bar for the user login and signup which will appear on the top 
    const {start, complete}= useLoadingBar({
        color:'blue',
        height:'2'
    });

    // if the user is not logged in he will be logged in from here also. 
    const [account, setAccount] = useState(false);
    const [name, setName]= useState("");
    const [phoneNumber, setPhoneNumber]= useState(0);
    const [password, setPassword]= useState("");
    const [signup, setSignup]= useState(false);
    const [messages, setMessages]= useState({});
    const [loginMessage, setLoginMessage]= useState({});

    // for checking if the productSize is clicked 
    const [isProductSize, setIsProductSize]= useState();

   

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
    };

    // for user login
    const gettingBackUserInformationToClient= async(e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            start();
            const backendRes= await axios.post("https://e-commerce-website-lac-eight.vercel.app/api/v1/login",{phoneNumber, password}, {withCredentials:true}).then((response)=>{setLoginMessage(response.data); loggingFunction(response.data.user)});
            await loggingFunction(backendRes.data.user);
            setLoading(false);
            complete();
            setAccount(false);
            window.location.reload();
           
        } catch (error) {
            console.error("An internal server error occured: ", error);
            complete();
            return toast.error("Server Error");
        }
    };

    // fetching products from backend 
    const fetchingProductsFromBackend = async()=>{
        try {
            setLoading(true);
            const backendResponse = await axios.get("https://e-commerce-website-lac-eight.vercel.app/api/v1/fetchAllProducts", {withCredentials:true});
            const response = await backendResponse.data;
            setProducts_all(response);
            setLoading(false);
            
        } catch (error) {
            console.error("internal server error occured while fetching the data: ", error);
            return toast.error("Can't load Products");
        }
    };


    //adding product to the cart with the quantity
    const addToProductToCart = async(e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const backendResponse= await axios.post(`https://e-commerce-website-lac-eight.vercel.app/api/v1/post/cart/${productId}`,{quantity,productSize},{withCredentials:true});
            const response =await backendResponse.data;
            setCartMessage(response);
            setLoading(false);
            toast.success("Item successfully added to the cart");
        } catch (error) {
            console.error("An internal server occured while adding your product to the cart");
            return toast.error("Server Timeout");
        }
    };

    const addingProductToFavourites = async(productId)=>{
        try {
            setLoading(true);
            const backendRes = await axios.get(`https://e-commerce-website-lac-eight.vercel.app/api/v1/favourite/${productId}`, {withCredentials:true});
            const response= await backendRes.data;
            setResponseFromBackend(response);
            console.log(response);
            setLoading(false);
            return toast.success("successfully added the product to favourite");
        } catch (error) {
            console.error("there is a client side error during adding favourite to the list: ", error);
        }
    };

    //receiving response message from the cart controller 
    const [cartMessage, setCartMessage]= useState({});

    //sending the size to the backend server 
    const [productSize, setProductSize]= useState(3);
  
    const [sizeIsClicked, setSizeIsClicked]= useState(false);



    //fallback till the data loads 
    const [loading, setLoading]= useState(false);

    const [quantity, setQuantity]= useState(1);

    const parameter = useParams();
    const {productId}= parameter;
  // from the URL of the webpage the data will be transmitted to backend. 

    //fetching the backend data from this function 
    const [oneProductOnly,setOneProductOnly]= useState({});
   

    //function to fetch the products details 
    const fetchOneProductFromData= async()=>{
        try {
            setLoading(true);
            const backendResponse =await axios.get(`https://e-commerce-website-lac-eight.vercel.app/api/v1/fetchOneProducts/${productId}`,{withCredentials:true});
            const response = await backendResponse.data;
            setOneProductOnly(response);
            setLoading(false);
            // toast.success("Data Loaded");
        } catch (error) {
            console.error("An error encountered while fetching the product details: ", error);
            return toast.error("Server Failed To load");
        }
    };

    //if user is not there and the user is trying to add products to the cart 
    const loginErrorMessage= ()=>{
        toast.error("Please login to add to cart");
    };

    // useEffect to synchronise with the external API
    useEffect(()=>{ 
        fetchingProductsFromBackend();
        fetchOneProductFromData();
        setSearchOn(false);
    },[]);

    const middleView = useMediaQuery({maxWidth:"850px"});
   
    const mobileView1 = useMediaQuery({maxWidth:'550px'})
    const desktopView1 = useMediaQuery({maxWidth:'770px'});
    const middleView1 = useMediaQuery({maxWidth:'1000px'});
    const finalView1 = useMediaQuery({maxWidth:"1500px"});
    

    
    const categoryProducts =oneProductOnly.success && products_all.success && products_all.data.filter((p)=>p.category===oneProductOnly.data.category);
    const relatedProducts =oneProductOnly.success && products_all.success &&  categoryProducts.slice(0,4);
    

    const renderingProducts=[
        {
            id:9891249,
            src:"https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price:'₹149',
            name:"Drift Low Trainer",
            brand:"Maison Blanc"
        },
        {
            id:1,
            src:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price:'₹419',
            name:"Arc Wool Coat",
            brand:'Studio Forty'
        },
        {
            id:8999,
            src:"https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1011&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price:"₹200",
            name:"desert boot classic",
            brand:'Cord and Sole'
        }];



    const finalView = useMediaQuery({maxWidth:"1500px"});
    const [selectedColor, setSelectedColor]= useState(0);
    const sizes = [
        38, 39, 40,41,42, 43, 44, 45
    ];
    const [expandedSection, setExpandedSection] = useState("description");
    const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
 

    const products = {
        details:[
            'Best Fabric',
            'Suited for Summer',
            'Well embroidered'
        ]
    };
    const accordionItems = [
    {
      key: "description",
      label: "Description",
      content: `${oneProductOnly.success && oneProductOnly.data.productDescription?oneProductOnly.data.productDescription:"Best product for your usage"}`
    },
    {
      key: "details",
      label: "Product Details",
      content: (
        <ul className="space-y-1.5">
           {
            !oneProductOnly.success && products.details.map((d,i)=>(
                <li key={i} className="text-sm text-foreground/60 flex items-start gap-2">
              <span className="text-[#C8A96E] mt-1.5 shrink-0">–</span> {d}
            </li> 
            ))
           } 
          {oneProductOnly.success && oneProductOnly.data.productDetails.map((d, i) => (
            <li key={i} className="text-sm text-foreground/60 flex items-start gap-2">
              <span className="text-[#C8A96E] mt-1.5 shrink-0">–</span> {d}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "shipping",
      label: "Shipping & Returns",
      content: "Free standard shipping on all orders over ₹150. Express delivery available at checkout. Free returns within 30 days — no questions asked.",
    },
  ];


    
    const colours = [
        {
            id:19410,
            color:'red'
        },
         {
            id:19411,
            color:'black'
        },
         {
            id:19412,
            color:'blue'
        },
         {
            id:19431,
            color:'gold'
        }

    ];


    return(
      
        <>

          <ToastContainer/>


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

        {
            loading && <LoadingBar/>
        }
        <div style={{
            paddingLeft:'3rem',
            paddingRight:'3rem',
            paddingTop:"1.2rem",
            paddingBottom:"1.2rem",
            marginTop:'5rem'
        }}>
            <NavLink to={'/shop'}>
            <button
          className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-foreground/50 hover:text-foreground transition-colors"
        >
          <ArrowLeft size={13} />
           Back to Shop
        </button>
        </NavLink>
        </div>
        <div style={{
            paddingLeft:"3rem",
            paddingRight:"3rem",
            paddingTop:"1.3rem",
            paddingBottom:"1.3rem",
            width:'100vw'
        }}>

            {
                !middleView && oneProductOnly.success && 
                <>
                 <div style={{
                    display:"flex",
                    flexDirection:'row',
                    gap:"10px",
                    width:"100%",
                    height:'90vh'
                }}>
                    
                    <div style={{
                        width:"55%",
                        display:'flex',
                        flexDirection:'row',
                        gap:"5px"
                    }}>
                        <div style={{
                            width:"17.5%",
                            display:"flex",
                            flexDirection:"column",
                            gap:"10px"
                        }}>
                        <img onClick={()=>setSource(oneProductOnly.data.productImages[0])} src={oneProductOnly.data.productImages[0]}
                         alt="" style={{
                            width:'100%',
                            height:'15vh'
                        }}/>
                        <img onClick={()=>setSource(oneProductOnly.data.productImages[1])} src={oneProductOnly.data.productImages[1]}
                            alt=""  style={{
                              width:'100%',
                            height:'15vh'
                        }} />
                        <img onClick={()=>setSource(oneProductOnly.data.productImages[2])} src={oneProductOnly.data.productImages[2]} alt=""  style={{
                             width:'100%',
                            height:'15vh'
                        }} />
                          <img onClick={()=>setSource(oneProductOnly.data.productImages[3])} src={oneProductOnly.data.productImages[3]} alt=""  style={{
                             width:'100%',
                            height:'15vh'
                        }} />

                        </div>
                        <div style={{
                            width:"75%"
                        }}>
                         <img src={source || oneProductOnly.data.productImages[0]} alt="" style={{
                            width:'100%',
                            height:'100%'
                    }} />
                    </div>
                    </div>
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        width:"45%",
                        gap:'10px'
                    }}>
                        <div style={{
                            display:"flex",
                            flexDirection:"row",
                            justifyContent:"space-between"
                        }}>
                            <p className='text-xs tracking-[0.25em] uppercase text-[#C8A96E]'>{oneProductOnly.data.brandName || 'maison black'}</p>
                            <div style={{
                                display:'flex',
                                flexDirection:'row',
                                gap:'3px',
                                alignItems:'center'
                            }}>
                                 <Star
                     
                      size={12}
                      className= "fill-[#C8A96E] stroke-[#C8A96E]"/>
                      <span className='text-xs text-foreground/40'>(126)</span>
                            </div>
                        </div>
                        <h1 className='font-["Playfair_Display"] text-3xl md:text-4xl text-foreground mb-4'>{oneProductOnly.data.productName}</h1>
                       <span style={{
                        marginTop:'10px'
                       }} className='text-2xl text-foreground'>₹{oneProductOnly.data.Price}</span>
                       <p style={{
                        marginTop:"20px"
                       }}  className='text-xs tracking-[0.15em] uppercase text-foreground/50 mb-3'>Colour:<span className="text-foreground">{["Cream", "Black", "Tan", "Sage", "Gold"][selectedColor] || "Select"}</span></p>

                       <div style={{
                        display:'flex',
                        alignItems:'center',
                        gap:'5px',
                        marginTop:'5px'
                       }}>
                        {
                            colours.map((col)=>{
                                return(
                                    <div key={col.id}>
                                    <span style={{
                                        borderRadius:'50px',
                                        width:'35px',
                                        height:'35px',
                                        backgroundColor:`${col.color}`
                                    }}>
                                    </span>
                                    </div>
                                )
                            })
                        }
                       </div>
                       <p style={{
                        marginTop:'20px'
                       }} className='text-xs tracking-[0.15em] uppercase text-foreground/50'>Size:</p>
                        <div style={{
                            display:"grid",
                            gridTemplateColumns:"25% 25% 25% 25%",
                            columnGap:'10px',
                            rowGap:"10px"
                        }}>
                            {
                                oneProductOnly.data.productSize.map((size)=>
                                (
                                    <div key={size}>
                                    <span onClick={()=>{setProductSize(size); 
                                    setIsProductSize(size);
                                    toast.info(`${size} is selected`)}} style={{
                                        padding:'10px',
                                        border:'0.5px solid black',
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        cursor:'pointer',
                                        backgroundColor: isProductSize === size ? "#FFE082" : "#fff",
                                        color: isProductSize === size ? "red" : "black",
                                    }} className='text-xs tracking-wider hover:bg-amber-200'>
                                        {size}
                                    </span>
                                    </div>
                                ))
                            }
                        </div>
                        <div style={{
                            display:'flex',
                            flexDirection:"row",
                            justifyContent:'space-between',
                            alignItems:'cemter',
                            marginTop:"30px"
                        }}> 
                            <div style={{
                                display:'flex',
                                flexDirection:'row',
                                // gap:"3px",
                                alignItems:'center',
                                justifyContent:'space-around',
                                border:"0.5px solid black",
                                paddingLeft:'10px',
                                paddingRight:'10px',
                                paddingTop:'10px',
                                paddingBottom:'10px'
                            }}>
                                <span onClick={(prev)=>setQuantity(quantity-1)} style={{
                                    opacity:'0.8',
                                    padding:'4px',
                                    cursor:"pointer"
                                }}>-</span>
                                <span className='text-xs tracking-wider' style={{
                                     paddingLeft:"30px",
                                    paddingRight:'30px',
                                    display:"inline-block",
                                    textAlign:'center',
                                    maxWidth:"100px"
                                }}>{quantity}</span>
                                <span onClick={()=>setQuantity(quantity+1)} style={{
                                    opacity:'0.8',
                                    padding:'4px',
                                    cursor:"pointer"
                                }}>+</span>
                            </div>
                            <div style={{
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                width:'40%',
                                gap:'10px',
                                backgroundColor:"black",
                                color:'white'
                            }}>

                                <ShoppingBag size={14}/>
                                <button type='submit' onClick={loggedUser?addToProductToCart:()=>setAccount(!account)} className='text-xs tracking-[0.2em] uppercase'>{!loggedUser?`SIGNUP`:`ADD TO CART`}</button>
                            </div>
                        <div onClick={()=>{addingProductToFavourites(String(oneProductOnly.data._id));}} style={{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'center',
                            backgroundColor:`${responseFromBackend?.success?"red":""}`,
                           
                            alignItems:'center',
                            border:'0.5px solid black',
                            width:'10%'
                        }}>
                            <Heart size={14}/>
                        </div>
                          
                        </div>
                    
                    
                    <div className="grid grid-cols-3 gap-4 border-black/8 pt-8" style={{
                        marginTop:'50px',
                        opacity:'0.7'
                    }}>
              {[
                { icon: Truck, label: "Free Shipping", sub: "Orders over ₹150" },
                { icon: RotateCcw, label: "Free Returns", sub: "30-day window" },
                { icon: Shield, label: "Authentic", sub: "100% guaranteed" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <Icon size={18} className="text-foreground/30" />
                  <p className="text-xs text-foreground/60">{label}</p>
                  <p className="text-[10px] text-foreground/30">{sub}</p>
                </div>
              ))}
            </div>
            <div style={{
                border:'0.5px solid black',
                opacity:'0.2',
                width:'100%',
                marginTop:'1rem'
            }}>
            </div>
            <div style={{
                display:"flex",
                flexDirection:'column',
                justifyContent:"space-evenly",
                height:'100%'
            }} className="">
              {oneProductOnly.success && accordionItems.map((item) => (
                <div key={item.key} className="border-b border-black/10">
                  <button
                    onClick={() => toggleSection(item.key)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-xs tracking-[0.15em] uppercase">{item.label}</span>
                    {expandedSection === item.key ? (
                      <ChevronUp size={14} className="text-foreground/40" />
                    ) : (
                      <ChevronDown size={14} className="text-foreground/40" />
                    )}
                  </button>
                  {expandedSection === item.key && (
                    <div className="pb-5 text-sm text-foreground/60 leading-relaxed">
                      {typeof item.content === "string" ? <p>{item.content}</p> : item.content}
                    </div>
                  )}
                </div>
              ))}
        
            </div>
                </div>
                </div>
                   
                </>
            }


         

            {
                middleView && oneProductOnly.success && 
                <>
                <div style={{
                    minHeight:'20vh',
                    width:"100%"
                }}>
                    <img src={source || oneProductOnly.data.productImages[0]} alt="f1" style={{
                        height:"100%",
                        width:"100%"
                    }} />
                </div>
                <div style={{
                    marginTop:"10px",
                    display:'flex',
                    flexDirection:'row',
                    alignItems:"center",
                    justifyContent:"space-between"
                }}>
                    <img onClick={()=>setSource(oneProductOnly.data.productImages[0])} style={{
                        height:"15vh",
                        width:'24%'
                    }}  src={oneProductOnly.data.productImages[0]}/>
                    <img onClick={()=>setSource(oneProductOnly.data.productImages[1])} style={{
                        height:"15vh",
                        width:'24%'
                    }}
                    src={oneProductOnly.data.productImages[1]}/>
                    <img onClick={()=>setSource(oneProductOnly.data.productImages[2])} style={{
                        height:"15vh",
                        width:'24%'
                    }} src={oneProductOnly.data.productImages[2]}/>
                    <img onClick={()=>setSource(oneProductOnly.data.productImages[3])} style={{
                        height:"15vh",
                        width:'24%'
                    }} src={oneProductOnly.data.productImages[3]}/>
                </div>
                <div style={{
                    marginTop:"3rem",
                    width:'100%'
                }}>
                    <div style={{
                       display:'flex',
                       justifyContent:'space-between',
                       alignItems:"center"
                    }}>
                     <p className='text-xs tracking-[0.25em] uppercase text-[#C8A96E]'>{oneProductOnly.data.brandName}</p>
                     <div style={{
                                display:'flex',
                                flexDirection:'row',
                                gap:'3px',
                                alignItems:'center'
                            }}>
                                 <Star
                     
                      size={12}
                      className= "fill-[#C8A96E] stroke-[#C8A96E]"/>
                      <span className='text-xs text-foreground/40'>(126)</span>
                    </div>
                    </div>
                    

                    <div style={{marginTop:"10px"}}>
                        <h1 className='font-["Playfair_Display"] text-3xl md:text-4xl text-foreground mb-4'>{oneProductOnly.data.productName}</h1>
                    </div>
                    <div style={{marginTop:'10px'}}>
                        <span style={{
                           fontFamily:'Inter'
                       }} className='text-2xl text-foreground'>₹ {oneProductOnly.data.Price}</span>
                    </div>

                     <p style={{
                        marginTop:'20px'
                       }} className='text-xs tracking-[0.15em] uppercase text-foreground/50'>Size:</p>
                        <div style={{
                            display:"grid",
                            gridTemplateColumns:"23.8% 23.8% 23.8% 23.8%",
                            columnGap:'10px',
                            rowGap:"10px",
                            marginTop:"10px"
                        }}>
                            {
                                oneProductOnly.data.productSize.map((size)=>
                                (
                                    <div key={size}>
                                    <span onClick={()=>{
                                        setIsProductSize(size);
                                        setProductSize(size);
                                     }
                                    } style={{
                                        padding:'10px',
                                        border:'0.5px solid black',
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        backgroundColor: isProductSize === size ? "#FFE082" : "#fff",
                                        color: isProductSize === size ? "red" : "black",
                                    }} className='text-xs tracking-wider'>
                                        {size}
                                    </span>
                                    </div>
                                ))
                            }
                        </div>
                        <div style={{
                            display:"flex",
                            flexDirection:"row",
                            width:"100%",
                            gap:'10px',
                            marginTop:"2.5rem",
                            alignItems:"center"
                        }}>
                            <div style={{width:"21.5%",padding:"10px",display:'flex',flexDirection:"row",alignItems:"center",justifyContent:'space-between',border:"0.2px solid black"}}>
                                 <span onClick={()=>setQuantity(quantity-1)}>-</span>
                                 <span style={{
                                    fontFamily:"Inter",
                                    fontSize:"0.8rem"
                                 }}>{quantity}</span>
                                 <span onClick={()=>setQuantity(quantity+1)}>+</span>

                            </div>
                            <div style={{width:"58%", display:"flex",flexDirection:"row",alignItems:"center",justifyContent:'center', gap:"5px", color:"white", backgroundColor:"black",padding:'12.53px'}}>
                                <ShoppingBag size={20}/>
                                <button onClick={loggedUser?addToProductToCart:()=>setAccount(!account)} style={{
                                    fontWeight:'500'
                                }} className='text-xs tracking-[0.2em] uppercase'>ADD TO CART</button>


                            </div>
                            <div style={{width:"21.5%", display:"flex",alignItems:"center",justifyContent:"center",border:"0.2px solid black",padding:"12px"}}>
                                <Heart size={20}/>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 border-black/8 pt-8" style={{
                        marginTop:'50px',
                        opacity:'0.7'
                        }}>
                        {[
                            { icon: Truck, label: "Free Shipping", sub: "Orders over ₹150" },
                            { icon: RotateCcw, label: "Free Returns", sub: "30-day window" },
                            { icon: Shield, label: "Authentic", sub: "100% guaranteed" },
                        ].map(({ icon: Icon, label, sub }) => (
                            <div key={label} className="flex flex-col items-center text-center gap-1.5">
                            <Icon size={18} className="text-foreground/30" />
                            <p className="text-xs text-foreground/60">{label}</p>
                            <p className="text-[10px] text-foreground/30">{sub}</p>
                            </div>
                        ))}
                        </div>
                        <div style={{marginTop:"2rem"}}/>
                        <div style={{
                display:"flex",
                flexDirection:'column',
                gap:"20px"
                }} className="">
              {oneProductOnly.success && accordionItems.map((item) => (
                <div key={item.key} className="border-b border-black/10">
                  <button
                    onClick={() => toggleSection(item.key)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-xs tracking-[0.15em] uppercase">{item.label}</span>
                    {expandedSection === item.key ? (
                      <ChevronUp size={14} className="text-foreground/40" />
                    ) : (
                      <ChevronDown size={14} className="text-foreground/40" />
                    )}
                  </button>
                  {expandedSection === item.key && (
                    <div className="pb-5 text-sm text-foreground/60 leading-relaxed">
                      {typeof item.content === "string" ? <p>{item.content}</p> : item.content}
                    </div>
                  )}
                </div>
              ))}
        
            </div>

                </div>
                    
              </>
            }










            {/* You may also like section for the website to get related products here with the help of the category */}
            <div style={{
                marginTop:'5rem'
            }}>
                <h2 style={{
                    fontWeight:'450'
                }} className='font-["Playfair_Display"] text-3xl text-foreground'>You May Also Like</h2>
                  {
                    products_all.success  && middleView1 && !desktopView1 &&  
                     <>
                      <div style={{
                    display:"grid",
                    gridTemplateColumns:'32% 32% 32%',
                    columnGap:'19.7px',
                    rowGap:'20px',
                    width:"100%",
                    marginTop:'3rem'
                }}>
                 {

                 oneProductOnly.success && relatedProducts.map((product)=>(
                    <div key={product._id}>
                     <NavLink to={`/shop/${product._id}`} onClick={()=>window.location.href=`/shop/${product._id}`}>
                    <div key={products.id} style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'5px'
                    }}>
                        <img src={product.productImages[0]} alt="logo" style={{
                            width:"100%",
                            height:`${mobileView1?'30vh':'50vh'}`
                        }} />
                        <div style={{
                            display:'flex',
                            flexDirection:"row",
                            justifyContent:"space-between"
                        }}>
                            <div style={{
                                display:'flex',
                                flexDirection:"column",
                                gap:"5px"
                            }}>
                                 <p style={{
                                    marginTop:'10px',
                                    fontFamily:"Inter",
                                    color:"#C8A96E"
                                }} className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{product.brandName}</p>
                                <p style={{
                                    fontFamily:"Inter",
                                }} className="text-sm text-foreground hover:text-[#C8A96E] transition-colors">{product.productName}</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">₹ {product.Price}</p>

                            </div>
                        </div>
                    
                    </NavLink>
                    </div>
                ))
            }

              
            </div>
            
                     </>
                  }
                     {products_all.data &&  desktopView1 && 
                     <>
             <div style={{
                marginTop:"3rem",
                display:'grid',
                width:'100%',
                gridTemplateColumns:'49.6% 49.6%',
                columnGap:"19.7px",
                rowGap:'20px'
            }}>
            {
                 oneProductOnly.success && products_all.data && relatedProducts.map((product)=>(
                      <div key={product._id}>
                       <NavLink to={`/shop/${product._id}`} onClick={()=>window.location.href=`/shop/${product._id}`}>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'5px'
                    }}>
                        <img src={product.productImages[0]} alt="logo" style={{
                            width:"100%",
                            height:`${mobileView1?'30vh':'50vh'}`
                        }} />
                        <div style={{
                            display:'flex',
                            flexDirection:"row",
                            justifyContent:"space-between"
                        }}>
                            <div style={{
                                display:'flex',
                                flexDirection:"column",
                                gap:"5px"
                            }}>
                                 <p style={{
                                    marginTop:'10px',
                                    fontFamily:"Inter",
                                    color:"#C8A96E"
                                }} className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{product.brandName || "maison black"}</p>
                                <p style={{
                                    fontFamily:"Inter",
                                }} className="text-sm text-foreground hover:text-[#C8A96E] transition-colors">{product.productName}</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">$ {product.Price}</p>

                            </div>
                        </div>
                      </NavLink>
                    
                    </div>
                ))
            }

           
            </div>
            
                     </>
                     }
                        {  finalView1 && !middleView1  &&
            <>
             <div style={{
                marginTop:"3rem",
                display:'grid',
                width:'100%',
                gridTemplateColumns:'24% 24% 24% 24%',
                columnGap:"19.7px",
                rowGap:'20px'
            }}>
            {
                 oneProductOnly.success && products_all.data && relatedProducts.map((product)=>(
                    <div key={product._id}>
                    <NavLink to={`/shop/${product._id}`} onClick={()=>window.location.href=`/shop/${product._id}`}>
                    <div key={product.id} style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'5px'
                    }}>
                        <img src={product.productImages[0]} alt="logo" style={{
                            width:"100%",
                            height:`${mobileView1?'30vh':'50vh'}`
                        }} />
                        <div style={{
                            display:'flex',
                            flexDirection:"row",
                            justifyContent:"space-between"
                        }}>
                            <div style={{
                                display:'flex',
                                flexDirection:"column",
                                gap:"5px"
                            }}>
                                 <p style={{
                                    marginTop:'10px',
                                    fontFamily:"Inter",
                                    color:"#C8A96E"
                                }} className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{product.brandName || "Maison Black"}</p>
                                <p style={{
                                    fontFamily:"Inter",
                                }} className="text-sm text-foreground hover:text-[#C8A96E] transition-colors">{product.productName}</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">$ {product.Price}</p>

                            </div>
                        </div>
                    </NavLink>

                    </div>
                ))
            }
            </div>
            
            </>
            }


            </div> 

            

        </div>
        </>
    )
};
export default ProductsDetails;