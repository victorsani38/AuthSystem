import bcrypt from "bcrypt"
import User from "../models/userModel.js"
import { generateToken } from "../utils/generateToken.js";
import { generateAuthToken } from "../utils/generateAuthToken.js";
import { sendResetPasswordEmail, sendResetSuccess, sendVerificationEmail, sendWelcomeEmail } from "../brevo/email.js";
import crypto from "crypto"

export const signUp = async(req, res) => {
   const {name, email, password, ComfirmPassword} = req.body
   try{
    if(!name || !email || !password || !ComfirmPassword){
    return res.status(400).json({success:false, error:"Please Fill all fields"});
    }

    if(password.length < 6){
       return res.status(400).json({success:false, error:"Password length must be up to 6 characters"});  
    }

    if(password !== ComfirmPassword){
     return res.status(400).json({success:false, error:"password not match"});    
    }
    const isExist = await User.findOne({email});
    if(isExist){
    return res.status(401).json({success:false, error:"user already exist"});
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const verificationToken = generateToken()
    const user = new User({
        name,
        email,
        password:hashedPassword,
        verificationToken:verificationToken,
        verificationTokenExpiresAt:Date.now() + 15 * 60 * 1000
    })
      await user.save()
      generateAuthToken(res, user._id);

      await sendVerificationEmail(user.name, user.email, verificationToken)
      return res.status(201).
      json({success:true,
        message:"new user created successfully",
        user:{...user._doc, password:undefined},
      })
   }
   catch(error){
      console.log(error.message)
     return res.status(500).json({success:false, message:"Internal server error"});
   }
}
export const resendVerificationOtp = async(req, res) => {
    try{
    const user = req.user
    if(!user){
    return res.status(404).json({success:false, error:"user not found"})
    }
    if(user.isVerified){
    return res.status(400).json({success:false, error:"user already verified"}) 
    }
    const newToken = generateToken()
    user.verificationToken = newToken
    user.verificationTokenExpiresAt =Date.now() + 15 * 60*1000

    await user.save()

    await sendVerificationEmail(user.name, user.email, newToken)

    return res.status(200).json({success:true, message:"new token sent"})
    }
    catch(error){
    console.log("error sending token", error.message)
    return res.status(500).json({success:false, message:"Internal server error"});
    }
}
export const login = async(req, res) => {
    const {email, password} = req.body
    try{
    if(!email || !password){
    return res.status(400).json({success:false, error:"Fill all field"});
    }
    const user = await User.findOne({email})
    if(!user){
    return res.status(404).json({success:false, error:"invalid credentials"});
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
    return res.status(400).json({success:false, error:"invalid credentials"});
    }
   if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        error: "USER_NOT_VERIFIED",
      });
    }
    generateAuthToken(res, user._id)
    return res.status(200).json({success:true, 
        message:"user login successfully",
        user: {
    _id: user._id,
    email: user.email,
    isVerified: user.isVerified
  }
    });
    }
    catch(error){
    console.log("error login user", error.message)
    return res.status(500).json({success:false, 
        message:"Internal server error",
       });
    }
    
}

export const logout = async(req, res) => {
    try{
    res.clearCookie("token")
    return res.status(200).json({success:true, message:"user logout successfully"});
    }
    catch(error){
    console.log("error login out user", error.message)
    return res.status(500).json({success:false, message:"Internal server error"});
    }
}

export const verifyAccount = async(req, res) => {
    try{
    const {otp} = req.body
    const user = await User.findOne({
        verificationToken:otp,
        verificationTokenExpiresAt:{$gt:Date.now()}
    })
    if(!user){
    return res.status(404).json({success:false, error:"invalid or expired otp"});
    }
    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpiresAt = undefined
    await user.save()
    await sendWelcomeEmail(user.name, user.email)
    return res.status(200).json({success:true, message:"account verified"});

    }
    catch(error){
    console.log("error verifying user", error.message)
    return res.status(500).json({success:false, message:"Internal server error"});
    }
}

export const forgotPassword = async(req, res) => {
     const {email} = req.body
     console.log("📧 Email received:", email)
    try{
     if(!email){
    return res.status(400).json({success:false, error:"provide an email"})
    }
    const user = await User.findOne({email})
    if(!user){
    return res.status(400).json({success:false, error:"email not associated with registered account"});
    }
    const resetPasswordToken = crypto.randomBytes(32).toString("hex")
    const resetPasswordTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000

    user.resetPasswordToken = resetPasswordToken
    user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`

    await user.save();
    sendResetPasswordEmail(user.name, user.email, resetUrl)
    return res.status(200).json({success:true, message:"reset password token sent succssfuuly"});
    }
    catch(error){
    console.log("error sending reset password", error.message)
    return res.status(500).json({success:false, error:"Internal server error"});
    }
}

export const resetPassword = async(req, res) => {
    try{
    const {token} = req.params
    const {password, ComfirmPassword} = req.body

    if(password.length < 6){
     return res.status(400).json({success:false, error:"password must not be less than 6 charaters"});      
    }

    if(!password || !ComfirmPassword){
     return res.status(400).json({success:false, error:"fill all fields"});      
    }

    if(password !== ComfirmPassword){
     return res.status(400).json({success:false, error:"password not match"});  
    }

    const user = await User.findOne({
        resetPasswordToken:token,
        resetPasswordTokenExpiresAt:{$gt:Date.now()}
    })
    if(!user){
     return res.status(500).json({success:false, error:"invalid or expired token"});   
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpiresAt = undefined

    await user.save()
    await sendResetSuccess(user.name, user.email)
    return res.status(200).json({success:true, message:"pasword was reset successfully"});
    }
    catch(error){
    console.log("email not send", error.message)
    return res.status(500).json({success:false, message:"Internal server error"});
    }
}

export const getUser = async(req, res)=> {
    try{
    const user = req.user
    if(!user){
     return res.status(404).json({success:false, error:"user not found"});
    }
     return res.status(200).json({success:true, user});
    }
    catch(error){
    console.log("middleware error", error.message)
    return res.status(500).json({success:false, message:"Internal server error"});
    }
}

export const updateUser = async(req, res) => {
    try{
    const {name, phone, pic, bio} = req.body
    const user = req.user
    if(!user){
     return res.status(404).json({success:false, error:"user not found"});
    }
    user.name = name || user.name,
    user.phone = phone || user.phone,
    user.pic = pic || user.pic
    user.bio = bio || user.bio

     if (req.file) {
      // Example: storing as base64 (or save file and store path)
      user.pic = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    await user.save()
    return res.status(200).json({success:true, 
    message:"user updated successfully",
    user:{...user._doc, password:undefined}
    });
    }
    catch(error){
    console.log("failed to update user", error.message)
     return res.status(500).json({success:false, message:"Server error"});
    }
}

export const updatePassword = async(req, res) => {
    const {oldPassword, password, confirmPassword} = req.body
    try{
    if(!oldPassword || !password || !confirmPassword){
    return res.status(401).json({success:false, error:"fill all field"});
    }
    if(password !== confirmPassword){
    return res.status(400).json({success:false, error:"password not match"});  
    }
    const user = await User.findById(req.user._id).select("+password");
    if(!user){
    return res.status(404).json({success:false, error:"user not found"});
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if(!isMatch){
    return res.status(401).json({success:false, error:"password not match"});
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword
    await user.save()
    return res.status(200).json({success:true, message:"password updated"});
    }
    catch(error){
    console.log("failed to update password", error.message)
     return res.status(500).json({success:false, message:"Server error"});
    }
}

