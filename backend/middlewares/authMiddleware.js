import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

dotenv.config();

export const verifyToken = async (req, res, next) => {
    try{
        const token = req.cookies['jwt'];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No Token' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
        }
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized - User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Internal Server Error', message: error.message });
    }
}

export default verifyToken;