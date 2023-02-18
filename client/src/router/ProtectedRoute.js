import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) =>{
    const navigate = useNavigate();
    if(!localStorage.getItem('accessToken')){
        navigate('/');    
        return;
    }

    return(
        <Outlet></Outlet>
    )
}
export default ProtectedRoute;