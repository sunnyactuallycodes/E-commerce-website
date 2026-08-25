import {ArrowLeft, Verified, ChevronDown, Package, MapPin, Phone, Truck, CreditCard, ChevronUp, Search} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import SearchContext from '../context/SearchContext';



function Order(){

    const {searchOn, setSearchOn}= useContext(SearchContext);

    const [filter, setFilter]= useState("all");
    const [showInformation, setShowInformation]= useState(null);

    const [paymentColor, setPaymentColor]= useState("Approved");
    
    const [orders, setOrders] = useState([]);
    console.log(orders);

    // for responsiveness 
    const middleView = useMediaQuery({maxWidth:"900px"});


    // fetching the orders of the user from his request session. 
    const fetchingTheOrdersList = async()=>{
        try {
            const backendRes = await axios.get("http://localhost:4000/api/v1/cart/getAllOrders", {withCredentials:true}).then((response)=>setOrders(response.data));
            console.log("everything is working fine till here");
            toast.success("Order fetched");

        } catch (error) {
            console.error("There is an internal server error while fetching the orders: ", error);
            return toast.error("Internal Server Error");
        }
    }

 
    useEffect(()=>{
        fetchingTheOrdersList();
        setSearchOn(false);
    },[])


    return(
        <>
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
                        <button
                        style={{
                            width:'fit-content'
                        }}
                        className="flex items-center gap-2 bg-[#0D0D0D] text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#C8A96E] hover:text-[#0D0D0D] transition-colors"
                        >
                        <ArrowLeft size={13} />
                        Back
                        </button>
                        <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase mb-3">account</p>
                        <h1 className="font-['Playfair_Display'] text-white text-5xl md:text-6xl">My Orders</h1>
                    </div>
        </div>
         <div style={{
                
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:"center",
                paddingLeft:"3rem",
                paddingRight:'3rem',
                marginTop:"2.8rem",
                
            }}>
                <div style={{
                    display:"flex",
                    flexDirection:'row',
                    gap:'10px',
                    flexWrap:"wrap"
                }}>
                    <span onClick={()=>setFilter('all')} className="text-xs tracking-[0.15em] uppercase" style={{
                        backgroundColor:`${filter==="all"?"black":"white"}`,
                        color:`${filter==="all"?"white":"black"}`,
                        paddingRight:"15px",
                        paddingLeft:'15px',
                        paddingTop:"10px",
                        paddingBottom:'10px',
                        fontWeight:"550",
                        cursor:"pointer"
                    }}>All</span>
                    <span onClick={()=>setFilter('shoes')} className="text-xs tracking-[0.15em] uppercase" style={{
                        cursor:"pointer",
                        color:`${filter==="shoes"?"white":"black"}`,
                        paddingRight:"15px",
                        paddingLeft:'15px',
                        paddingTop:"10px",
                        paddingBottom:'10px',
                        fontWeight:"550",
                        backgroundColor:`${filter==="shoes"?"black":"white"}`
                    }}>paid</span>
                    <span onClick={()=>setFilter('clothing')} className="text-xs tracking-[0.15em] uppercase" style={{
                        cursor:"pointer",
                        color:`${filter==='clothing'?"white":"black"}`,
                        backgroundColor:`${filter==="clothing"?"black":"white"}`,
                        paddingRight:"15px",
                        paddingLeft:'15px',
                        paddingTop:"10px",
                        paddingBottom:'10px',
                        fontWeight:"550"
                    }}>failed</span>
                    <span onClick={()=>setFilter('clothing')} className="text-xs tracking-[0.15em] uppercase" style={{
                        cursor:"pointer",
                        color:`${filter==='clothing'?"white":"black"}`,
                        backgroundColor:`${filter==="clothing"?"black":"white"}`,
                        paddingRight:"15px",
                        paddingLeft:'15px',
                        paddingTop:"10px",
                        paddingBottom:'10px',
                        fontWeight:"550"
                    }}>refunded</span>
                    <span onClick={()=>setFilter('clothing')} className="text-xs tracking-[0.15em] uppercase" style={{
                        cursor:"pointer",
                        color:`${filter==='clothing'?"white":"black"}`,
                        backgroundColor:`${filter==="clothing"?"black":"white"}`,
                        paddingRight:"15px",
                        paddingLeft:'15px',
                        paddingTop:"10px",
                        paddingBottom:'10px',
                        fontWeight:"550"
                    }}>Cancelled</span>
                </div>
            </div>

        

       
       
        {/* fetching the product orders here to check trial */}
        {
            orders.success && orders.data.map((order)=>(
                <>

                     <div key={order._id} style={{
        paddingLeft:"3rem",
        paddingRight:"3rem",
        paddingTop:"1.5rem",
        paddingBottom:"0.5rem"
           
        }}>
            <div style={{
                backgroundColor:"white",
                width:'100%',
                 display:"flex",
                 justifyContent:`${middleView?"flex-start":"space-between"}`,
                 alignItems:'center',
           
            }}>
                
            <div style={{
                width:`${middleView?'fit-content':"70%"}`,
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                gap:`${middleView?"10px":"5rem"}`,
                backgroundColor:'white',
                padding:'15px'
            }}>
               <div style={{
                 display:'flex',
                 flexDirection:"column",
                 gap:"5px"
               }}>
                 <span className='text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-0.5'>{order.paymentOrderId || "not ordered"}</span>
                 <span className='text-sm font-medium text-foreground'>{order.paymentId || "None"}</span>
               </div>
               <div style={{
                display:"flex", 
                flexDirection:'row',
                alignItems:'center',
                gap:'10px'
               }}>

               
               <div style={{
                display:"grid",
                gridTemplateColumns:"50% 50%",
                opacity:2,
                rowGap:'5px',
                columnGap:"1px"
               }}>
             
                {order.cartProducts.map((cart)=>(
                        <div key={cart._id}>
                         <img src={cart.products.productImages[0]} alt="logo" className='w-15 h-15 '/>
                        </div>
                
            ))
                     
            } 
               
               </div>
                <div style={{
                 display:`${middleView?"none":"flex"}`,
                 flexDirection:"column",
                 flexWrap:'wrap',
                 gap:"5px"
               }}>
                
                 <span style={{opacity:1}} className='text-[12px] tracking-[0.12em] text-foreground/40 mb-0.5'>Ordered on: 
                 </span>
                  <span style={{opacity:0.6}} className='text-[12px] tracking-[0.12em] text-foreground/40 mb-0.5'>
                 {new Date(order.paidAt).toLocaleString()}
                 </span> 

               </div>
               </div>
               
            </div>
            <div style={{
                width:`${middleView?'fit-content':"30%"}`,
                display:'flex',
                flexDirection:"row",
                alignItems:"center",
                backgroundColor:'white',
                padding:'15px',
                justifyContent:`${middleView?"flex-start":'flex-end'}`,
                gap:"15px",
                height:'155px'
            }}>
               <div style={{display:"flex", flexDirection:"row", alignItems:"center", gap:'2px', backgroundColor:`${paymentColor==="Approved"?"lightgreen":"lightred"}`,
               paddingLeft:"5px", paddingRight:"5px",paddingTop:"10px", paddingBottom:"10px"
               }}>
               <Verified size={11}/>
                <span className='text-[10px] tracking-wider uppercase'>{order.paymentStatus}</span>
               </div>
                <span style={{
                    display:`${middleView?"none":""}`,
                    fontWeight:"550",
                    fontSize:"0.8rem"
                }} className='tracking-wider uppercase'>₹ {order.price}</span>
                {!showInformation?<ChevronDown onClick={()=>{setShowInformation(order._id)}} size={13}/>:<ChevronUp size={13} onClick={()=>setShowInformation(null)}/>}          
            </div>
            </div>
             {
                    showInformation===order._id && 
                    <>
                    <div style={{
                        
                       
                    }}>
                    <div style={{
                        width:'100%',
                        border:'0.2px solid black',
                        opacity:"0.5"
                    }}/>
                    <div style={{
                        display:"flex",
                        flexDirection:`${middleView?"column":"row"}`,
                        justifyContent:"space-between",
                        width:"100%",
                        backgroundColor:"white",
                        
                    }}>
                        <div style={{width:`${middleView?"100%":"33.33%"}`, display:'flex', flexDirection:"column", padding:"25px"}}>  
                        <div style={{
                            display:'flex',
                            gap:"5px",
                            alignItems:'center',
                            opacity:0.56
                        }}>
                            <Package size={20}/>
                            <span className='text-[10px] tracking-[0.2em] uppercase text-foreground/40 '>Items</span>
                        </div>
                        {
                            order.cartProducts.map((cart)=>(
                                <>
                            <div key={cart._id} style={{
                                display:'flex',
                                flexDirection:"row",
                                alignItems:'center',
                              
                                marginTop:'15px',
                                justifyContent:"space-between"
                            }}>
                                <div style={{
                                    display:"flex",
                                    flexDirection:"row",
                                    gap:"10px"
                                }}>
                               <img src={cart.products.productImages[0]} className='w-18 h-18' alt="image" />
                               <div style={{
                                display:'flex',
                                flexDirection:"column",
                                gap:"5px"
                               }}>
                                <span className='text-[10px] tracking-wider text-[#C8A96E] uppercase'>{cart.products.brandName}</span>
                                <span className='text-xs text-foreground truncate'>{cart.products.productName}</span>
                                <p className="text-[10px] text-foreground/40">
                                    Size {cart.productSize} · Qty {cart.quantity}
                                </p>
                               </div>
                               </div>
                               <span className='text-xs text-foreground shrink-0 ml-auto'>₹ {cart.price}</span>
                              
                               
                            </div>

                                </>
                            ))
                        }
                            

                        </div>
                        <div style={{
                            border:"0.2px solid black",
                            opacity:0.2
                        }}/>
                        <div style={{width:`${middleView?"100%":"33.33%"}`,display:'flex',flexDirection:"column", padding:"25px"}}>
                             <div style={{
                            display:'flex',
                            gap:"5px",
                            alignItems:'center',
                            opacity:0.56
                        }}>
                            <MapPin size={20}/>
                            <span className='text-[10px] tracking-[0.2em] uppercase text-foreground/40 '>Address</span>
                        </div>
                        <div style={{
                            marginTop:"15px"
                        }}>
                           <span style={{
                            fontFamily:"Inter",
                            fontSize:"1rem"
                           }} className='text-sm text-foreground'>{order.firstName} {order.lastName}</span>
                        </div>
                        <div style={{
                            marginTop:"10px"
                        }}>
                            <span className='text-xs text-foreground/60 leading-relaxed'>{order.address} {order.address1} {order.pincode}</span>
                        </div>
                        <div style={{
                            marginTop:"15px"
                        }}>
                            <span style={{
                                display:"flex",
                                flexDirection:"row",
                                alignItems:"center",
                                gap:"5px"
                            }} className='text-xs text-foreground/50text-xs text-foreground/50'><Phone size={20}/>{order.phoneNumber}</span>
                        </div>
                        <div style={{
                            border:"0.2px solid black",
                            width:"100%",
                            opacity:0.2,
                            marginTop:"10px"
                        }}/>
                        <div style={{
                            marginTop:"20px"
                        }}>
                            <div style={{
                                display:"flex",
                                alignItems:"center",
                                flexDirection:"row",
                                gap:"5px",
                                opacity:"0.56"
                            }}>
                                <Truck size={20}/>
                                <span className='text-[10px] tracking-[0.2em] uppercase text-foreground/40 '>Expected Delivery</span>
                            </div>
                            <div style={{
                                display:"flex",
                                marginTop:"10px"
                            }}>
                                <span className='text-xs text-foreground'>
                                    {order.deliveryDate}
                                </span>
                            </div>
                        </div>
                        </div>
                        <div style={{
                            border:"0.2px solid black",
                            opacity:0.2
                        }}/>
                        <div style={{width:`${middleView?"100%":"33.33%"}`, display:"flex", flexDirection:"column", padding:"25px"}}>
                           <div style={{
                            display:'flex',
                            gap:"5px",
                            alignItems:'center',
                            opacity:0.56,
                        
                        }}>
                            <CreditCard size={20}/>
                            <span className='text-[10px] tracking-[0.2em] uppercase text-foreground/40 '>Payment</span>
                        </div>
                         <div style={{
                            marginTop:"15px"
                        }}>
                            <span className='text-[10px] tracking-[0.2em] uppercase text-foreground/40'>Order Id</span>
                        </div>
                         <div style={{
                            marginTop:"1.5px"
                        }}>
                            <span style={{
                                fontFamily:"Inter",
                                fontSize:"0.8rem",
                            }} className='text-[10px] tracking-[0.2em] text-foreground/40'>{order.paymentOrderId}</span>
                        </div>
                        <div style={{
                            marginTop:"15px"
                        }}>
                            <span className='text-[10px] tracking-[0.2em] uppercase text-foreground/40'>Payment Id</span>
                        </div>
                         <div style={{
                            marginTop:"1.5px"
                        }}>
                            <span style={{
                                fontFamily:"Inter",
                                fontSize:"0.8rem",
                            }} className='text-[10px] tracking-[0.2em] text-foreground/40'>{order.paymentId}</span>
                        </div>
                      <div style={{
                            marginTop:"15px"
                        }}>
                            <span className='text-[10px] tracking-[0.2em] uppercase text-foreground/40'>Paid at</span>
                        </div>
                         <div style={{
                            marginTop:"1.5px"
                        }}>
                            <span style={{
                                fontFamily:"Inter",
                                fontSize:"0.8rem",
                            }} className='text-[10px] tracking-[0.2em] text-foreground/40'>{new Date(order.paidAt).toLocaleString()}</span>
                        </div>
                        <div style={{
                            border:"0.2px solid black",
                            width:"100%",
                            opacity:0.2,
                            marginTop:"10px"
                        }}/>
                        <div style={{
                            marginTop:'10px'
                        }}>
                            <div style={{
                                display:'flex',
                                flexDirection:"row",
                                width:'100%',
                                justifyContent:'space-between',
                                alignItems:"center"
                            }}>
                                <span style={{opacity:0.5}} className='text-foreground/50"'>
                                Subtotal
                                </span>
                                 <span className='text-xs text-foreground shrink-0 ml-auto'>₹ {order.price- order.shippingPrice}</span>
                            </div>
                            <div style={{
                                display:'flex',
                                flexDirection:"row",
                                width:'100%',
                                justifyContent:'space-between',
                                alignItems:"center",
                                marginTop:'10px'
                            }}>
                                <span style={{opacity:0.5}} className='text-foreground/50"'>
                                Shipping
                                </span>
                                 <span className='text-xs text-foreground shrink-0 ml-auto'>₹ {order.shippingPrice}</span>
                            </div>
                            <div style={{
                                border:"0.2px solid black",
                            width:"100%",
                            opacity:0.2,
                            marginTop:"10px"
                            }}/>
                            <div style={{marginTop:'10px', width:"100%",justifyContent:"space-between", alignItems:'center', display:"flex"}}>
                               <span style={{
                                fontFamily:"Inter",
                                fontSize:"1rem"
                               }}>Total</span>
                               <span className='text-xs text-foreground shrink-0 ml-auto'>₹ {order.price}</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    
                   </div>
                    </>
                }
            </div>
                </>
            ))
        }

        </>
    )
};
export default Order;