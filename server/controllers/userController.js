import User from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Resume from "../models/Resume.js";
import Otp from "../models/Otp.js";
import { sendOtpEmail } from "../configs/nodemailer.js";


const generateToken = (userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'})
    return token;
}

// Generate 6-digit OTP
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// controller for sending OTP
// POST: /api/users/send-otp
export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Delete any existing OTP for this email
        await Otp.deleteMany({ email });

        // Generate new OTP
        const otp = generateOtp();

        // Save OTP to database
        await Otp.create({ email, otp });

        // Send OTP via email (with timeouts configured in nodemailer)
        await sendOtpEmail(email, otp);

        return res.status(200).json({ message: 'OTP sent successfully to your email' });

    } catch (error) {
        console.error('Send OTP error:', error.message, error.code, error.response);
        return res.status(500).json({ 
            message: 'Failed to send OTP. Please try again.',
            error: error.message // Temporarily show error for debugging
        });
    }
}

// controller for verifying OTP
// POST: /api/users/verify-otp
export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        // Find OTP record
        const otpRecord = await Otp.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // OTP is valid - delete it
        await Otp.deleteMany({ email });

        return res.status(200).json({ message: 'Email verified successfully', verified: true });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// controller for user registration (after OTP verification)
// POST: /api/users/register
export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // check if required fields are present
        if(!name || !email || !password){
            return res.status(400).json({message: 'Missing required fields'})
        }

        // check if user already exists
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: 'User already exists'})
        }

        // create new user
         const hashedPassword = await bcrypt.hash(password, 10)
         const newUser = await User.create({
            name, email, password: hashedPassword
         })

         // return success message
         const token = generateToken(newUser._id)
         newUser.password = undefined;

         return res.status(201).json({message: 'Account created successfully', token, user: newUser})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for user login
// POST: /api/users/login
export const loginUser = async (req, res) => {
    try {
        const { email, password} = req.body;

        // check if user exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'})
        }

        // check if password is correct
        if(!user.comparePassword(password)){
            return res.status(400).json({message: 'Invalid email or password'})
        }

        // return success message
         const token = generateToken(user._id)
         user.password = undefined;

         return res.status(200).json({message: 'Login successful', token, user})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for getting user by id
// GET: /api/users/data
export const getUserById = async (req, res) => {
    try {
        
        const userId = req.userId;

        // check if user exists
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        // return user
        user.password = undefined;
         return res.status(200).json({user})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for getting user resumes
// GET: /api/users/resumes
export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId;

        // return user resumes
        const resumes = await Resume.find({userId})
        return res.status(200).json({resumes})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}
