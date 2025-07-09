import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

/**
 * Register a new user with username, email, and password
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.username - User's display name
 * @param {string} req.body.email - User's email address
 * @param {string} req.body.password - User's password
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user data and JWT token or error message
 */
// Register a new user
export const registerUser = async (req, res) => {
    try{
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser){ 
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Generate token and set cookie
        const token = generateToken(res, user._id);
        res.status(201).json({ message: 'User registered successfully', user: {
            _id: user._id,
            username: user.username,
            email: user.email
        }, token });
    }catch(error){
        res.status(500).json({ message: 'Internal server error' , error: error.message });
    }
}

/**
 * Authenticate user with email and password
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.email - User's email address
 * @param {string} req.body.password - User's password
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user data and JWT token or error message
 */
// Login user
export const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        
        // Check if user exists
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate token and set cookie
        const token = generateToken(res, user._id);
        res.status(200).json({ message: 'User logged in successfully', user: {
            _id: user._id,
            username: user.username,
            email: user.email
        }, token });
        
    }catch(error){
        res.status(500).json({ message: 'Internal server error' , error: error.message });
    }
}

/**
 * Logout user by clearing JWT cookie
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success message or error message
 */
// Logout user
export const logoutUser = async (req, res) => {
    try{
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: false, // true in production
            sameSite: 'Lax',
            path: '/'
        });  
        res.status(200).json({ message: 'User logged out successfully' });
    }catch(error){
        res.status(500).json({ message: 'Internal server error' , error: error.message });
    }
}

/**
 * Get current user information from JWT token
 * @param {Object} req - Express request object
 * @param {Object} req.cookies - Request cookies
 * @param {string} req.cookies.jwt - JWT token from cookie
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user data or error message
 */
// Get user from the token
export const getUser = async (req, res) => {
    try{
        // Get token from cookies
        const token = req.cookies['jwt'];
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Get user from database
        const user = await User.findById(decoded.userId).select('-password');
        res.status(200).json({ user: {
            _id: user._id,
            username: user.username,
            email: user.email
        } });
    }catch(error){
        res.status(500).json({ message: 'Internal server error' , error: error.message });
    }
}
