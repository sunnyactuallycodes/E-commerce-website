import axios from "axios";
import { ArrowLeft, Package, Search, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function AdminUsers(){
    const [users, setUsers]= useState({});
    console.log(users);
    const [loading, setLoading]= useState(false);
    const location = useLocation();
     const {pathname}= location;

    const fetchingUserFromBackend = async()=>{
        try {
            setLoading(true);
            const backendRes = await axios.get('http://localhost:4000/api/v1/users/fetchAllUsers/admin').then((response)=>setUsers(response.data));
            
            setLoading(false);
            return toast.success("Users fetched");
                    
        } catch (error) {
            console.error("client side error: ",error);
            return toast.error("Internal Server Error");
        }
    };
    return(
        <>
      

        <div style={{
            padding:"3rem"
        }}>
              <p style={{
                fontWeight:"510",
                fontSize:"1.9rem"
            }} className="font-['Playfair_Display'] text-foreground">Analyse Users</p>
             <span style={{opacity:0.5, fontSize:"0.85rem"}} className='text-foreground/50 '>
            5 registered users 
            </span>
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
                    maxWidth:"400px",
                    marginTop:"30px"
                }}>
                    <Search size={15}/>
                    <input placeholder="Search order, name, email" type="text" style={{
                        outline:"none",
                        width:'100%'
                    }} />               
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
                    users.success && users.data.map((user)=>(
                        <>
                        
                        <div style={{
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
                                <>
                                <img src={cart.products.productImages[0]} alt="logo" className='w-15 h-15 '/>
                                </>
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
                        </>
                    ))
                   }
                    </div>

        </div>

        </>
    )
};
export default AdminUsers;