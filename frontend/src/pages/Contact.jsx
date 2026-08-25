import { ArrowLeft, Mail, MapPin, Phone, PhoneCall, Plus, ShoppingBag, Users } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";

function Contact(){
     const middleView = useMediaQuery({maxWidth:"770px"});
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
                <NavLink to={'/shop'}
                style={{
                    width:'fit-content'
                }}
                className="flex items-center gap-2 bg-[#0D0D0D] text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#C8A96E] hover:text-[#0D0D0D] transition-colors"
                >
                <ArrowLeft size={13} />
                Back To Store
                </NavLink>
                <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase mb-3">get in touch</p>
                <h1 className="font-['Playfair_Display'] text-white text-5xl md:text-6xl">We'd Love To</h1>
                <h2 className="font-['Playfair_Display'] text-white text-5xl md:text-6xl italic">Hear From You</h2>
                 <span style={{opacity:0.5, fontSize:"0.8rem", color:'white', width:"30%"}} className='text-foreground/50'>
                Whether it's a question about an order, a sizing query, or just a thought — our team is here and happy to help.
                 </span>
            </div>
            </div>
            <div style={{
                padding:"3rem",
                width:"100%"
            }}>

                {/* the general contact dashboard type of */}
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

                    <Mail className="bg-green-300" size={35} style={{
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
                        }}>wr3dman@gmail.com</span>
                         <span style={{opacity:0.5, fontSize:"0.65rem"}} className='text-foreground/50 uppercase'>
                         we reply within 24 hours
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
                    <PhoneCall className="bg-amber-200" size={35} style={{
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
                        }}>+91-7550700717</span>
                         <span style={{opacity:0.5, fontSize:"0.65rem"}} className='text-foreground/50 uppercase'>
                         Mon-sat, 10am-7pm ist
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
                    <MapPin className="bg-blue-400" size={35} style={{
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
                {/* the two section which will debunk the query to the system */}
                  <div style={{
                marginTop:"20px",
                display:"flex",
                flexDirection:`${middleView?"column":"row"}`,
                width:"100%",
                gap:"15px"
            }}>
                {/* the left section in case of the bigger screens */}
                  <div style={{
                    width:`${middleView?"100%":"60%"}`,
                    display:"flex",
                    flexDirection:"column",
                    gap:"35px"
                }}>
                    
                </div>
                {/* the right section in case of the bigger screens */}
                 <div style={{
                    width:`${middleView?"100%":"40%"}`,
                    display:"flex",
                    flexDirection:"column",
                    gap:"35px"
                }}>
                   
                </div>
            </div>
            </div>
        </>
    )
};
export default Contact;