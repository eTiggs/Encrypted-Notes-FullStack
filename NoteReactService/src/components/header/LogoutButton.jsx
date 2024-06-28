import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/auth');
  };

  return (
    <button onClick={handleLogout} className="btn btn-secondary nav-item">
      Logout
    </button>
  );
};

export default LogoutButton;
