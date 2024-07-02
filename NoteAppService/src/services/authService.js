import User from '../models/User.js';
import JwtUtil from '../utils/jwt.js';
import Hash from '../utils/Hash.js';

export default class AuthService {
    async register(data) {
        const { username, password, pin } = data;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error('User already exists');
        }
        
        const user = new User({ username, password, pin });
        await user.save();
        return user;
    }

    async login(data) {
        const { username, password, pin } = data;
        const user = await User.findOne({ username });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordMatch = await Hash.comparePassword(password, user.password);
        if (!isPasswordMatch) {
            throw new Error('Invalid credentials');
        }

        if (user.pin) {
            const isPinMatch = await Hash.comparePassword(pin, user.pin);
            if (!isPinMatch) {
                throw new Error('Invalid credentials');
            }
        }
        
        const token = JwtUtil.generateToken(user);
        return token;
    }
}
