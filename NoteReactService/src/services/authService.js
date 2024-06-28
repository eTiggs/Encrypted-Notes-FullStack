import axios from 'axios';

const API_URL = 'http://localhost:6969/auth';

const login = async (username, password, pin = '') => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password,
            pin
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

const register = async (username, password, pin = '') => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            username,
            password,
            pin
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const loginResponse = await login(username, password, pin);
        return loginResponse;

    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
};

export default {
    login,
    register
};
