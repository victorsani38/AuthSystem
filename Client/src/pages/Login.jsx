import React, { useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";

const Login = () => {

    const [data, setData] = useState({email:"", password:""})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const {setUser, } = useAuth()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        try{
        const {email, password} = data
        const res = await API.post("/users/login", {email, password})
        if(res.data.success){
        setUser(res.data.user)
        toast.success("login successfully")
        window.location.href = "/dashboard";
        setLoading(false) 
        setData({email:"", password:""})
        }
        }
        catch(error){
        const errorCode = error.response?.data?.error;
  if (errorCode === "user not verified") {
    toast.info("Please verify your email to continue");
    navigate("/verify-email");
  } else if (errorCode === "invalid credentials") {
    toast.error("Invalid email or password");
  } else {
    toast.error("Something went wrong");
  }
        }
    }
return (
  <div className="bg-gray-100 min-h-screen px-4">
    <div className="grid place-items-center py-16">
      
      {/* Login Box */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg w-full max-w-md p-6 md:p-8">
        
        {/* Icon */}
        <div className="flex justify-center mb-3">
          <BiLogIn size={46} className="text-gray-500" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-red-500 mb-5">
          Login
        </h2>

        {/* Login with Google */}
        <div className="mb-4 flex justify-center">
          <button className="flex items-center gap-2 border border-gray-300 text-gray-700 
            py-2.5 px-5 rounded-md text-sm font-medium hover:bg-gray-100 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Login with Google
          </button>
        </div>

        {/* Or */}
        <p className="text-center text-gray-400 mb-3 relative before:absolute before:left-0 before:top-1/2 
          before:w-1/3 before:border-t before:border-gray-300
          after:absolute after:right-0 after:top-1/2 
          after:w-1/3 after:border-t after:border-gray-300">
          <span className="px-2 bg-white relative z-10 text-sm">Or</span>
        </p>

        {/* Form */}
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
  type="email"
  placeholder="Email"
  className="w-full bg-gray-100 rounded-md px-4 py-2
    focus:outline-none focus:ring-2 focus:ring-blue-400"
  value={data.email}
  onChange={(e) => setData({ ...data, email: e.target.value })}
/>

<div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full bg-gray-100 rounded-md px-4 py-2 pr-10
            focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2
            text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-md font-medium transition"
          >
            {loading?"Loading":"Login"}
          </button>

          <Link to="/forgot-password" className="text-blue-500 text-sm hover:underline text-left">
            Forgot Password?
          </Link>

          <div className="flex items-center gap-1 text-sm text-gray-600 flex-wrap">
            <Link to="/" className="text-blue-500 hover:underline">Home</Link>
            <span>|</span>
            <span>Don't have an account?</span>
            <Link to="/register" className="text-blue-500 font-medium hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>

    </div>
  </div>
);

};

export default Login;
