
import React, { useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import API from '../api/axios'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const ResetPassword = () => {
const [data, setData] = useState({password:"", ComfirmPassword:"" })
const [showPassword, setShowPassword] = useState(false)
const [loading, setLoading] = useState(false)
const navigate = useNavigate()
const {token} = useParams()

const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const res = await API.post(`/users/reset-password/${token}`, data)

      if (res.data.success) {
        toast.success("password reset done successfully, login with your new password")
        setData({password:"", ComfirmPassword:"" })
        navigate("/login")
      }
    } catch (error) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error)
      } else {
        toast.error("Something went wrong")
      }
    } finally {
      setLoading(false)
    }
  }
const handlePaste = (e) => {
    e.preventDefault()
    toast.error("Pasting is not allowed")
}
 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      
      {/* Header */}
      <h2 className="text-2xl font-bold text-center mb-2">
        Reset Password
      </h2>
      <p className="text-center text-gray-500 text-sm mb-6">
        Enter and comfirm your new password to reset your password.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='w-full'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <div className='relative'>
            <input
            onPaste={handlePaste}
            type={showPassword?"text":"password"}
            placeholder="Enter your new password"
            value={data.password}
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
            className="w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none 
            focus:ring-2 focus:ring-green-600"
          />
          <button
          type='button'
           className="absolute right-3 top-1/2 -translate-y-1/2
            text-gray-500 hover:text-gray-700 flex text-center justify-center"
            onClick={()=>setShowPassword(!showPassword)}
          >
          {showPassword?(
            <AiOutlineEye size={20}/>
          ):
          <AiOutlineEyeInvisible size={20}/>}
          </button>
          </div>
        </div>
        <div className='w-full'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Comfirm Password
          </label>
         <div className='relative'>
          <input
           onPaste={handlePaste}
            type={showPassword?"text":"password"}
            placeholder="Comfirm your new password"
            value={data.ComfirmPassword}
            onChange={(e) =>
              setData({ ...data, ComfirmPassword: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-lg focus:outline-none
             focus:ring-2 focus:ring-green-600"
          />
          <button
          type='button'
          onClick={()=>setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2
            text-gray-500 hover:text-gray-700 text-center"
          >
          {showPassword?(
            <AiOutlineEye size={20}/>
          ):
          <AiOutlineEyeInvisible size={20}/>}
          </button>
         </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading?"Loading":"Reset Password"}
        </button>
      </form>
    </div>
  </div>
)

}

export default ResetPassword
