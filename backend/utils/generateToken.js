import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const generateToken = (res, userId) => {
    try{
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true, 
            sameSite: 'None',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        return token;
    }catch(error){
        console.log(error);
    }
}

export default generateToken;