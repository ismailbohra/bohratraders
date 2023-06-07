import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import UserLogin from "../containers/Users/userLogin/UserLogin";
import BadRequest from "../containers/shared/BadRequests/BadRequest";
import Auth from "../utils/Auth";
import { USER_TYPES } from "../utils/Enum";
import UserRegister from "../containers/Users/userRegistration/UserRegister";
import ForgetPassword from "../containers/Users/userLogin/ForgetPassword";
import ResetPassword from "../containers/Users/userLogin/ResettPassword";
import Dashboard from "../containers/Dashboard";
import  Setting  from "../containers/setting/setting";
import Product from "../containers/Products/Product";
import Home from "../containers/Home/Home";
import Order from "../containers/Order/Order";
import ProductDetails from "../containers/Products/ProductDetails";
import Cart from "../containers/Cart/Order"
import AddProduct from "../containers/AddProduct";
import Order2 from "../containers/Admin/Order"
import Add from "../containers/AddProduct/Add";
import Update from "../containers/AddProduct/Update";
import Verification from "../containers/Verification";

const Routes = () => {
  let role = Auth.getRoles();
  const isAuth = Auth.isAuth();
  const location = useLocation();
  useEffect(() => {
    role = Auth.getRoles();
  }, [location]);
  return (
    <>
      <ReactRouterRoutes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        {
          isAuth?<Route path="/dashboard" element={<Dashboard/>} >
            <Route path="Home" element={<Home/>}/>
            <Route path="Products" element={<Product/>}/>
            <Route path="Order" element={<Order/>}/>
            <Route path="Admin" element={<Order2/>}/>
            <Route path="Profile" element={<Setting/>}/>
            <Route path="ProductDetails" element={<ProductDetails/>}/>
            <Route path="Cart" element={<Cart/>}/>
            <Route path="AddProduct" element={<AddProduct/>}/>
            <Route path="Add" element={<Add/>}/>
            <Route path="Update" element={<Update/>}/>
            <Route path="Verify" element={<Verification/>}/>
          </Route>:null
        }

        <Route path="*" element={<UserLogin />} />
      </ReactRouterRoutes>
    </>
  );
};


export default Routes;
