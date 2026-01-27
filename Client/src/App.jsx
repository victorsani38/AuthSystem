import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ProtectContext } from "../context/AuthContext"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Layout from "./components/layout/layout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import { ProtectRoute } from "./utils/ProtectRoute";
import Profile from "./pages/Profile";



function App() {
  

  return (
    <>
      <Router>
        <ToastContainer
         position="top-right"
         autoClose={3000}
         closeOnClick
         draggable
         pauseOnHover
         />
        <ProtectContext>
          <Routes>
          <Route path="/" element={<Layout><Home/></Layout>}/>
          <Route path="/dashboard" element={<ProtectRoute><Layout><Dashboard/></Layout></ProtectRoute>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<SignUp/>}/>
          <Route path="/verify-email" element={<VerifyEmail/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword/>}/>
            <Route path="/profile" element={<ProtectRoute><Profile/></ProtectRoute>}/>
        </Routes>
        </ProtectContext> 
      </Router> 
    </>
  )
}

export default App
