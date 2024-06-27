import { body, validationResult } from 'express-validator';
import JwtUtil from '../utils/Jwt.js';

export default class AuthValidator {
    static validate = () => {
        return [
            body('username')
                .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
                .isLength({ max: 16 }).withMessage('Username must be at most 16 characters long')
                .isAlphanumeric().withMessage('Username must contain only letters and numbers'),
            body('password')
                .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
                .isLength({ max: 16 }).withMessage('Password must be at most 16 characters long')
                .matches(/\d/).withMessage('Password must contain a number')
                .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
                .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
                .matches(/[#?!(){}[\].,@']/).withMessage('Password must contain a special character'),
            body('pin')
                .optional()
                .isLength({ min: 4 }).withMessage('Pin must be at least 4 characters long')
                .isLength({ max: 6 }).withMessage('Pin must be at most 6 characters long')
                .isNumeric().withMessage('Pin must contain only numbers'),
            
            (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                next();
            }
        ];
    }
            
    static authenticate(req, res, next) {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).send('Authorization header is missing');
        }
        const token = authHeader.replace('Bearer ', '');
        try {
            const decoded = JwtUtil.verifyToken(token);
            req.userId = decoded.id;
            next();
        } catch (error) {
            res.status(401).send('Unauthorized');
        }
    }
}
