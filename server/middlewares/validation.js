// Password validation middleware
export const validatePassword = (req, res, next) => {
    const { password } = req.body;
    
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    const errors = [];

    // Minimum 8 characters
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    // At least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    // At least one lowercase letter
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    // At least one number
    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    // At least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: errors[0], errors });
    }

    next();
};

// Email validation middleware
export const validateEmail = (req, res, next) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    next();
};
