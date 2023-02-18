import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () =>{
    const navigate = useNavigate();  
    const error = useRouteError();
    console.error(error);
    const navigatePage = ()=>{
        navigate('/');
    }
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <div className="text-white font-bold text-6xl pb-2">Oop!</div>

        <div className="text-white font-bold text-2xl pb-5"> 
            An unexpected error has occurred!  
        </div>  
        <h1 className="text-9xl font-extrabold text-white tracking-widest pb-2">{error.status}</h1>
        <div className="bg-[#FF6A3D] px-2  text-sm rounded rotate-12 absolute">
            {error.statusText}
        </div>
        <button className="mt-5">
            <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                <button onClick={navigatePage}>Go Home</button>
            </span>
            </a>
        </button>
        </main>
    );
}
export default ErrorPage;