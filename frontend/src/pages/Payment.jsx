import { useContext, useEffect } from "react";
import { useState } from "react";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import { ArrowLeft, Check, MapPinHouse,IndianRupee,User,CheckCircle, MapPin,Phone,Mail, ChevronDown } from "lucide-react";
import {NavLink, useNavigate} from 'react-router-dom';
import LocationContext from '../context/LocationContext.js';
import { useMediaQuery } from "react-responsive";
import SearchContext from "../context/SearchContext.js";
import LoadingBar from "../utils/LoadingBar.jsx";




function Payment(){

  // getting the shipping charges in the useState 
  const {searchOn, setSearchOn}= useContext(SearchContext);
  const [shippingCharges, setShippingCharges]= useState({});
  console.log(shippingCharges);



  // fixing one huge mistake which is setting the price on the localStorage which is quite vulnerable to guys like abhinav
  const uploadingLocationToBackend = async()=>{
        try {
            setLoading(true);
            const backendRes= await axios.get(`http://localhost:4000/api/v1/shippingCharges/${location.latitude}/${location.longitude}`,{withCredentials:true});
            const response = await backendRes.data;
            setShippingCharges(response);
            setLoading(false);
            return toast.success("Shipping Price Confirmed");
        } catch (error) {
            console.error("An unexpected error occured during uploading the location coordinates to the backend server: ", error);
            return toast.error("Server Timed out");
        }
    }




    // media queries for responsiveness 
    const middleView = useMediaQuery({maxWidth:"1000px"});


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail]=useState("");
    const [phoneNumber, setPhoneNumber]= useState(0);
    const [address, setAddress]= useState("");
    const [city, setCity]= useState("");
    const [state, setState]= useState("Delhi");
    const [pincode, setPincode]= useState("");
    const [address1, setAddress1]= useState("");

   const {location}= useContext(LocationContext);
    

    //fallback for loading screens
    const [loading, setLoading]= useState(false);

    //storing the responses from the backend server to client side 
    const [orderInformation, setOrderInformation]= useState(null);


    //useStates for rzp handling to provide sleak flow
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [orderStep, setOrderStep] = useState("");


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
            toast.success("Data loaded") && cart.success;
        } catch (error) {
            console.error("An internal server error occured while fetching your cart products: ", error);
            // return toast.error("Server Timeout");
        }
    };

   useEffect(()=>{
      fetchingProductsFromCart();
      uploadingLocationToBackend();
      setSearchOn(false);
    },[]);



    // function to inject the razorpay script to the frontend
      useEffect(() => {
  if (!document.getElementById("razorpay-script")) {
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }
}, []);


// doing payment based on cash on delivery which will be concluded by the owner himself and the delivery partner
const handlePaymentViaCashOnDelivery = async (e) => {
  e.preventDefault();
  if (loading) return;
  setError("");
  setLoading(true);
  try {
    setOrderStep("Creating Your Booking");
    const orderResponse = await axios.post(
      `http://localhost:4000/api/v1/payment/cashOnDelivery/${location.latitude}/${location.longitude}`,
      { firstName, lastName, email, city, address,address1, phoneNumber, state, pincode }, {withCredentials:true}
    );
    const orderData = orderResponse.data;
    if (!orderData.success) {
      setError(orderData.message || "Failed to create order. Please try again.");
      setLoading(false);
      return;
    };
    console.log("Your order data is loaded: ",orderData);
    setLoading(false);
    return toast.success("Cash on delivery done!!");
    
  }catch(error){
      console.error("There is a client side error while confirming your payment order via razorpay");
      return toast.error("Internal server error");
  }
};






