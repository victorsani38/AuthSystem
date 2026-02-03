import { useContext, useEffect, useState,createContext } from "react";
import API from "../src/api/axios";
import {  useNavigate } from "react-router-dom"; 


export const AuthContext = createContext()
export const ProtectContext = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()



    const fetchUser = async() => {
    try{
    const res = await API.get("/users/profile", { withCredentials: true });
    setUser(res.data.user)
    }
    catch(error){
    setUser(null)
    console.log("Profile fetch failed:", error.response?.data?.message || error.message);
    }finally{
        setLoading(false)
    }
}
useEffect(()=>{

fetchUser()
},[])

const logout = async() => {
    setLoading(true)
    try{
    await API.post("/users/logout")
    setUser(null)
    navigate("/login", {replace:true})
    }
    catch(error){
    console.error("Login error", error.message)
    setUser(null)
    }finally{
        setLoading(false)
    }  
}

return(
    <AuthContext.Provider value={{user, setUser, logout, loading, setLoading, fetchUser}}>
        {children}
    </AuthContext.Provider>
)
}

export const useAuth = () => useContext(AuthContext)
