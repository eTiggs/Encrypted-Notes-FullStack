import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RegisterForm from '../body/RegisterForm';
import LoginForm from '../body/LoginForm';
import '../../styles/LoginRegisterForm.css';
import { isLoggedIn } from '../../utils/auth';
import { Navigate } from 'react-router-dom';

const LoginRegisterForm = ({ onLogin }) => {
  if (isLoggedIn()) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6} className="border-end">
          <h2 className="text-center">REGISTER</h2>
          <RegisterForm onLogin={onLogin}/>
        </Col>
        <Col md={6}>
          <h2 className="text-center">LOG IN</h2>
          <LoginForm onLogin={onLogin}/>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginRegisterForm;
