import { Outlet, NavLink, useLocation } from "react-router-dom";
import { ArrowLeft, Package, Plus, ShoppingBag, TrendingUp, User, Users } from "lucide-react";


function AdminLayout(){
    const location = useLocation();
    const {pathname}= location;
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
                        Back To Store
                        </button>
                        <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase mb-3">Admin</p>
                        <h1 className="font-['Playfair_Display'] text-white text-5xl md:text-6xl">Dashboard</h1>
                        <div style={{
                            marginTop:"20px",
                            display:'flex',
                            flexDirection:'row',
                            alignItems:"center",
                            gap:"25px",
                            marginBottom:"-47px",
                            flexWrap:'wrap'
                        }}>
                            <NavLink to="/admin/dashboard">
                            <div style={{
                                display:"flex",
                                flexDirection:"row",
                                gap:"5px",
                                alignItems:"center",
                                color:`${pathname==="/admin/dashboard"?"black":"white"}`,backgroundColor:`${pathname==="/admin/dashboard"?"#C8A96E":"black"}`,
                                padding:'5px'
                            }}>

                                <TrendingUp style={{}} size={15}/>
                                <span style={{fontSize:"0.87rem"}} className="text-foreground/20 uppercase">Overview</span>
                            </div>
                            </NavLink>
                            <NavLink to="/admin/addProducts">
                             <div style={{
                                display:"flex",
                                flexDirection:"row",
                                gap:"5px",
                                alignItems:"center",
                                 color:`${pathname==="/admin/addProducts"?"black":"white"}`,backgroundColor:`${pathname==="/admin/addProducts"?"#C8A96E":"black"}`,
                                padding:'5px'
                            }}>
                                <Package style={{}} size={15}/>
                                <span style={{ fontSize:"0.87rem"}} className="text-foreground/20 uppercase">Products</span>
                            </div>
                            </NavLink>
                            <NavLink to={"/admin/orders"}>
                             <div style={{
                                display:"flex",
                                flexDirection:"row",
                                gap:"5px",
                                alignItems:"center",
                                 color:`${pathname==="/admin/orders"?"black":"white"}`,backgroundColor:`${pathname==="/admin/orders"?"#C8A96E":"black"}`,
                                padding:'5px'
                            }}>
                                <ShoppingBag style={{color:"white"}} size={15}/>
                                <span style={{color:"white", fontSize:"0.87rem"}} className="text-foreground/20 uppercase">Orders</span>
                            </div>
                            </NavLink>
                            <NavLink to="/admin/seeUsers">
                             <div style={{
                                display:"flex",
                                flexDirection:"row",
                                gap:"5px",
                                alignItems:"center",
                                   color:`${pathname==="/admin/seeUsers"?"black":"white"}`,backgroundColor:`${pathname==="/admin/seeUsers"?"#C8A96E":"black"}`,
                                padding:'5px'
                            }}>
                                <Users style={{color:"white"}} size={15}/>
                                <span style={{color:"white", fontSize:"0.87rem"}} className="text-foreground/20 uppercase">Users</span>
                            </div>
                            </NavLink>
                        </div>

                    </div>
        </div>
        <Outlet/>
        </>
    )
};
export default AdminLayout;