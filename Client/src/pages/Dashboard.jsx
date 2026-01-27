import { useAuth } from "../../context/AuthContext"
import AuthIllustration from "../assets/authentication.svg"

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="flex flex-col items-center text-center">
     <h1 className="text-4xl md:text-5xl font-extrabold text-transparent 
     bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-pink-600 mb-4">
  Welcome back, {user?.name} 👋
</h1>

<p className="text-lg md:text-xl text-pink-700 max-w-xl mb-10 leading-relaxed">
  This dashboard demonstrates a modern authentication system with secure login, email verification, profile management, and protected routes — built using React, Tailwind CSS, Node.js, and MongoDB.
</p>


      <img
        src={AuthIllustration}
        alt="Authentication illustration"
        className="w-full max-w-md"
      />

      <p className="text-gray-500 text-sm mt-8">
        Designed as a professional portfolio project.
      </p>
    </div>
  )
}

export default Dashboard
