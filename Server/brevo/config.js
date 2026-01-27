import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

// export const transporter = nodemailer.createTransport({
//     host:"smtp-relay.brevo.com",
//     port:587,
//     auth:{
//         user:process.env.SMTP_USER,
//         pass:process.env.SMTP_PASS
//     }
// })
export const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // STARTTLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    logger: true, // logs SMTP conversation
    debug: true,  // shows protocol details
})
