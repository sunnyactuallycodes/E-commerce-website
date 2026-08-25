import { useState } from "react";
import ProductContext from "./ProductContext";

function ProductContextProvider({children}){
    const [ajayProducts, setAjayProducts]= useState({});

    return(
       <ProductContext.Provider value={{ajayProducts, setAjayProducts}}>
         {children}
       </ProductContext.Provider>
    )
};
export default ProductContextProvider;