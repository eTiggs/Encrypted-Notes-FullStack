import jwt from 'jsonwebtoken';
import Config from '../config/Config.js';

export default class JwtUtil {
    static generateToken(user) {
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    static verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}
