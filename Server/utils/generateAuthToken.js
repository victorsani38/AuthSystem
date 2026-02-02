import jwt from "jsonwebtoken"
export const generateAuthToken = (res, id) => {
    const token = jwt.sign({id},process.env.JWT_SECRETE, {expiresIn:"1d"})
    res.cookie("token", token, {
        httpOnly:true, 
        secure:true,
        sameSite:"none",
        maxAge:24*60*60*1000
    })
    return token
}