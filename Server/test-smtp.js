import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP connection failed:", err.message);
  } else {
    console.log("✅ SMTP server is reachable!");
  }
});
