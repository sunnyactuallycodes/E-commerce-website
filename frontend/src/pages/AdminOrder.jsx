import axios from "axios";
import { ArrowLeft, ChevronDown, ChevronUp, ImageIcon, Package, Plus, Search, ShoppingBag, TrendingUp, Users, Verified, MapPin, Phone, Truck, CreditCard, } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingBar from "../utils/LoadingBar";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";




function AdminOrder(){

    const [filter, setFilter]= useState("");
    const [orders, setOrders]= useState({});
    const [loading, setLoading]= useState(false);
    const [showInformation, setShowInformation]= useState(null);
    const middleView = useMediaQuery({maxWidth:"900px"});
    const [date, setDate]= useState("");

    const location = useLocation();
        const {pathname}= location;

    let quantity = 0;
    console.log(orders);


    // changing the date of the user orders
   const changingDeliveryDate= async(id)=>{
      try { 
        setLoading(true);
        const backendRes= await axios.post(`https://e-commerce-website-lac-eight.vercel.app/api/v1/cart/update/date/admin/${id}`,{date} ,{withCredentials:true});
        console.log(backendRes.data);
        setLoading(false);
        return toast.success("date updated successfully");
      } catch (error) {
        console.error("client side error: ", error);
        return toast.error("Internal server error, pleast try again");
      }
   }

    // fetching the orders for admin to see from the backend 
    const fetchingOrdersFromBackend= async()=>{
        try {
            setLoading(true)
            const backendRes= await axios.get("https://e-commerce-website-lac-eight.vercel.app/api/v1/cart/fetchOrders/admin",{withCredentials:true}).then((response)=>{
                setOrders(response.data)
            });
            setLoading(false)
            return toast.success("Orders fetched");
            
        } catch (error) {
            console.error("Client side error: ", error);
            return toast.error("Internal Server Error, server timed out");
        }
    };

    useEffect(()=>{
        fetchingOrdersFromBackend();
    },[])

    return(
        <>
        {
            loading && <LoadingBar/>
        }
       
          <div style={{
            padding:"3rem"
        }}>
              <p style={{
                fontWeight:"510",
                fontSize:"1.9rem"
            }} className="font-['Playfair_Display'] text-foreground">Add Orders</p>
             <span style={{opacity:0.5, fontSize:"0.85rem"}} className='text-foreground/50 '>
            6 items
            </span>
            <div style={{
                marginTop:"20px",
                display:"flex",
                flexDirection:"row",
                
                alignItems:"center",
                width:"100%"
            }}>
                <div style={{
                    display:"flex",
                    flexDirection:"row",
                    alignItems:"center",
                    gap:"10px",
                    backgroundColor:"white",
                    paddingRight:"15px",
                    paddingLeft:'15px',
                    paddingTop:"10px",
                    paddingBottom:'10px',
                    width:"30%"
                }}>
                    <Search size={15}/>
                    <input placeholder="Search order, name, email" type="text" style={{
                        outline:"none",
                        width:'100%'
                    }} />               
                </div>
                 <div style={{
                
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:"center",
                paddingLeft:"3rem",
                paddingRight:'3rem'
            }}>
                <div style={{
                    display:"flex",
                    flexDirection:'row',
                    gap:'10px'
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
                    }}>Paid</span>
                    <span onClick={()=>setFilter('clothing')} className="text-xs tracking-[0.15em] uppercase" style={{
                        cursor:"pointer",
                        color:`${filter==='clothing'?"white":"black"}`,
                        backgroundColor:`${filter==="clothing"?"black":"white"}`,
                        paddingRight:"15px",
                        paddingLeft:'15px',
                        paddingTop:"10px",
                        paddingBottom:'10px',
                        fontWeight:"550"
                    }}>cancelled</span>
                </div>
            </div>
            </div>

            <div style={{
                marginTop:"2rem",
                overflow:"scroll",
                scrollbarWidth:'none',
                backgroundColor:'white'
            }}>
                <div style={{
                    display:"grid",
                    gridTemplateColumns:"250px 250px 400px 150px 150px 150px",
                    columnGap:"10px",
                  
                    backgroundColor:"white",
                    padding:'20px',
                    rowGap:"15px"
                }}>
                    <span style={{opacity:0.5, fontSize:"0.8rem"}} className='text-foreground/50 uppercase'>
                     Order id 
                    </span>
                      <span style={{opacity:0.5, fontSize:"0.8rem"}} className='text-foreground/50 uppercase'>
                     Customer
                    </span>
                      <span style={{opacity:0.5, fontSize:"0.8rem"}} className='text-foreground/50 uppercase'>
                     Items
                    </span>
                      <span style={{opacity:0.5, fontSize:"0.8rem"}} className='text-foreground/50 uppercase'>
                    Total
                    </span>
                      <span style={{opacity:0.5, fontSize:"0.8rem"}} className='text-foreground/50 uppercase'>
                     Status
                    </span>
                      <span style={{opacity:0.5, fontSize:"0.8rem"}} className='text-foreground/50 uppercase'>
                     Date
                    </span>
                    </div>
                    <div style={{
                        width:'1480px',
                        border:"0.2px solid black",
                        opacity:0.35
                    }}/>
                   {
                    orders.success && orders.data.map((order)=>(
                        <div key={order._id}>
                        
                        <div key={order._id} style={{
                             display:"grid",
                                gridTemplateColumns:"250px 250px 400px 150px 150px 150px",
                                columnGap:"10px",
                               
                                backgroundColor:"white",
                                alignItems:"center",
                                padding:'20px',
                                rowGap:"15px",
                                position:'relative',
                                scrollbarWidth:"none"
                        }}>
                              {!showInformation?<ChevronDown style={{
                                position:"absolute",
                                top:0
                              }} onClick={()=>{setShowInformation(order._id)}} size={13}/>:<ChevronUp style={{
                                position:"absolute",
                                top:0
                              }}  size={13} onClick={()=>setShowInformation(null)}/>} 
                            <span style={{
                                fontFamily:"Inter",
                                fontSize:"0.85rem"
                            }}>{order.paymentOrderId || "not ordered"}</span>
                            <span style={{
                                fontFamily:"Inter",
                                fontSize:"0.85rem"
                            }}>
                                {order.firstName} {order.lastName}
                            </span>
                            <div style={{
                                display:"flex",
                                flexDirection:"row",
                                alignItems:"center"
                            }}>
                               {order.cartProducts.map((cart)=>(
                                <div key={order._id}>
                                <img key={cart._id} src={cart.products.productImages[0]} alt="logo" className='w-15 h-15 '/>
                                </div>
                                ))     
                                } 
                            </div>
                            <span style={{
                                fontSize:"0.9rem",
                                fontFamily:"Inter",
                                fontWeight:450
                            }}>
                                ₹ {order.price}
                            </span>
                             <div style={{display:"flex", flexDirection:"row", alignItems:"center", gap:'2px', backgroundColor:`lightgreen`,
                            paddingLeft:"5px", paddingRight:"5px",paddingTop:"10px", paddingBottom:"10px",
                             width:'fit-content'
                            }}>
                            <Verified size={11}/>
                                <span className='text-[10px] tracking-wider uppercase'>{order.paymentStatus}</span>
                            </div>
                           <span style={{
                            fontFamily:"inter",
                            fontSize:"0.8rem"
                           }}>
                            {new Date(order.paidAt).toLocaleString()}
                           </span>
                        </div>
                        <div style={{width:'1480px', border:"0.2px solid black", opacity:"0.25"}}/>
                           {
                            showInformation===order._id && 
                            <>
                              <div style={{
                        
                       
                    }}>
                    <div style={{
                        width:'1480px',
                        border:'0.2px solid black',
                        opacity:"0.25"
                    }}/>
                    <div style={{
                        display:"flex",
                        flexDirection:`${middleView?"column":"row"}`,
                        justifyContent:"space-between",
                        width:"100%",
                        backgroundColor:"white",
                        
                    }}>
                        <div style={{width:`${middleView?"100%":"25%"}`, display:'flex', flexDirection:"column", padding:"25px"}}>  
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
                                <div key={cart._id}>
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

                                </div>
                            ))
                        }
                            

                        </div>
                        <div style={{
                            border:"0.2px solid black",
                            opacity:0.2
                        }}/>
                        <div style={{width:`${middleView?"100%":"25%"}`,display:'flex',flexDirection:"column", padding:"25px"}}>
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
                        <div style={{width:`${middleView?"100%":"25%"}`, display:"flex", flexDirection:"column", padding:"25px"}}>
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
                         <div style={{
                            border:"0.2px solid black",
                            opacity:0.2
                        }}/>

                          <div style={{width:`${middleView?"100%":"25%"}`, display:"flex", flexDirection:"column", padding:"25px"}}>
                            <div style={{
                            display:'flex',
                            gap:"5px",
                            alignItems:'center',
                            opacity:0.56,
                        
                        }}>
                            
                            <Truck size={20}/>
                            <span className='text-[10px] tracking-[0.2em] uppercase text-foreground/40 '>Delivery Date</span>
                        </div>
                        <div style={{
                            display:"flex",
                            flexDirection:"column",
                            marginTop:"15px"

                        }}>
                            <input value={date} onChange={(e)=>{
                                setDate(e.target.value)
                            }} type="date" style={{
                                padding:'10px',
                                border:"0.2px solid black",
                                fontSize:'0.8rem'
                            }} />
                            <button onClick={()=>{changingDeliveryDate(order._id); setDate(""); window.location.reload()}} style={{
                                display:'flex',
                                flexDirection:"row",
                                alignItems:"center",
                                justifyContent:"center",
                                backgroundColor:"black",
                                color:"white",
                                fontFamily:"Playfair Display",
                                padding:"10px",
                                marginTop:"10px",
                                fontSize:"0.8rem"
                            }}>
                                Confirm Date
                            </button>
                        </div>
                          </div>
                    </div>

                    
                   </div>
                   <div style={{width:"1480px", border:"0.2px solid black", opacity:0.25}}/>
                            </>
                           }
                        </div>
                    ))
                   }
               </div>
        </div>
        </>
    )
};
export default AdminOrder;