import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:function (){
            return this.authProvider === "local"
        },
        minLength:[6, "Password must not be more than 6 characters"]
    },
    authProvider:{
        type: String, 
        enum:["local", "google"],
        default:"local"
    },
    phone:{
        type:String,
        default:"+081"    
    },
    pic:{
        type:String,
        default:"my-Pics" 
    },
    bio:{
        type:String,
        default:"my-biography",
        maxLength:[250, "bio must not be more than 250 characters"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationToken:Number,
    verificationTokenExpiresAt:Date,
    resetPasswordToken:String,
    resetPasswordTokenExpiresAt:Date
},{timestamps:true})

const User = new mongoose.model("User", userSchema);
export default User