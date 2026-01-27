import { useContext, useEffect, useState,createContext } from "react";
import API from "../src/api/axios";
import {  useNavigate } from "react-router-dom";


export const AuthContext = createContext()
export const ProtectContext = ({children}) => {
    const [user, setUser] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()



    const fetchUser = async() => {
    try{
    const {data} = await API.get("/users/profile")
    setUser(data.user)
    }
    catch(error){
    setUser(null)
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
    <AuthContext.Provider value={{user, setUser, logout, loading, setLoading}}>
        {children}
    </AuthContext.Provider>
)
}

export const useAuth = () => useContext(AuthContext)