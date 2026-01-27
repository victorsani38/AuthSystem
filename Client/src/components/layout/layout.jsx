// import React from 'react'
// import Header from '../Header'
// import Footer from '../Footer'

// const Layout = ({children}) => {
//   return (
//     <>
//      <Header/>
//      <div  className="px-6 md:px-12 py-10 md:py-16 flex-1" style={{minHeight:"80vh"}}>
//         {children}
//      </div>
//      <Footer/>
//     </>
//   )
// }

// export default Layout

import React from "react"
import Header from "../Header"
import Footer from "../Footer"

import { useLocation } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"

const Layout = ({ children }) => {
  const { user } = useAuth()
  const location = useLocation()

  // Determine if we are on Home or Dashboard
  const isHome = location.pathname === "/"
  const isDashboard = location.pathname === "/dashboard"

  return (
    <div className="flex flex-col min-h-screen">
      {/* Pass user and page info to Header */}
      <Header user={user} isHome={isHome} isDashboard={isDashboard} />

      {/* Main content */}
      <div
        className="px-6 md:px-12 py-10 md:py-16 flex-1"
        style={{ minHeight: "80vh" }}
      >
        {children}
      </div>

      <Footer />
    </div>
  )
}

export default Layout
