import { ArrowLeft, ImageIcon, Package, Plus, ShoppingBag, TrendingUp, User, Users } from "lucide-react";
import ImageDropInput from '../components/ImageDropInput.jsx';
import { useState } from "react";
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import LoadingBar from "../utils/LoadingBar.jsx";
import DynamicInputList from "../utils/DynamicInputList.jsx";
import {useMediaQuery} from 'react-responsive';
import { useLocation } from "react-router-dom";


function AdminProducts(){

    const [productImages, setProductImages]= useState([]);
    const [productName, setProductName]= useState("");
    const [brandName, setBrandName]= useState("");
    const [productDescription, setProductDescription]= useState("");
    const [Price, setPrice]= useState(0);
    const [productDetails, setProductDetails]= useState([""]);
    const [productSize, setProductSize]= useState([]);
    const [category , setCategory]= useState("");
    const [loading, setLoading]= useState(false);


    const location = useLocation();
    const {pathName}= location;
    const middleView = useMediaQuery({maxWidth:"740px"});

    const postProducts = async(e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("productName", productName);
            formData.append("brandName", brandName);
            formData.append("productDescription", productDescription);
            formData.append("category", category);
            formData.append("Price", Price);
            productImages.forEach((img) => {
             formData.append("productImages", img.file); // img.file is the real File object
            });
            formData.append("productSize", productSize);
            formData.append("productDetails",productDetails);
            const backendRes = await axios.post("https://e-commerce-website-lac-eight.vercel.app/api/v1/postProduct", formData);
            await backendRes.data;
            console.log(backendRes.data);
            setLoading(false);
        } catch (error) {
            console.error("client side error during uploading: ", error);
            toast.error("internal server error");
        }
    }


    return(
        <>
        <ToastContainer/>
        {
            loading && <LoadingBar/>
        }
         <div style={{
            padding:"3rem"
        }}>
              <p style={{
                fontWeight:"510",
                fontSize:"1.9rem"
            }} className="font-['Playfair_Display'] text-foreground">Add Products</p>
             <span style={{opacity:0.5, fontSize:"0.85rem"}} className='text-foreground/50 '>
             Fill in the details bellow to list a new item
            </span>

            <form onSubmit={postProducts}>
            <div style={{
                marginTop:"20px",
                display:"flex",
                flexDirection:`${middleView?"column":"row"}`,
                width:"100%",
                gap:"15px"
            }}>
                <div style={{
                    width:`${middleView?"100%":"60%"}`,
                    display:"flex",
                    flexDirection:"column",
                    gap:"35px"
                }}>
                    <div style={{
                        display:"flex",
                    flexDirection:"column",
                    padding:'20px',
                    backgroundColor:"white",
                    width:"100%"
                    }}>
                    <span style={{opacity:0.5, fontSize:"0.8rem"}} className='text-foreground/50 uppercase'>
                     Basic information
                    </span>
                    <span style={{opacity:0.75, fontSize:"0.8rem", marginTop:"30px"}} className='text-foreground/50 uppercase'>
                     Product Name
                    </span>
                    <input value={productName} onChange={(e)=>setProductName(e.target.value)} placeholder="eg. Drift Trainer" type="text" style={{
                        width:"100%",
                        padding:'10px',
                        backgroundColor:"#F7F5F0",
                        marginTop:"10px",
                        outline:"0.4px solid grey"
                    }} />
                     <span style={{opacity:0.75, fontSize:"0.8rem", marginTop:"30px"}} className='text-foreground/50 uppercase'>
                     Brand Name
                    </span>
                    <input value={brandName} onChange={(e)=>setBrandName(e.target.value)} placeholder="eg. Adidas" type="text" style={{
                        width:"100%",
                        padding:'10px',
                        backgroundColor:"#F7F5F0",
                        marginTop:"10px",
                        outline:"0.4px solid grey"
                    }} />
                     <span style={{opacity:0.75, fontSize:"0.8rem", marginTop:"30px"}} className='text-foreground/50 uppercase'>
                     category
                    </span>
                    <input value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="eg. Drift Trainer" type="text" style={{
                        width:"100%",
                        padding:'10px',
                        backgroundColor:"#F7F5F0",
                        marginTop:"10px",
                        outline:"0.4px solid grey"
                    }} />
                    <div style={{
                        display:"flex",
                        flexDirection:"row",
                        width:"100%",
                        marginTop:"10px",
                        justifyContent:"space-between",
                        alignItems:"center",
                        gap:"10px"
                    }}>
                        <div style={{
                            display:'flex',flexDirection:"column",gap:"5px",width:"50%"
                        }}>
                            <span style={{opacity:0.75, fontSize:"0.8rem", marginTop:"30px"}} className='text-foreground/50 uppercase'>
                            Price
                            </span>
                            <input value={Price} onChange={(e)=>setPrice(e.target.value)} placeholder="eg. Drift Trainer" type="text" style={{
                                width:"100%",
                                padding:'10px',
                                backgroundColor:"#F7F5F0",
                                marginTop:"10px",
                                outline:"0.4px solid grey"
                            }} />
                        </div>
                        <div style={{
                            display:'flex',flexDirection:"column",gap:"5px",width:"50%"
                        }}>
                            <span style={{opacity:0.75, fontSize:"0.8rem", marginTop:"30px"}} className='text-foreground/50 uppercase'>
                            optional price (sale)
                            </span>
                            <input placeholder="eg. Drift Trainer" type="text" style={{
                                width:"100%",
                                padding:'10px',
                                backgroundColor:"#F7F5F0",
                                marginTop:"10px",
                                outline:"0.4px solid grey"
                            }} />
                        </div>

                    </div>
                     <span style={{opacity:0.75, fontSize:"0.8rem", marginTop:"30px"}} className='text-foreground/50 uppercase'>
                     Badge
                    </span>
                    <input placeholder="eg. Drift Trainer" type="text" style={{
                        width:"50%",
                        padding:'10px',
                        backgroundColor:"#F7F5F0",
                        marginTop:"10px",
                        outline:"0.4px solid grey"
                    }} />
                    </div>
                    <div style={{
                        display:"flex",
                    flexDirection:"column",
                    padding:'20px',
                    backgroundColor:"white",
                    width:"100%"
                    }}>
                        <span style={{opacity:0.5, fontSize:"0.8rem"}} className='text-foreground/50 uppercase'>
                            Description
                        </span>
                        <textarea value={productDescription} onChange={(e)=>setProductDescription(e.target.value)} placeholder="write a compelling description of the product" style={{
                            width:"100%",
                            outline:"0.2px solid grey",
                            padding:"10px",
                            backgroundColor:"#F7F5F0",
                            marginTop:"10px"
                        }}/>
                    </div>
                    <div style={{
                        display:"flex",
                    flexDirection:"column",
                    padding:'20px',
                    backgroundColor:"white",
                    width:"100%"
                    }}>
                    <span style={{opacity:0.5, fontSize:"0.8rem"}} className='text-foreground/50 uppercase'>
                        Variants
                    </span>
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        width:"100%",
                        marginTop:"10px", 
                        gap:"10px"
                    }}>
                        <div style={{
                            display:'flex',flexDirection:"column",gap:"5px",width:"50%"
                        }}>
                             <DynamicInputList
                                    label="Sizes of product"
                                    placeholder="e.g. M, 29, XL"
                                    items={productSize}
                                    setItems={setProductSize}
                                    />
                        </div>
                        <div style={{
                            display:'flex',flexDirection:"column",gap:"5px",width:"50%"
                        }}>
                                   <DynamicInputList
                                    label="Product Details"
                                    placeholder="e.g. 100% Cotton"
                                    items={productDetails}
                                    setItems={setProductDetails}
                                    /> 
    
                        </div>

                    </div>


                    </div>
                    
                   
       
                </div>
                <div style={{
                    width:`${middleView?"100%":"40%"}`,
                    display:"flex",
                    flexDirection:"column",
                    gap:"35px"
                }}>
                     <div style={{
                        display:"flex",
                    flexDirection:"column",
                    padding:'20px',
                    backgroundColor:"white",
                    width:"100%"
                    }}>
                         <span style={{opacity:0.5, fontSize:"0.8rem"}} className='text-foreground/50 uppercase'>
                         product images
                         </span>
                         <p className="text-muted-foreground text-sm">Upload high-quality images showcasing the destination and experience.</p>
                         <div style={{marginTop:"20px"}} className="aspect-3/4 flex flex-col gap-3 text-foreground/25">
                         <div style={{
                            marginTop:"20px"
                         }}>
                         <ImageDropInput value={productImages} onChange={setProductImages} maxImages={4}/>
                         </div>
                    </div>
                    </div>
                    <div style={{
                    display:"flex",
                    flexDirection:"column",
                    width:"100%"
                    }}>
                        <button type="submit" style={{
                            backgroundColor:"black",
                            color:"white",
                            display:"flex",
                            flexDirection:"row",
                            alignItems:"center",
                            justifyContent:"center",
                            gap:"5px",
                            padding:"15px"
                        }}>
                            <Plus size={15}/>
                            <span style={{
                                wordSpacing:"0.3rem",
                                letterSpacing:"0.12rem",
                                fontFamily:"Inter",
                                fontSize:"0.8rem"
                            }}>ADD PRODUCT</span>
                        </button>
                    </div>
                </div>
            </div>
            </form>

        
      
        
         
          
        </div>
        </>
    )
};
export default AdminProducts;