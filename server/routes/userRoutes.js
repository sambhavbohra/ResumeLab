import express from "express";
import { getUserById, getUserResumes, loginUser, registerUser, sendOtp, verifyOtp, googleLogin, resetPassword } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";
import { loginLimiter, registerLimiter, otpLimiter } from "../middlewares/rateLimiter.js";
import { validatePassword, validateEmail } from "../middlewares/validation.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { loginUserSchema, registerUserSchema, sendOtpSchema, verifyOtpSchema } from "../middlewares/validators.js";

const userRouter = express.Router();

// OTP routes
userRouter.post('/send-otp', otpLimiter, validateRequest(sendOtpSchema), sendOtp);
userRouter.post('/verify-otp', otpLimiter, validateRequest(verifyOtpSchema), verifyOtp);
userRouter.post('/reset-password', registerLimiter, resetPassword);

// Auth routes with rate limiting and validation
userRouter.post('/register', registerLimiter, validateRequest(registerUserSchema), registerUser);
userRouter.post('/login', loginLimiter, validateRequest(loginUserSchema), loginUser);
userRouter.post('/google-login', googleLogin);

// Protected routes
userRouter.get('/data', protect, getUserById);
userRouter.get('/resumes', protect, getUserResumes)

export default userRouter;