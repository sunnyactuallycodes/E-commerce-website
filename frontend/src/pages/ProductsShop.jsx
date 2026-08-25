import { useMediaQuery } from "react-responsive";
import { SlidersHorizontal,ChevronDown, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useCallback, useContext, useEffect, useEffectEvent, useMemo, useState } from "react";
import {ToastContainer} from 'react-toastify';
import {toast} from 'react-toastify';
import axios from 'axios';
import Loading from "../utils/loading";
import SearchContext from "../context/SearchContext";
import ProductContext from "../context/ProductContext";


function ProductShop(){
    const {searchOn, setSearchOn}= useContext(SearchContext);
  
    const [searchTerm, setSearchTerm]= useState('');
   

  

    // the function to optimise the search request from the user 
    
    //fallback till the products loads 
    const [loading,setLoading]= useState(false);


    // filter for the category 
    const [filter, setFilter]= useState("all");

    //fetching the products from backend 
    const [products, setProducts] = useState({});
   
    //function to fetch the products
    const fetchingProductsFromBackend = async()=>{
        try {
            setLoading(true);
            const backendResponse = await axios.get("http://localhost:4000/api/v1/fetchAllProducts", {withCredentials:true});
            const response = await backendResponse.data;
            setProducts(response);
            setLoading(false);
            
        } catch (error) {
            console.error("internal server error occured while fetching the data: ", error);
            return toast.error("Can't load Products");
        }
    }
    
    

    useEffect(()=>{
        fetchingProductsFromBackend();
        
    },[]);
    let term = searchTerm.trim().toLowerCase();

    const filteredPackage = products.success && products.data.filter(p=>p.productName?.toLowerCase().includes(term)|| p.brandName?.toLowerCase().includes(term) || p.brandName?.toLowerCase().includes(term));
    console.log(filteredPackage);
    



    // when filter is applied show shoes only
    const shoeProducts =products.success && products.data.filter((product)=>product.category==='shoes');


   
    

    const clothingProducts = products.success && products.data.filter((product)=>product.category==="clothing");

    const mobileView = useMediaQuery({maxWidth:'550px'});
   
    const desktopView = useMediaQuery({maxWidth:'770px'});
    const middleView = useMediaQuery({maxWidth:'1000px'});
    const finalView = useMediaQuery({maxWidth:"1500px"});
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
    return(
        <>
        <ToastContainer/>
        

        {
            loading && <Loading/>
        }


          
        
             {searchOn && 
               <div style={{
                width:'100vw',
                display:'flex',
                flexDirection:'row',
                justifyContent:"center",
                alignItems:'center',
                gap:"7px",
                borderTop:'0.5px solid black',
                backgroundColor:"white",
                position:'fixed',
                padding:'8px'
               }}>
               <Search style={{
                width:'16px',
                height:'16px'
               }}/>
                <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} autoFocus type="text" placeholder='Search Shoes, clothing, brands..' style={{
                    display:'inline-block',
                    padding:'10px',
                    outline:'none',
                    backgroundColor:'white',
                    fontFamily:"Playfair Display",
                    width:"40%"
                }} />
               </div>
      }
  
        <div style={{
            backgroundColor:'black',
            padding:"3rem",
            marginTop:"5rem"
        }}>
            <div style={{
                display:'flex',
                flexDirection:"column",
                gap:'8px'
            }}>
                <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase mb-3">All products</p>
                <h1 className="font-['Playfair_Display'] text-white text-5xl md:text-6xl">The Shop</h1>
            </div>
        </div>
        <div style={{
            marginTop:"2.5rem",
            padding:'3rem',
            display:'flex',
            flexDirection:"column",
            gap:"8px"
        }}>
            <span className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase mb-6">Curated Selection</span>
            <p style={{
                fontWeight:"510"
            }} className="font-['Playfair_Display'] text-4xl md:text-5xl text-foreground">New Arrivals</p>
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
                    }}>Shoes</span>
                    <span onClick={()=>setFilter('clothing')} className="text-xs tracking-[0.15em] uppercase" style={{
                        cursor:"pointer",
                        color:`${filter==='clothing'?"white":"black"}`,
                        backgroundColor:`${filter==="clothing"?"black":"white"}`,
                        paddingRight:"15px",
                        paddingLeft:'15px',
                        paddingTop:"10px",
                        paddingBottom:'10px',
                        fontWeight:"550"
                    }}>CLothing</span>
                </div>
                {!mobileView && <div style={{
                    display:'flex',
                    flexDirection:"row",
                    gap:"10px",
                    flexWrap:"wrap",
                    alignItems:"center"
                }}>
                     <div className="flex items-center gap-2 text-xs text-foreground/50">
              <SlidersHorizontal size={13} />
              <span className="tracking-wider uppercase">Filter</span>
            </div>
                    <div className="relative">
              <select
                className="appearance-none bg-transparent text-xs tracking-wider uppercase text-foreground/50 pr-5 outline-none cursor-pointer hover:text-foreground transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown size={11} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/40" />
            </div>
                </div>}
            </div>
            <div style={{
                padding:'3rem'
            }}>

            {/* Views for the middle screen */}
           
          
            {
               !searchOn && products.data && middleView && !desktopView &&  filter==="all" && 
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

                products.data.map((product)=>(
                    <div key={product._id}>
                     <NavLink to={`/shop/${product._id}`}>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'5px'
                    }}>
                        <img src={product.productImages[0]} alt="logo" style={{
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
                                }} className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{product.brandName}</p>
                                <p style={{
                                    fontFamily:"Inter",
                                }} className="text-sm text-foreground hover:text-[#C8A96E] transition-colors">{product.productName}</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">₹ {product.Price}</p>

                            </div>
                        </div>
                    
                    </NavLink>
                    </div>
                ))
            }
              
            </div>
            
            </>
              
        }
            {
                 !searchOn &&  products.data && middleView && !desktopView && filter==="shoes" &&   <>
                      <div style={{
                    display:"grid",
                    gridTemplateColumns:'32% 32% 32%',
                    columnGap:'19.7px',
                    rowGap:'20px',
                    width:"100%",
                    marginTop:'3rem'
                }}>
                 {

                shoeProducts.map((product)=>(
                    <div key={product._id}>
                     <NavLink to={`/shop/${product._id}`}>
                    <div key={product.id} style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'5px'
                    }}>
                        <img src={product.productImages[0]} alt="logo" style={{
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
                                }} className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{product.brandName}</p>
                                <p style={{
                                    fontFamily:"Inter",
                                }} className="text-sm text-foreground hover:text-[#C8A96E] transition-colors">{product.productName}</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">₹ {product.Price}</p>

                            </div>
                        </div>
                    
                    </NavLink>
                    </div>
                ))
            }
              
            </div>
            
            </>
              
            }
            {
                  !searchOn &&  products.data && middleView && !desktopView && filter==="clothing" && 
                clothingProducts.map((product)=>(
                     <div key={product._id}>
               
                  <NavLink to={`/shop/${product._id}`}>
                <div style={{
                    display:"grid",
                    gridTemplateColumns:'32% 32% 32%',
                    columnGap:'19.7px',
                    rowGap:'20px',
                    width:"100%",
                    marginTop:'3rem'
                }}>
             
                    <>
                    <div key={product._id} style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'5px'
                    }}>
                        <img src={product.productImages[0]} alt="logo" style={{
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
                                }} className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{product.brandName || "Maison black"}</p>
                                <p style={{
                                    fontFamily:"Inter",
                                }} className="text-sm text-foreground hover:text-[#C8A96E] transition-colors">{product.productName}</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">₹ {product.Price}</p>
                            </div>
                        </div>
                    
                    </>     
            </div>
            </NavLink>
            </div>
                ))
            }


            {/* views for the desktop screen */}
            { !searchOn &&  desktopView &&  filter=== "all" && 
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
                products.data && products.data.map((product)=>(
                      <div key={product._id}>
                       <NavLink to={`/shop/${product._id}`}>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'5px'
                    }}>
                        <img src={product.productImages[0]} alt="logo" style={{
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
                                }} className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{product.brandName || "maison black"}</p>
                                <p style={{
                                    fontFamily:"Inter",
                                }} className="text-sm text-foreground hover:text-[#C8A96E] transition-colors">{product.productName}</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">₹ {product.Price}</p>

                            </div>
                        </div>
                      </NavLink>
                    
                    </div>
                ))
            }

           
            </div>
            
            </>
            }
            {
               !searchOn &&   desktopView && 
                 filter=== "shoes" && 
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
                shoeProducts && shoeProducts.map((product)=>(
                      <div key={product._id}>
                       <NavLink to={`/shop/${product._id}`}>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'5px'
                    }}>
                        <img src={product.productImages[0]} alt="logo" style={{
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
                                }} className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{product.brandName || "maison black"}</p>
                                <p style={{
                                    fontFamily:"Inter",
                                }} className="text-sm text-foreground hover:text-[#C8A96E] transition-colors">{product.productName}</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">₹ {product.Price}</p>

                            </div>
                        </div>
                        </NavLink>
                    
                    </div>
                ))
            }
            </div>
                 </>
            }
            {
               !searchOn &&   desktopView && 
                 filter=== "clothing" && 
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
                clothingProducts && clothingProducts.map((product)=>(
                      <div key={product._id}>
                      <NavLink to={`/shop/${product._id}`}>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'5px'
                    }}>
                        <img src={product.productImages[0]} alt="logo" style={{
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
                                }} className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{product.brandName || "maison black"}</p>
                                <p style={{
                                    fontFamily:"Inter",
                                }} className="text-sm text-foreground hover:text-[#C8A96E] transition-colors">{product.productName}</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">₹ {product.Price}</p>

                            </div>
                        </div>
                      </NavLink>
                    
                    </div>
                ))
            }
            </div>
                 </>
            }

            {/* views for the final screen */}
            { !searchOn && finalView && !middleView && filter==="all" &&
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
                products.data && products.data.map((product)=>(
                    <div key={product._id}>
                    <NavLink to={`/shop/${product._id}`}>
                    <div key={product.id} style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'5px'
                    }}>
                        <img src={product.productImages[0]} alt="logo" style={{
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
                                }} className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{product.brandName || "Maison Black"}</p>
                                <p style={{
                                    fontFamily:"Inter",
                                }} className="text-sm text-foreground hover:text-[#C8A96E] transition-colors">{product.productName}</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">₹ {product.Price}</p>

                            </div>
                        </div>
                    </NavLink>

                    </div>
                ))
            }
            </div>
            
            </>
            }
            {
               !searchOn &&  finalView && !middleView && filter==="shoes" && 
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
                     shoeProducts && shoeProducts.map((product)=>(
                    <div key={product._id}>
                    <NavLink to={`/shop/${product._id}`}>
                    <div key={product.id} style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'5px'
                    }}>
                        <img src={product.productImages[0]} alt="logo" style={{
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
                                }} className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{product.brandName || "Maison Black"}</p>
                                <p style={{
                                    fontFamily:"Inter",
                                }} className="text-sm text-foreground hover:text-[#C8A96E] transition-colors">{product.productName}</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">₹ {product.Price}</p>

                            </div>
                        </div>
                    </NavLink>

                    </div>
                ))
                }
                
            </div>
                </>
            }
            {
               !searchOn &&    finalView && !middleView && filter==="clothing" && 
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
                     clothingProducts && clothingProducts.map((product)=>(
                    <div key={product._id}>
                    <NavLink to={`/shop/${product._id}`}>
                    <div key={product.id} style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'5px'
                    }}>
                        <img src={product.productImages[0]} alt="logo" style={{
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
                                }} className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{product.brandName || "Maison Black"}</p>
                                <p style={{
                                    fontFamily:"Inter",
                                }} className="text-sm text-foreground hover:text-[#C8A96E] transition-colors">{product.productName}</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">₹ {product.Price}</p>

                            </div>
                        </div>
                    </NavLink>

                    </div>
                ))
                }
                
            </div>
                </>
            }
            {/* showing results for the search term  */}
            {
                searchOn && 
                <>
                <span style={{
                    fontFamily:"Inter",
                    fontSize:"1rem",
                   
                }}>
                    Showing results for {searchTerm}: <span style={{
                        color: "#C8A96E"
                    }}>{filteredPackage.length}</span>
                </span>
                </>
            }
            {/* for the screen with maxWidth 1500px to 990px not for middle view  */}
            { searchOn && finalView && !middleView && 
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
                products.data && filteredPackage.map((product)=>(
                    <div key={product._id}>
                    <NavLink to={`/shop/${product._id}`}>
                    <div key={product.id} style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'5px'
                    }}>
                        <img src={product.productImages[0]} alt="logo" style={{
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
                                }} className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{product.brandName || "Maison Black"}</p>
                                <p style={{
                                    fontFamily:"Inter",
                                }} className="text-sm text-foreground hover:text-[#C8A96E] transition-colors">{product.productName}</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">₹ {product.Price}</p>

                            </div>
                        </div>
                    </NavLink>

                    </div>
                ))
            }
            </div>
            
            </>
            }

            {/* for the screen with middle view now */}
            {searchOn &&  desktopView &&
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
                products.data && filteredPackage.map((product)=>(
                      <div key={product._id}>
                       <NavLink to={`/shop/${product._id}`}>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'5px'
                    }}>
                        <img src={product.productImages[0]} alt="logo" style={{
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
                                }} className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{product.brandName || "maison black"}</p>
                                <p style={{
                                    fontFamily:"Inter",
                                }} className="text-sm text-foreground hover:text-[#C8A96E] transition-colors">{product.productName}</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">₹ {product.Price}</p>

                            </div>
                        </div>
                      </NavLink>
                    
                    </div>
                ))
            }
            </div>
            </>
}
            {/* for middle screens now last fit */}
             {
               searchOn && products.data && middleView && !desktopView && 
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

                products.data && filteredPackage.map((product)=>(
                    <div key={product._id}>
                     <NavLink to={`/shop/${product._id}`}>
                    <div key={products.id} style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'5px'
                    }}>
                        <img src={product.productImages[0]} alt="logo" style={{
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
                                }} className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{product.brandName}</p>
                                <p style={{
                                    fontFamily:"Inter",
                                }} className="text-sm text-foreground hover:text-[#C8A96E] transition-colors">{product.productName}</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">₹ {product.Price}</p>

                            </div>
                        </div>
                    
                    </NavLink>
                    </div>
                ))
            }
              
            </div>
            
            </>
              
        }



            {/* loading all the products of the grid */}
            <div style={{
                marginTop:"3rem",
                textAlign:"center"
            }}>
                <NavLink className="text-xs tracking-[0.2em] uppercase text-foreground/60 " style={{
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
export default ProductShop;