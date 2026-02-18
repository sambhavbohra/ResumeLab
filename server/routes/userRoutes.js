import express from "express";
import { getUserById, getUserResumes, loginUser, registerUser, sendOtp, verifyOtp } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";
import { loginLimiter, registerLimiter, otpLimiter } from "../middlewares/rateLimiter.js";
import { validatePassword, validateEmail } from "../middlewares/validation.js";

const userRouter = express.Router();

// OTP routes
userRouter.post('/send-otp', otpLimiter, validateEmail, sendOtp);
userRouter.post('/verify-otp', otpLimiter, verifyOtp);

// Auth routes with rate limiting and validation
userRouter.post('/register', registerLimiter, validatePassword, registerUser);
userRouter.post('/login', loginLimiter, loginUser);

// Protected routes
userRouter.get('/data', protect, getUserById);
userRouter.get('/resumes', protect, getUserResumes)

export default userRouter;