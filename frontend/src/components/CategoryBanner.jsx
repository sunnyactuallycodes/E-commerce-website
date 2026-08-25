import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

function CategoryBanner(){
    return(
        <>
        <div style={{
            marginTop:"3.5rem",
            padding:"3rem",
            width:'100vw',
           
        }}>
            <span className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase mb-6">Browse by category</span>
            <div style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                marginTop:"1rem"
            }}>
                <p className="font-['Playfair_Display'] text-4xl md:text-5xl text-foreground" style={{
                    fontWeight:570
                }}>Shop the Edit</p>
                <button
                    className="hidden md:flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/20 pb-0.5"
                >
                    View All 
                    <ArrowRight size={12} />
          </button>
            </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 " style={{
                marginTop:'2rem'
              }}>
               <NavLink className="group relative overflow-hidden aspect-3/4 bg-[#E8E4DE]">
                <img style={{zIndex:0}} src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop&auto=format" alt="photo1" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between" style={{backgroundColor:' #00008083',padding:"10px", border:'none'}}>
              <div style={{border:'none', backgroundColor:'transparent'}}>
              <p className="text-white/60 text-xs tracking-widest uppercase mb-1" style={{backgroundColor:'transparent'}}>250+ styles</p>
              <h3 style={{
               
                backgroundColor:'transparent'
              }} className="font-['Playfair_Display'] text-white text-2xl" >Footwear</h3>
              </div>
               <div style={{backgroundColor:" #00008083"}} className="w-9 h-9 border border-white/40 flex items-center justify-center group-hover:bg-[#C8A96E] group-hover:border-[#C8A96E] transition-colors">
                  <ArrowRight size={14} style={{backgroundColor:' #00008083'}} className="text-white" />
                </div>

              </div>
            
               </NavLink>

                <NavLink className="group relative overflow-hidden aspect-3/4 bg-[#E8E4DE]">
                <img style={{zIndex:0}} src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop&auto=format" alt="photo1" className="absolute inset-0 w-full h-full object-cover" />
               
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between" style={{backgroundColor:' #00008083',padding:"10px", border:'none'}}>
              <div style={{border:'none', backgroundColor:"transparent"}}>
              <p className="text-white/60 text-xs tracking-widest uppercase mb-1" style={{backgroundColor:'transparent'}}>250+ styles</p>
              <h3 style={{
               
                backgroundColor:' transparent'
              }} className="font-['Playfair_Display'] text-white text-2xl" >Clothing</h3>
              </div>
               <div style={{backgroundColor:" #00008083"}} className="w-9 h-9 border border-white/40 flex items-center justify-center group-hover:bg-[#C8A96E] group-hover:border-[#C8A96E] transition-colors">
                  <ArrowRight size={14} style={{backgroundColor:' #00008083'}} className="text-white" />
                </div>
                </div>
               </NavLink>
                <NavLink className="group relative overflow-hidden aspect-3/4 bg-[#E8E4DE]">
                <img style={{zIndex:0}} src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop&auto=format" alt="photo1" className="absolute inset-0 w-full h-full object-cover" />
               
               <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between" style={{backgroundColor:' #00008083',padding:"10px", border:'none'}}>
              <div style={{border:'none', backgroundColor:"transparent"}}>
              <p className="text-white/60 text-xs tracking-widest uppercase mb-1" style={{backgroundColor:'transparent'}}>250+ styles</p>
              <h3 style={{
                zIndex:100,
                backgroundColor:'transparent'
              }} className="font-['Playfair_Display'] text-white text-2xl" >Bags</h3>
              </div>
               <div style={{backgroundColor:" #00008083"}} className="w-9 h-9 border border-white/40 flex items-center justify-center group-hover:bg-[#C8A96E] group-hover:border-[#C8A96E] transition-colors">
                  <ArrowRight size={14} style={{backgroundColor:' #00008083'}} className="text-white" />
                </div>
                </div>
               </NavLink>
               
               
                
            </div>
        </div>
        </>   
    )
};
export default CategoryBanner;