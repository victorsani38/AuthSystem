import { transporter } from "./config.js"


export const sendVerificationEmail = async(name,email, verificationToken) => {
    try{
    const mailOptions = {
        from:process.env.EMAIL_SENDER,
        to:email,
        subject:"Account Verification Token",
        html:`Hello ${name}
        
        <p>Your account has been successfully created with the account id:${email}</p>
        <p>Kindly use this token to verify your account: <strong>${verificationToken}</strong></p>
        <p>Please note that this token expires in 15 min</p>
        
        <p>Warm regards</p>
        <p>Vics-Auth Team</p>`
    }
    await transporter.sendMail(mailOptions)
    }
    catch(error){
    console.log("error sending email", error)
    throw new Error("Error sending email")
    }
}

export const sendWelcomeEmail = async(name, email) => {
     try{
    const mailOptions = {
        from:process.env.EMAIL_SENDER,
        to:email,
        subject:"Welcome to Vics-Auth 🎉",
        html:`Hello ${name}
        
        <p>Welcome! 🎉</p>
        <p>Your account has been successfully verified, and you’re all set to get started.</p>

        <p>We’re excited to have you on board. You can now log in and explore all the features available to you.<p/>

        <p>If you ever need help or have questions, feel free to reach out — we’re always happy to assist.</p>

        <p>Thank you for choosing us, and welcome once again!</p>

        <p>Warm regards,</p>
        <p>Vics-Auth Team</p>`
    }
    await transporter.sendMail(mailOptions)
    }
    catch(error){
    console.log("error sending email", error)
    throw new Error("Error sending email")
    }
}

export const sendResetPasswordEmail = async(name,email, resetUrl) => {
    try{
    const mailOptions = {
        from:process.env.EMAIL_SENDER,
        to:email,
        subject:"Password Reset",
        html:`Hello ${name}
        
        <p>We received a request to reset the password for your account.</p>
        <p>To proceed, please click<a href="${resetUrl}">Hear</a>to create a new password</p>
        <p>This link is valid for 1 hour. If it expires, you can request a new password reset from the login page.</p>
        <p>If you did not request a password reset, please ignore this email — your account remains secure.</p>
        
        <p>Warm regards</p>
        <p>Vics-Auth Team</p>`
    }
    await transporter.sendMail(mailOptions)
    }
    catch(error){
    console.log("error sending email", error)
    throw new Error("Error sending email")
    }
}

export const sendResetSuccess = async(name,email) => {
    try{
    const mailOptions = {
        from:process.env.EMAIL_SENDER,
        to:email,
        subject:"Account Verification Token",
        html:`Hello ${name}
        
        <p>This is a confirmation that your account password has been successfully reset.</p>
        <p>You can now log in using your new password. If you did not perform this
        password reset, please contact our support team 
        immediately — your account may be at risk.
        </p>
        <p>Thank you for using Vics-Auth.</p>
        
        <p>Warm regards</p>
        <p>Vics-Auth Team</p>`
    }
    await transporter.sendMail(mailOptions)
    }
    catch(error){
    console.log("error sending email", error)
    throw new Error("Error sending email")
    }
}

