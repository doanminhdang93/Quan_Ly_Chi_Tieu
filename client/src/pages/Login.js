import React, {useContext} from "react"
import { GoogleAuthProvider,signInWithPopup, getAuth } from "firebase/auth";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const auth = getAuth();
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLoginWithGoogle = async() => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    }
    if(user?.uid){
        navigate('/');
        return;
    }

    return (
        <>
            <h1 style={{textAlign : 'center', marginTop: '100px'}}>
                Chào mừng bạn đến với website quản lý chi tiêu
            </h1> 
            <button onClick={handleLoginWithGoogle} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Đăng nhập với Google</button>
        </>
    )
}