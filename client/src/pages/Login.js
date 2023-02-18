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

            <input
              type="text"
              className="h-12 rounded w-full border px-3 focus:text-black focus:border-blue-100"
              placeholder="Email..."
            />

            <input
              type="password"
              className="h-12 mt-3 rounded w-full border px-3 focus:text-black focus:border-blue-100"
              placeholder="Mật khẩu..."
            />

            <div className="flex justify-end items-center mt-2">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                Quên mật khẩu?
              </a>
            </div>

            <button className="uppercase h-12 mt-3 text-white w-full rounded bg-red-700 hover:bg-red-800">
              Đăng nhập
            </button>

            <div className="flex justify-between items-center mt-3">
              <hr className="w-full" />
              <span className="p-2 text-gray-400 mb-1">Hoặc</span>
              <hr className="w-full" />
            </div>

            <button className="uppercase h-12 mt-3 text-white w-full rounded bg-blue-800 hover:bg-blue-900">
              <box-icon type='logo' color="white" name="facebook"></box-icon>
              <span className="px-2">Facebook</span>
            </button>
            <button onClick={handleLoginWithGoogle} className="uppercase h-12 mt-3 text-white w-full rounded bg-red-800 hover:bg-red-900">
              <box-icon type='logo' color="white" name="google"></box-icon>
              <span className="px-3">Google</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;