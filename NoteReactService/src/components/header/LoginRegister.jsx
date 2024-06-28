import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
    const navigate = useNavigate();

    const handleLoginRegisterClick = () => {
        navigate('/auth');
    };

    return (
        <Button variant="secondary" onClick={handleLoginRegisterClick}>
            Login / Register
        </Button>
    );
}

export default LoginRegister;