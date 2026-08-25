
import { createBrowserRouter, createRoutesFromElements,Route,RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./components/Home";
import ProductShop from "./pages/ProductsShop";
import ProductsDetails from "./pages/ProductsDetail";
import Google from "./pages/Google";
import CartPage from "./pages/CartPage";
import { LoadingBarContainer } from "react-top-loading-bar";
import RegisterContextProvider from "./context/RegisterContextProvider";
import Payment from "./pages/Payment";
import PriceContextProvider from "./context/PriceContextProvider";
import LocationContext from "./context/LocationContext";
import LocationContextProvider from "./context/LocationContextProvider";
import Order from "./pages/Orders";
import AuthContextProvider from "./context/AuthContextProvider";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrder from "./pages/AdminOrder";
import AdminUsers from "./pages/AdminUsers";
import AdminLayout from "./pages/adminLayout";

import SearchContextProvider from "./context/SearchContextProvider";
import ProductContextProvider from "./context/ProductContextProvider";
import Contact from "./pages/Contact";


function App(){
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<RootLayout/>}>
        <Route index element={<Home/>}/>      
        <Route path="/shop" element={<ProductShop/>}/>
        <Route path="/shop/:productId" element={<ProductsDetails/>} />
        <Route path="/google/outh/confirmation" element={<Google/>}/>
        <Route path="/shop/cart" element={<CartPage/>}/>
        <Route path="/shop/items/payment" element={<Payment/>}/>
        <Route path="/orders" element={<Order/>}/>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<AdminDashboard/>}/>
          <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
          <Route path="/admin/addProducts" element={<AdminProducts/>}/>
          <Route path="/admin/orders" element={<AdminOrder/>}/>    
           <Route path="/admin/seeUsers" element={<AdminUsers/>}/>
        </Route>
        <Route path="/contactUs" element={<Contact/>}/>
        
        </Route>
      </Route>
    )
  )
  return(
    <>
        
         <LoadingBarContainer>
          <AuthContextProvider>
          <RegisterContextProvider>
            <PriceContextProvider>
              <LocationContextProvider>
                <SearchContextProvider>
                  <ProductContextProvider>
       <RouterProvider router={router}/>
       </ProductContextProvider>
       </SearchContextProvider>
       </LocationContextProvider>
       </PriceContextProvider>
       </RegisterContextProvider>
       </AuthContextProvider>
       </LoadingBarContainer>

    </>
  )
};
export default App;