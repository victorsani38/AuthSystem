
import { useState, useRef ,useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import API from "../api/axios";

const VerifyEmail = () => {
 const [data, setData] = useState({ otp: "" })
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
const [timer, setTimer] = useState(60)

  const navigate = useNavigate()
  const inputsRef = useRef([])

  const handleChange = (value, index) => { 
    if (!/^\d?$/.test(value)) return

    const otpArray = data.otp.split("") 
    otpArray[index] = value
    const newOtp = otpArray.join("")

    setData({ otp: newOtp })

    // auto-focus next box
    if (value && index < 5) {
      inputsRef.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !data.otp[index] && index > 0) {
      inputsRef.current[index - 1].focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await API.post("/users/verify-email", {
        otp: data.otp,
      })

      if (res.data.success) {
        toast.success("Account verified successfully")
        setData({ otp: "" })
        navigate("/dashboard")
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
  useEffect(() => {
  if (timer === 0) return

  const interval = setInterval(() => {
    setTimer((prev) => prev - 1)
  }, 1000)

  return () => clearInterval(interval)
}, [timer])
const handleResendOtp = async () => {
  setResending(true)

  try {
    const res = await API.post("/users/resend-otp")

    if (res.data.success) {
      toast.success("Verification code resent")
      setTimer(60) // restart countdown
    }
  } catch (error) {
    toast.error(
      error.response?.data?.error || "Failed to resend code"
    )
  } finally {
    setResending(false)
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-2">
          Verify your email
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter the 6-digit code sent to your email
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2 mb-6">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={data.otp[index] || ""}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || data.otp.length !== 6}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
          <div className="text-center mt-4">
  {timer > 0 ? (
    <p className="text-sm text-gray-500">
      Resend code in{" "}
      <span className="font-semibold">{timer}s</span>
    </p>
  ) : (
    <button
      type="button"
      onClick={handleResendOtp}
      disabled={resending}
      className="text-sm font-semibold text-black hover:underline disabled:opacity-50"
    >
      {resending ? "Resending..." : "Resend OTP"}
    </button>
  )}
</div>

        </form>
      </div>
    </div>
  )
}

export default VerifyEmail
