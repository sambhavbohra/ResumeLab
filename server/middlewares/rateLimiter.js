import rateLimit from 'express-rate-limit';

// Rate limiter for login attempts - 25 attempts per 15 minutes
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 25, // 25 attempts (allows shared networks)
    message: { message: 'Too many login attempts. Please try again after 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false
});

// Rate limiter for registration - 50 registrations per hour per IP
export const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 50, // 50 attempts (lenient for shared networks)
    message: { message: 'Too many registration attempts. Please try again after an hour.' },
    standardHeaders: true,
    legacyHeaders: false
});

// Rate limiter for OTP requests - 20 OTP requests per 10 minutes
export const otpLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 20, // 20 attempts (allows shared networks)
    message: { message: 'Too many OTP requests. Please try again after 10 minutes.' },
    standardHeaders: true,
    legacyHeaders: false
});

// General API rate limiter - 100 requests per minute
export const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100,
    message: { message: 'Too many requests. Please slow down.' },
    standardHeaders: true,
    legacyHeaders: false
});
