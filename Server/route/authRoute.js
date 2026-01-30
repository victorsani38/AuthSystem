import express from "express";
import { forgotPassword, getUser, googleAuth, login, logout, resendVerificationOtp, resetPassword, signUp, updatePassword, updateUser, verifyAccount } from "../controller/auth.js";
import { protect } from "../middleaware/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage(); // or diskStorage for saving files
const upload = multer({ storage });

router.post("/sign-up", signUp);
router.post("/google", googleAuth);
router.post("/resend-otp", protect,resendVerificationOtp)
router.post("/login", login); 
router.post("/logout", logout);
router.post("/verify-email", verifyAccount);
router.post('/forgot-password', forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/profile", protect, getUser);
router.put("/edit", protect,upload.single("pic"), updateUser);
router.put("/edit-password/", protect, updatePassword);

 
export default router