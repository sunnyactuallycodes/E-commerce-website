import axios from "axios";
import { ArrowRight, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import Loading from "../utils/loading";
import { useEffect } from "react";


function FeaturedBanner(){
    const mobileView = useMediaQuery({maxWidth:'500px'});
    const desktopView = useMediaQuery({maxWidth:'770px'});
    const middleView = useMediaQuery({maxWidth:'1000px'});
    const finalView = useMediaQuery({maxWidth:"1500px"});
    const [products_all, setProducts_all]= useState({});
    const [loading, setLoading]= useState(false);

     const fetchingProductsFromBackend = async()=>{
        try {
            setLoading(true);
            const backendResponse = await axios.get("http://localhost:4000/api/v1/fetchAllProducts", {withCredentials:true});
            const response = await backendResponse.data;
            setProducts_all(response);
            setLoading(false);
            
        } catch (error) {
            console.error("internal server error occured while fetching the data: ", error);
            return toast.error("Can't load Products");
        }
    };

    const relatedProducts = products_all.success &&  products_all.data.slice(0,8);
    const renderingProducts=[
        {
            id:9891249,
            src:"https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price:'$149',
            name:"Drift Low Trainer",
            brand:"Maison Blanc"
        },
        {
            id:1,
            src:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price:'$419',
            name:"Arc Wool Coat",
            brand:'Studio Forty'
        },
        {
            id:8999,
            src:"https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1011&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price:"$200",
            name:"desert boot classic",
            brand:'Cord and Sole'
        },
        {
            id:909,
            src:"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1005&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price:"$300",
            name:"Merino Knit sweater",
            brand:"Nodra Objects"
        },
        {
            id:41200,
            src:"https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price:'$50',
            name:"Platform Chelsea",
            brand:"Hiest Studio"
        },
        {
            id:124,
            src:"https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price:"$120",
            name:'Wide Leg Trousers',
            brand:"Studio Forty"
        },
        {
            id:9151,
            src:"https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=969&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price:"$540",
            name:"Criser sneakers",
            brand:"Adidas"
        },
        {
            id:24111,
            src:"https://images.unsplash.com/photo-1467043237213-65f2da53396f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price:"$40",
            name:"Converse 9090",
            brand:"converse"
        }
    ]

    useEffect(()=>{
        fetchingProductsFromBackend();
    }, []);
    return(
        <>
        {
            loading && <Loading/>
        }
        <div style={{
            marginTop:"4rem",
            padding:"3rem",
            width:"100vw"
        }}>
             <span className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase mb-6">Curated selection</span>
              <div style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                marginTop:"1rem"
            }}>
                <p className="font-['Playfair_Display'] text-4xl md:text-5xl text-foreground" style={{
                    fontWeight:570
                }}>New Arrivals</p>
                <button
                    className="hidden md:flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/20 pb-0.5"
                >
                    8 Pieces
          </button>
            </div>
            <div style={{
                marginTop:'2rem',
                width:"100%",
                border:"0.2px solid black",
                opacity:0.3
            }}>
            </div>
            {   
                middleView && !desktopView &&

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
                  products_all.success && products_all.data.map((products)=>(
                    <div key={products._id}>
                     <NavLink to={`/shop/${products._id}`}>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'5px'
                    }}>
                        <img src={products.productImages[0]} alt="logo" style={{
                            width:"100%",
                            height:`${mobileView?'30vh':'50vh'}`
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
                                }} className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{products.brandName}</p>
                                <p style={{
                                    fontFamily:"Inter",
                                }} className="text-sm text-foreground hover:text-[#C8A96E] transition-colors">{products.productName}</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">₹ {products.Price}</p>

                            </div>
                        </div>
                        </NavLink>
                    </div>
                ))
            }
              
            </div>
           
            
              
                </>
            }
            {desktopView && 
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
                products_all.success && products_all.data.map((products)=>(
                    <div key={products._id}>
                        <NavLink to={`/shop/${products._id}`}>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'5px'
                    }}>
                        <img src={products.productImages[0]} alt="logo" style={{
                            width:"100%",
                            height:`${mobileView?'30vh':'50vh'}`
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
                                }} className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{products.brandName}</p>
                                <p style={{
                                    fontFamily:"Inter",
                                }} className="text-sm text-foreground hover:text-[#C8A96E] transition-colors">{products.productName}</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">₹ {products.Price}</p>

                            </div>
                        </div>
                    </NavLink>
                    </div>
                ))
            }
           
            </div>
            
            </>
            }
            {finalView && !middleView && 
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
                products_all.success && products_all.data.map((products)=>(
                    <>
                      <NavLink to={`/shop/${products._id}`}>
                    <div key={products.id} style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'5px'
                    }}>
                        <img src={products.productImages[0]} alt="logo" style={{
                            width:"100%",
                            height:`${mobileView?'30vh':'50vh'}`
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
                                }} className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{products.brandName}</p>
                                <p style={{
                                    fontFamily:"Inter",
                                }} className="text-sm text-foreground hover:text-[#C8A96E] transition-colors">{products.productName}</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">₹ {products.Price}</p>

                            </div>
                    </div>
                     </NavLink>
                    </>
                ))
            }
          
           
            </div>
            
            </>
            }
            <div style={{
                marginTop:"3rem",
                textAlign:"center"
            }}>
                <NavLink to={"/shop"} className="text-xs tracking-[0.2em] uppercase text-foreground/60 " style={{
                    display:"inline-block",
                    paddingRight:"30px",
                    paddingLeft:"30px",
                    paddingTop:"15px",
                    paddingBottom:"15px",
                    border:"0.5px solid black"
                }}>
                    Load More
                </NavLink>
            </div>
            

        </div>
        </>
    )
};
export default FeaturedBanner;