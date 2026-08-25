import { ArrowRightIcon } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";

function Hero(){
    const mobileView = useMediaQuery({maxWidth:'600px'});
    return(
        <>
        <div style={{
            postion:"relative",
            marginTop:'3.8rem',
            height:'92.8vh',
            width:'100vw',
            backgroundColor:'#0D0D0D'          
        }}>

        <img src="null" style={{
            position:"absolute",

            height:'100%',
            width:'100%',
            inset:0,
            background:"url('/hero.jpeg')",
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center",
            backgroundSize:"cover",
            opacity:"0.6",
            zIndex:0
        }} alt="" />
        <div style={{
            display:'flex',
            width:"100%",
            flexDirection:"row",
            justifyContent:'flex-end',
            backgroundColor:'transparent',
            paddingTop:"5rem",
            zIndex:100
        }}>
           <div style={{
            width:"50%",
            display:'flex',
            flexDirection:"column",
            backgroundColor:'transparent',
            zIndex:101,
            marginTop:"5.5rem",
            gap:"20px",
            
           }}>
                <span className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase mb-6" style={{
                    backgroundColor:"transparent",
                    fontWeight:'600',
                    fontFamily:"Inter"
                }}>Summer Collection 2026 </span>
                <div style={{
                    backgroundColor:"transparent"
                }}>
                <h1 className="text-white text-5xl md:text-7xl leading-[1.05] mb-8" style={{
                    backgroundColor:'transparent',
                    fontFamily:'Playfair Display'
                }}>Wear What</h1>
            
                <h1 className=" text-white text-5xl md:text-7xl leading-[1.05] mb-8" style={{
                    backgroundColor:'transparent',
                    fontFamily:"Playfair Display"
                }}>You Mean.</h1>
                <br/>
                </div>
                <span className="text-white/60 text-sm leading-relaxed mb-10 max-w-md tracking-wide" style={{
                    backgroundColor:"transparent"
                }}>
                    Curated footwear and fashion for those who move through the world
                    with intention. New arrivals in every size.
                </span>
                <div style={{
                    display:"flex",
                    flexDirection:"row",
                    alignItems:'center',
                    width:"fit-content",
                    backgroundColor:"transparent",
                    gap:"15px",
                    marginTop:"10px",
                    flexWrap:"wrap"
                    }}>
                        <NavLink to="/shop">
                        <span className="text-[#0D0D0D] px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#b8996e] transition-colors" style={{
                            display:"flex",
                            flexDirection:"row",
                            margin:"5px",  
                            backgroundColor:'#C8A96E',
                            alignItems:"center",
                            paddingRight:"1.5rem",
                            paddingLeft:'1.5rem',
                            paddingTop:"0.5rem",
                            paddingBottom:"0.5rem",
                        }}>
                            SHOP
                            <ArrowRightIcon style={{
                                backgroundColor:'transparent',
                                height:"20px"
                            }}/>
                        </span>
                        </NavLink>
                       
                        <span className="text-white/70 text-xs tracking-[0.2em] uppercase border-b border-white/30 pb-0.5 hover:text-white hover:border-white transition-colors" style={{
                            backgroundColor:'transparent',
                        }}>
                            Explore Lookbook
                        </span>
                </div>
                {
                    !mobileView &&
                    <>
                       <div style={{
                        marginTop:"2rem",
                        width:"90%",
                        border:"1px solid white",
                        
                       }}>
                        </div> 
                        <div style={{
                            display:"flex",
                            flexDirection:'row',
                            gap:'30px',
                            justifyContent:'flex-start',
                            alignItems:"center",
                            backgroundColor:"transparent"
                        }}>
                            <div style={{
                                display:'flex',
                                flexDirection:'column',
                                gap:"5px",
                                backgroundColor:'transparent'
                            }}>
                                <p style={{
                                    backgroundColor:'transparent'
                                }} className="text-white font-['Playfair_Display'] text-2xl">2400+</p>
                                <p style={{
                                    backgroundColor:'transparent'
                                }} className="text-white/40 text-xs tracking-widest uppercase mt-1">Products</p>
                            </div>
                            <div style={{
                                display:'flex',
                                flexDirection:'column',
                                gap:"5px",
                                backgroundColor:'transparent'
                            }}>
                                <p style={{
                                    backgroundColor:'transparent'
                                }} className="text-white font-['Playfair_Display'] text-2xl">180+</p>
                                <p style={{
                                    backgroundColor:'transparent'
                                }} className="text-white/40 text-xs tracking-widest uppercase mt-1">Brands</p>
                            </div>
                            <div style={{
                                display:'flex',
                                flexDirection:'column',
                                gap:"5px",
                                backgroundColor:'transparent'
                            }}>
                                <p style={{
                                    backgroundColor:'transparent'
                                }} className="text-white font-['Playfair_Display'] text-2xl">Free+</p>
                                <p style={{
                                    backgroundColor:'transparent'
                                }} className="text-white/40 text-xs tracking-widest uppercase mt-1">returns</p>
                            </div>
                           
                        </div>
                    </>
                }
           </div>

        </div>
       
        </div>
        </>
    )
};
export default Hero;