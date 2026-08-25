import { ArrowLeft, Package, Plus, ShoppingBag, TrendingUp, User, Users } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import {NavLink, useLocation} from 'react-router-dom';


function AdminDashboard(){
    const middleView = useMediaQuery({maxWidth:"600px"});
   
    return(
        <>
        <div style={{
            padding:"3rem"
        }}>
              <p style={{
                fontWeight:"510",
                fontSize:"1.9rem"
            }} className="font-['Playfair_Display'] text-foreground">Dashboard Overview</p>
            <div style={{
                marginTop:"20px",
                display:`${middleView?"flex":"grid"}`,
                width:"100%",
                gridTemplateColumns:`${middleView?"none":"24.5% 24.5% 24.5% 24.5%"}`,
                flexDirection:`${middleView?"column":"none"}`,
                columnGap:"10px"
            }}>
                <div style={{
                    display:"flex",
                    flexDirection:"column",
                    backgroundColor:"black",
                    color:"white",
                    padding:"20px"
                }}>
                    <div style={{
                        display:"flex",
                        flexDirection:"row",
                        alignItems:"center",
                        width:"100%",
                        justifyContent:"space-between"
                    }}>
                        <TrendingUp size={30} style={{
                          backgroundColor:"#c8a96e",
                          padding:"2px"
                        }}/>
                    </div>
                    <span style={{
                        fontSize:"1.5rem",
                        fontFamily:"Playfair Display",
                        marginTop:"10px"
                    }}>
                        ₹ 10000
                    </span>
                    <span style={{opacity:0.5, fontSize:"0.8rem"}} className='text-foreground/50 uppercase'>
                     total revenue
                    </span>
                </div>
                 <div style={{
                    display:"flex",
                    flexDirection:"column",
                    backgroundColor:"white",
                    color:"black",
                    padding:"20px"
                }}>
                    <div style={{
                        display:"flex",
                        flexDirection:"row",
                        alignItems:"center",
                        width:"100%",
                        justifyContent:"space-between"
                    }}>
                        <ShoppingBag className="bg-[#EDEAE4]" size={30} style={{
                          opacity:0.5,
                          padding:"2px"
                        }}/>
                    </div>
                    <span style={{
                        fontSize:"1.5rem",
                        fontFamily:"Playfair Display",
                        marginTop:"10px"
                    }}>
                        6
                    </span>
                    <span style={{opacity:0.5, fontSize:"0.8rem"}} className='text-foreground/50 uppercase'>
                     total orders
                    </span>
                </div>
                 <div style={{
                    display:"flex",
                    flexDirection:"column",
                    backgroundColor:"white",
                    color:"black",
                    padding:"20px"
                }}>
                    <div style={{
                        display:"flex",
                        flexDirection:"row",
                        alignItems:"center",
                        width:"100%",
                        justifyContent:"space-between"
                    }}>
                        <Package className="bg-[#EDEAE4]" size={30} style={{
                          opacity:0.5,
                          padding:"2px"
                        }}/>
                    </div>
                    <span style={{
                        fontSize:"1.5rem",
                        fontFamily:"Playfair Display",
                        marginTop:"10px"
                    }}>
                        8
                    </span>
                    <span style={{opacity:0.5, fontSize:"0.8rem"}} className='text-foreground/50 uppercase'>
                     products
                    </span>
                </div>
                 <div style={{
                    display:"flex",
                    flexDirection:"column",
                    backgroundColor:"white",
                    color:"black",
                    padding:"20px"
                }}>
                    <div style={{
                        display:"flex",
                        flexDirection:"row",
                        alignItems:"center",
                        width:"100%",
                        justifyContent:"space-between"
                    }}>
                        <Users className="bg-[#EDEAE4]" size={30} style={{
                          opacity:0.5,
                          padding:"2px"
                        }}/>
                    </div>
                    <span style={{
                        fontSize:"1.5rem",
                        fontFamily:"Playfair Display",
                        marginTop:"10px"
                    }}>
                        4
                    </span>
                    <span style={{opacity:0.5, fontSize:"0.8rem"}} className='text-foreground/50 uppercase'>
                     Customers
                    </span>
                </div>
            
                    
              
            
            </div>
            <div style={{
                marginTop:"20px",
                display:"flex",
                flexDirection:"column",
                padding:"20px",
                backgroundColor:"white"
            }}>
                <div style={{
                    display:"flex",
                    alignItems:"center",
                    width:"100%",
                    justifyContent:"space-between"
                }}>
                    <span style={{opacity:0.6, fontSize:"0.9rem"}} className='text-foreground/50 uppercase'>
                     Recent orders
                    </span>
                    <span className='text-xs tracking-[0.25em] uppercase text-[#C8A96E]'>
                    view all
                    </span>
                </div>
                <div style={{

                }}>

                </div>
            </div>
            <div style={{
                display:"flex",
                flexDirection:`${middleView?"column":"row"}`,
                alignItems:"center",
                marginTop:"20px",
                width:"100%",
                gap:"5px",
                justifyContent:"space-between"
            }}>
               
                <div style={{
                    display:'flex',
                    flexDirection:"row",
                    gap:"15px",
                    padding:"20px",
                    alignItems:"center",
                    backgroundColor:"white",
                    width:`${middleView?"100%":'33.33%'}`
                }}>

                    <Plus className="bg-[#EDEAE4]" size={35} style={{
                          opacity:0.5,
                          padding:"2px"
                     }}/>
                     <NavLink to={'/admin/addProducts'}>
                     <div style={{
                        display:"flex",
                        flexDirection:"column"
                     }}>
                        <span style={{
                            fontSize:"0.9rem",
                            fontFamily:"Inter"
                        }}>Add product</span>
                         <span style={{opacity:0.5, fontSize:"0.65rem"}} className='text-foreground/50 uppercase'>
                          List a new item
                         </span>
                     </div>
                     </NavLink>
                </div>
               
              
                <div style={{
                    display:'flex',
                    flexDirection:"row",
                    gap:"15px",
                    padding:"20px",
                    alignItems:"center",
                    backgroundColor:"white",
                     width:`${middleView?"100%":'33.33%'}`
                }}>
                    <ShoppingBag className="bg-[#EDEAE4]" size={35} style={{
                          opacity:0.5,
                          padding:"2px"
                     }}/>
                     <div style={{
                        display:"flex",
                        flexDirection:"column"
                     }}>
                        <span style={{
                            fontSize:"0.9rem",
                            fontFamily:"Inter"
                        }}>Manage Orders</span>
                         <span style={{opacity:0.5, fontSize:"0.65rem"}} className='text-foreground/50 uppercase'>
                          1 pending
                         </span>
                     </div>
                </div>
                <div style={{
                    display:'flex',
                    flexDirection:"row",
                    gap:"15px",
                    padding:"20px",
                    alignItems:"center",
                    backgroundColor:"white",
                     width:`${middleView?"100%":'33.33%'}`
                }}>
                    <Users className="bg-[#EDEAE4]" size={35} style={{
                          opacity:0.5,
                          padding:"2px"
                     }}/>
                     <div style={{
                        display:"flex",
                        flexDirection:"column"
                     }}>
                        <span style={{
                            fontSize:"0.9rem",
                            fontFamily:"Inter"
                        }}>Customers</span>
                         <span style={{opacity:0.5, fontSize:"0.65rem"}} className='text-foreground/50 uppercase'>
                          5 registered
                         </span>
                     </div>
                </div>
            </div>
        </div>
        </>
    )
};
export default AdminDashboard;