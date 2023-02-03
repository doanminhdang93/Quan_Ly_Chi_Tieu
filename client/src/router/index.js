import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";

const AuthLayout = () =>{
    return <AuthProvider><Outlet></Outlet></AuthProvider>
}
export default createBrowserRouter([
    {
        element: <AuthLayout/>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                element: <Login></Login>,
                path: '/login',
            },
            {
                element: <ProtectedRoute></ProtectedRoute>,
                children:[
                    {
                        element: <Home></Home>,
                        path: '/',
                    }
                ]
            }
            // {
            //     element: <Home></Home>,
            //     path: '/',
            // }
        ]
    }
])