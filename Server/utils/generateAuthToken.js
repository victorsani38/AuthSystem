import jwt from "jsonwebtoken"
export const generateAuthToken = (res, id) => {
    const token = jwt.sign({id},process.env.JWT_SECRETE, {expiresIn:"1d"})
    const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || undefined;
    res.cookie("token", token, {
        httpOnly:true, 
        secure:true,
        sameSite:"none",
        maxAge:24*60*60*1000,
        domain:COOKIE_DOMAIN
    })
    return token
}
