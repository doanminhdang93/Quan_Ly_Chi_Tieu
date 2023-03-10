import React, { useContext } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () =>{
  const auth = getAuth();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  if (user?.uid) {
    navigate("/");
    return;
  }
  return (
    <>
      <div className="bg-gray-300  flex justify-center">
        <div className="container h-screen flex justify-center items-center">
          <div className="p-8 bg-white rounded-lg max-w-6xl pb-10">
            <div className="flex justify-center mb-4 font-bold text-2xl pb-5">
                Welcome back!
            </div>
            <button onClick={handleLoginWithGoogle} className="uppercase h-12 mt-3 text-white w-full rounded bg-red-800 hover:bg-red-900">
              <box-icon type='logo' color="white" name="google" ></box-icon>
              <span className="px-3 text-xl">Google</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;