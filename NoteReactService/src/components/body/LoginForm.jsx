import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    pin: ''
  });
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await axios.post('http://localhost:6969/auth/login', formData);
      const token = response.data.token;
      onLogin(token);
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setLoginError("Incorrect Username, Password or Pin, Please try again!");
      } else if (error.response && error.response.data.message) {
        setLoginError(error.response.data.message);
      } else {
        console.error('Login failed:', error);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control 
          type="text" 
          name="username" 
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username" 
          required 
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          name="password" 
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password" 
          required 
        />
      </Form.Group>

      <Form.Group controlId="formPin">
        <Form.Label>PIN (Optional)</Form.Label>
        <Form.Control 
          type="password" 
          name="pin" 
          value={formData.pin}
          onChange={handleChange}
          placeholder="Enter PIN" 
        />
      </Form.Group>

      {loginError && <p className="text-danger">{loginError}</p>}

      <Button variant="secondary" type="submit" className="mt-3">
        Log In
      </Button>
    </Form>
  );
}

export default LoginForm;