const handlePayment = async (e) => {
  e.preventDefault();

  // Guard against double-submit / rapid re-invocation.
  // This alone can prevent runaway rzp.open() calls if the button
  // is clicked multiple times before loading state settles.
  if (loading) return;

  setError("");
  setLoading(true);

  try {
    setOrderStep("Creating Your Booking");
    const orderResponse = await axios.post(
      `http://localhost:4000/api/v1/cart/processingOrder/${location.latitude}/${location.longitude}`,
      { firstName, lastName, email, city, address,address1, phoneNumber, state, pincode }, {withCredentials:true}
    );
    const orderData = orderResponse.data;
    if (!orderData.success) {
      setError(orderData.message || "Failed to create order. Please try again.");
      setLoading(false);
      return;
    }
    console.log("Your order data is loaded: ",orderData);
    setOrderStep("Setting up payment gateway");
    const rzpOrderRes = await axios.post(
      "http://localhost:4000/api/v1/createOrder/rzpgateway",
      { price: shippingCharges.price },
      {withCredentials:true}
    );
    const rzpOrder = rzpOrderRes.data;
    if (!rzpOrder.id) {
      setError("Payment gateway error. Please try again.");
      setLoading(false);
      return;
    }

    setOrderStep("Opening payment window...");

    // BUG FIX: your object was named `option` (singular) but you passed
    // `options` (plural, undefined) into `new window.Razorpay(...)`.
    // This was throwing a ReferenceError on every call.
    const options = {
      key: import.meta.env.VITE_KEY_ID,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      name: "Ajay Shop",
      description: "Best Shop to shop online",
      order_id: rzpOrder.id,
      handler: async function (response) {
        setOrderStep("Verifying Payment...");
        try {
          const verifyRes = await axios.post(
            "http://localhost:4000/api/v1/verifyPayment/rzpgateway",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },{withCredentials:true}
          );

          // BUG FIX: `statusText` is a string property, not a function.
          // You need to read the actual response body your backend sends back.
          const verifyMessage = verifyRes.data?.message || "";
          if (
            verifyMessage.toLowerCase().includes("successfully") ||
            verifyMessage.toLowerCase().includes("completed")
          ) {
            setSuccess(true);
          } else {
            setError("Payment verification failed. Please contact support.");
          }
        } catch (error) {
          setError(
            "Verification error. Contact support with your payment ID: " +
              response.razorpay_payment_id
          );
        }
        setLoading(false);
        setOrderStep("");
      },
      theme: { color: "#0d3b2e" },
      modal: {
        ondismiss: () => {
          setLoading(false);
          setOrderStep("");
          setError("Payment was cancelled.");
        },
      },
    };

    // Reuse a single Razorpay instance rather than creating a new one
    // on every invocation — avoids piling up extra internal listeners.
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("there is a client side error: ", error);
    setError("Something went wrong. Please check your connection and try again.");
    setLoading(false);
    setOrderStep("");
  }
};

    return(
        <>
        <ToastContainer/>
        {
          loading && <LoadingBar/>
        }
        
        
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
                <NavLink to={'/shop/cart'}
                style={{
                    width:'fit-content'
                }}
                className="flex items-center gap-2 bg-[#0D0D0D] text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#C8A96E] hover:text-[#0D0D0D] transition-colors"
                >
                <ArrowLeft size={13} />
                back to cart
                </NavLink>
                <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase mb-3">Checkout</p>
                <h1 className="font-['Playfair_Display'] text-white text-5xl md:text-6xl">Delivery Details</h1>
                <div style={{
                 display:"flex",
                 flexDirection:'row',
                 gap:"8px",
                 marginTop:"15px",
                 alignItems:"center"
                }}>
                  <Check size={20} style={{borderRadius:"30px", color:"black",backgroundColor:"green",padding:'2px'}}/>
                  <p style={{
                    fontFamily:"Inter",
                    letterSpacing:'0.2rem',
                    color:"white",
                    fontSize:"0.6rem"
                  }}>BAG</p>
                  <div style={{width:"30px", border:'0.2px solid white', opacity:"0.4"}}/>
                  <MapPinHouse size={20} style={{borderRadius:"30px", color:"black",backgroundColor:"yellow",padding:'2px'}} />
                  <p style={{
                    fontFamily:"Inter",
                    letterSpacing:'0.2rem',
                    color:"white",
                    fontSize:"0.6rem"
                  }}>ADDRESS</p>
                  <div style={{width:"30px", border:'0.2px solid white', opacity:"0.4"}}/>
                  <IndianRupee  size={20} style={{borderRadius:"30px", color:"black",backgroundColor:"red",padding:'2px'}}/>
                   <p style={{
                    fontFamily:"Inter",
                    letterSpacing:'0.2rem',
                    color:"white",
                    fontSize:"0.6rem"
                  }}>PAYMENT</p>
                </div>                
            </div>
          </div>
      
        
        {/* for screens less than 1000px middle view */}
        {
          middleView && 
          <>
          <div style={{padding:"3rem", width:'100%'}}>
             <h2 style={{fontWeight:"450", marginTop:"2.5rem"}} className="font-['Playfair_Display'] text-2xl text-foreground mb-8">
                  Contact & Shipping
             </h2>
            <div style={{
              display:"flex",
              flexDirection:"column",
              marginTop:"40px",
              width:'100%'
            }}>
                <div style={{
                  display:"flex",
                  flexDirection:"row",
                  width:"100%",
                  alignItems:'center',
                  gap:"10px"
                }}>
                  <span className="uppercase" style={{
                  fontFamily:"Inter",
                  letterSpacing:"0.2rem",
                  opacity:'0.7',
                  fontSize:'0.75rem',
                  width:'50%'
                 
                }}>First Name</span>
                <span className="uppercase" style={{
                  fontFamily:"Inter",
                  letterSpacing:"0.2rem",
                  opacity:'0.7',
                  fontSize:'0.75rem',
                  width:"50%"
                  }}>
                    Last name
                </span>
                </div>
                <div style={{
                  display:'flex',
                  flexDirection:"row",
                  width:'100%',
                  alignItems:"center",
                  gap:"10px",
                  marginTop:'10px'
                }}>
                  <input placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} style={{padding:"10px",border:"0.2px solid black", width:"50%"}} type="text" />
                  <input value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Last Name" style={{padding:"10px", border:"0.2px solid black", width:'50%'}} type="text" />
                </div>
                <p className="uppercase" style={{
                  fontFamily:"Inter",
                  letterSpacing:"0.2rem",
                  opacity:'0.7',
                  fontSize:'0.75rem',
                  marginTop:"25px"
               }}>Email Address</p>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="First Name" style={{padding:"10px",border:"0.2px solid black", marginTop:'10px', width:"100%"}} type="text" />
              <p className="uppercase" style={{
                  fontFamily:"Inter",
                  letterSpacing:"0.2rem",
                  opacity:'0.7',
                  fontSize:'0.75rem',
                  marginTop:"25px"
               }}>phone number</p>
                <input value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} placeholder="First Name" style={{padding:"10px",border:"0.2px solid black", marginTop:'10px', width:"100%"}} type="text" />
              <p className="uppercase" style={{
                  fontFamily:"Inter",
                  letterSpacing:"0.2rem",
                  opacity:'0.7',
                  fontSize:'0.75rem',
                  marginTop:"25px"
               }}>Address line 1</p>
               <input value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="First Name" style={{padding:"10px",border:"0.2px solid black", marginTop:'10px', width:"100%"}} type="text" />
               <p className="uppercase" style={{
                  fontFamily:"Inter",
                  letterSpacing:"0.2rem",
                  opacity:'0.7',
                  fontSize:'0.75rem',
                  marginTop:"25px"
               }}>Address line 2</p>
               <input value={address1} onChange={(e)=>setAddress1(e.target.value)} placeholder="First Name" style={{padding:"10px",border:"0.2px solid black", marginTop:'10px', width:"100%"}} type="text" />
               <div style={{
                  display:"flex",
                  flexDirection:"row",
                  width:"100%",
                  alignItems:'center',
                  gap:"10px",
                  marginTop:'20px'
                }}>
                  <span className="uppercase" style={{
                  fontFamily:"Inter",
                  letterSpacing:"0.2rem",
                  opacity:'0.7',
                  fontSize:'0.75rem',
                  width:'50%'
                 
                }}>City</span>
                <span className="uppercase" style={{
                  fontFamily:"Inter",
                  letterSpacing:"0.2rem",
                  opacity:'0.7',
                  fontSize:'0.75rem',
                  width:"50%"
                  }}>
                  Pincode
                </span>
                </div>
                <div style={{
                  display:'flex',
                  flexDirection:"row",
                  width:'100%',
                  alignItems:"center",
                  gap:"10px",
                  marginTop:'10px'
                }}>
                  <input placeholder="First Name" value={city} onChange={(e)=>setCity(e.target.value)} style={{padding:"10px",border:"0.2px solid black", width:"50%"}} type="text" />
                  <input value={pincode} onChange={(e)=>setPincode(e.target.value)} placeholder="Last Name" style={{padding:"10px", border:"0.2px solid black", width:'50%'}} type="text" />
                </div>
                <button onClick={handlePayment} className="uppercase" style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center",
                backgroundColor:"black",
                color:"white",
                fontFamily:"Inter",
                letterSpacing:"0.2rem",
                padding:'10px',
                width:"100%",
                marginTop:"20px"
              }}>
                Pay Via Razorpay
              </button>
              <p style={{marginTop:"10px", marginBottom:"10px", textAlign:"center"}}>OR</p>
               <button onClick={handlePaymentViaCashOnDelivery} className="uppercase" style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center",
                backgroundColor:"black",
                color:"white",
                fontFamily:"Inter",
                letterSpacing:"0.2rem",
                padding:'10px',
                width:"100%",
                marginTop:"20px"
              }}>
                Pay via COD
              </button>

            </div>

            {/* the order summary of the cart */}
            <div style={{
              display:"flex",
              flexDirection:"column",
              width:"100%",
              marginTop:"40px",
              backgroundColor:'whitesmoke',
              padding:"8px"
            }}>
                <h2 style={{
                fontWeight:'500'
                }} className="font-['Playfair_Display'] text-xl text-foreground mb-6">Order Summary
              </h2>

               <div style={{border:"0.2px solid black", opacity:"0.4",width:"100%", marginTop:"20px"}}/>
              <div style={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:'center',
                        marginTop:"1.3rem"
                    }}>
                        <span style={{fontFamily:"Inter",opacity:"0.5"}} className="text-foreground/50">Subtotal</span>
                        <span>${shippingCharges.subTotal}</span>
                    </div>
                     <div style={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:'center',
                        marginTop:"1.3rem"
                    }}>
                         <span style={{fontFamily:"Inter",opacity:"0.5"}} className="text-foreground/50">Shipping</span>
                        <span>${shippingCharges.charges}</span>
                    </div>
                    <div style={{border:"0.2px solid black", opacity:"0.4",width:"100%", marginTop:"20px"}}/>
                      <div style={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:'center',
                        marginTop:"1.3rem"
                    }}>
                         <span style={{fontFamily:"Inter",opacity:"0.5"}} className="text-foreground/50">Total</span>
                        <span>${shippingCharges.price}</span>
                    </div>
              
            </div>
          </div>
          </>
        }

        {/* for screens bigger than 1000px */}
        {!middleView && <div style={{
          marginTop:"2.5rem",
          padding:"3rem",
          display:"flex",
          flexDirection:"row",
          gap:"10px",
          width:"100%"
        }}>
          {/* left half of the screen which contains the details */}
          <div style={{
            width:"68%"
          }}>
              <h2 style={{fontWeight:"450"}} className="font-['Playfair_Display'] text-2xl text-foreground mb-8">
                  Contact & Shipping
                </h2>
              <div style={{
                display:"grid",
                gridTemplateColumns:"45% 45%",
                width:'100%',
                marginTop:"2rem",
                columnGap:"30px",
                rowGap:"10px"
              
              }}>
                <span className="uppercase" style={{
                  fontFamily:"Inter",
                  letterSpacing:"0.2rem",
                  opacity:'0.7',
                  fontSize:'0.75rem'
                 
                }}>First Name</span>
                <span className="uppercase" style={{
                  fontFamily:"Inter",
                  letterSpacing:"0.2rem",
                  opacity:'0.7',
                  fontSize:'0.75rem'}}>
                    Last name
                </span>
                <input placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} style={{padding:"10px",border:"0.2px solid black"}} type="text" />
                <input value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Last Name" style={{padding:"10px", border:"0.2px solid black"}} type="text" />
              </div>
              <p className="uppercase" style={{
                  fontFamily:"Inter",
                  letterSpacing:"0.2rem",
                  opacity:'0.7',
                  fontSize:'0.75rem',
                  marginTop:"25px"
               }}>Email Address</p>
               <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="First Name" style={{padding:"10px",border:"0.2px solid black", marginTop:'10px', width:"93.3%"}} type="text" />
                <p className="uppercase" style={{
                  fontFamily:"Inter",
                  letterSpacing:"0.2rem",
                  opacity:'0.7',
                  fontSize:'0.75rem',
                  marginTop:"25px"
               }}>Phone number</p>
               <input value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} placeholder="First Name" style={{padding:"10px",border:"0.2px solid black", marginTop:'10px', width:"93.3%"}} type="text" />
                <p className="uppercase" style={{
                  fontFamily:"Inter",
                  letterSpacing:"0.2rem",
                  opacity:'0.7',
                  fontSize:'0.75rem',
                  marginTop:"25px"
               }}>ADDRESS line 1</p>
               <input value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="First Name" style={{padding:"10px",border:"0.2px solid black", marginTop:'10px', width:"93.3%"}} type="text" />
                <p className="uppercase" style={{
                  fontFamily:"Inter",
                  letterSpacing:"0.2rem",
                  opacity:'0.7',
                  fontSize:'0.75rem',
                  marginTop:"25px"
               }}>Address line 2 (optional)</p>
               <input value={address1} onChange={(e)=>setAddress1(e.target.value)} placeholder="First Name" style={{padding:"10px",border:"0.2px solid black", marginTop:'10px', width:"93.3%"}} type="text" />
                 <div style={{
                display:"grid",
                gridTemplateColumns:"45% 45%",
                width:'100%',
                marginTop:"2rem",
                columnGap:"30px",
                rowGap:"10px"
              
              }}>
                <span className="uppercase" style={{
                  fontFamily:"Inter",
                  letterSpacing:"0.2rem",
                  opacity:'0.7',
                  fontSize:'0.75rem'
                 
                }}>City</span>
                <span className="uppercase" style={{
                  fontFamily:"Inter",
                  letterSpacing:"0.2rem",
                  opacity:'0.7',
                  fontSize:'0.75rem'}}>
                  pinCode
                </span>
                <input value={city} onChange={(e)=>setCity(e.target.value)} placeholder="First Name" style={{padding:"10px",border:"0.2px solid black"}} type="text" />
                <input value={pincode} onChange={(e)=>setPincode(e.target.value)} placeholder="Last Name" style={{padding:"10px", border:"0.2px solid black"}} type="text" />
              </div>
              <button onClick={handlePayment} className="uppercase" style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center",
                backgroundColor:"black",
                color:"white",
                fontFamily:"Inter",
                letterSpacing:"0.2rem",
                padding:'10px',
                width:"93%",
                marginTop:"20px"
              }}>
               Pay Via Razorpay
              </button>
              <p style={{
                marginTop:"10px",
                textAlign:'center'
              }}>OR</p>
              <button onClick={handlePaymentViaCashOnDelivery} className="uppercase" style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center",
                backgroundColor:"black",
                color:"white",
                fontFamily:"Inter",
                letterSpacing:"0.2rem",
                padding:'10px',
                width:"93%",
                marginTop:"20px"
              }}>
               Pay via cod
              </button>
           
               
          </div>


          {/* right half of the screen which is the sticky price */}
          <div style={{
            width:"30%",
            position:"sticky",
            top:'10rem',
            padding:"10px",
            
            height:"fit-content"
          
          }}>
             <h2 style={{
                fontWeight:'500'
                }} className="font-['Playfair_Display'] text-xl text-foreground mb-6">Order Summary
              </h2>
              {
                cart.success && cart.data.map((item)=>(
                  <>
                  <div style={{
                    display:"flex",
                    flexDirection:"row",
                    width:"100%",
                    justifyContent:"space-between",
                    alignItems:"center",
                    marginTop:"30px"
                  }}>
                    <div style={{
                      display:"flex",
                      flexDirection:"row",
                      alignItems:"center",
                      gap:"5px"
                    }}>
                      <img className="w-20 h-24" src={item.products.productImages[0]} alt="product images"/>
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-[#C8A96E] mb-0.5">{item.products.brandName || "Maison Black"}</p>
                        <p className="text-sm text-foreground mb-1" style={{
                            fontFamily:'Inter'
                        }}>{item.products.productName}</p>
                      </div>
                    </div>
                    <span>${item.products.Price}</span>
                  </div>
                  </>
                ))
              }
              <div style={{border:"0.2px solid black", opacity:"0.4",width:"100%", marginTop:"20px"}}/>
              <div style={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:'center',
                        marginTop:"1.3rem"
                    }}>
                        <span style={{fontFamily:"Inter",opacity:"0.5"}} className="text-foreground/50">Subtotal</span>
                        <span>${shippingCharges.subTotal}</span>
                    </div>
                     <div style={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:'center',
                        marginTop:"1.3rem"
                    }}>
                         <span style={{fontFamily:"Inter",opacity:"0.5"}} className="text-foreground/50">Shipping</span>
                        <span>${shippingCharges.charges}</span>
                    </div>
                    <div style={{border:"0.2px solid black", opacity:"0.4",width:"100%", marginTop:"20px"}}/>
                      <div style={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:'center',
                        marginTop:"1.3rem"
                    }}>
                         <span style={{fontFamily:"Inter",opacity:"0.5"}} className="text-foreground/50">Total</span>
                        <span>${shippingCharges.price}</span>
                    </div>

          </div>
        </div>}

        </>
    )
};
export default Payment;
