import AuthService from '../services/AuthService.js';

const authService = new AuthService();

export default class AuthController {
    static async register(req, res) {
        try {
            await authService.register(req.body);
            res.status(201).send('User registered');
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    static async login(req, res) {
        try {
            const token = await authService.login(req.body);
            res.json({ token });
        } catch (error) {
            console.log('Login error:', error.message);
            res.status(400).send(error.message);
        }
    }
}
