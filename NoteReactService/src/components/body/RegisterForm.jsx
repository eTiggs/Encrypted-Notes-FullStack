import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import authService from '../../services/authService';

const RegisterForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    pin: ''
  });
  const [errors, setErrors] = useState([]);
  const [userExistsError, setUserExistsError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setUserExistsError('');
    setSubmitted(true);

    try {
      const response = await authService.register(formData.username, formData.password, formData.pin);
      const token = response.token;
      onLogin(token);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response && error.response.data === 'User already exists') {
        setUserExistsError('User already exists');
      } else {
        console.error('Registration failed:', error);
      }
    }
  };

  const getValidationClass = (field, messages) => {
    const hasError = messages.some((message) =>
      errors.find((err) => err.path === field && err.msg === message)
    );
    if (submitted) {
      if (hasError) return 'text-danger';
      const success = !errors.find((err) => err.path === field);
      if (success && formData[field]) return 'text-success';
    }
    return 'text-muted';
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
        <ul className="list-unstyled">
          <li className={getValidationClass('username', [
            'Username must be at least 3 characters long',
            'Username must be at most 16 characters long'
          ])}>- Username must be 3-16 characters long</li>
          <li className={getValidationClass('username', [
            'Username must contain only letters and numbers'
          ])}>- Username must contain only letters and numbers</li>
        </ul>
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
        <ul className="list-unstyled">
          <li className={getValidationClass('password', [
            'Password must be at least 6 characters long',
            'Password must be at most 16 characters long'
          ])}>- Password must be 6-16 characters long</li>
          <li className={getValidationClass('password', [
            'Password must contain an uppercase letter',
            'Password must contain a lowercase letter'
          ])}>- Password must contain both uppercase and lowercase letters</li>
          <li className={getValidationClass('password', [
            'Password must contain a number',
            'Password must contain a special character'
          ])}>- Password must contain a number and a special character</li>
        </ul>
      </Form.Group>

      <Form.Group controlId="formPin">
        <Form.Label>PIN</Form.Label>
        <Form.Control 
          type="password" 
          name="pin" 
          value={formData.pin}
          onChange={handleChange}
          placeholder="Enter PIN" 
        />
        <ul className="list-unstyled">
          <li className={getValidationClass('pin', [
            'Pin must be at least 4 characters long',
            'Pin must be at most 6 characters long'
          ])}>- Pin must be 4-6 characters long</li>
          <li className={getValidationClass('pin', [
            'Pin must contain only numbers'
          ])}>- Pin must contain only numbers</li>
        </ul>
      </Form.Group>

      {userExistsError && <p className="text-danger">{userExistsError}</p>}

      <Button variant="secondary" type="submit" className="mt-3">
        Register
      </Button>
    </Form>
  );
}

export default RegisterForm;