
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import API from '../api/axios'

const ForgotPassword = () => {
const [data, setData] = useState({email:""})
const [loading, setLoading] = useState(false)
const navigate = useNavigate()

const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const {email} = data
    try {
      const res = await API.post("/users/forgot-password", {email})

      if (res.data.success) {
        toast.success("reset password link sent to email")
        setData({ email: "" })
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

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      
      {/* Header */}
      <h2 className="text-2xl font-bold text-center mb-2">
        Forgot Password
      </h2>
      <p className="text-center text-gray-500 text-sm mb-6">
        Enter the email address associated with your account and we’ll send you
        a link to reset your password.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={data.email}
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Sending link..." : "Send Reset Link"}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center mt-6 text-sm text-gray-600">
        Remember your password?{" "}
        <Link
          to="/login"
          className="text-green-600 font-medium hover:underline"
        >
          Log in
        </Link>
      </div>
    </div>
  </div>
)

}

export default ForgotPassword
