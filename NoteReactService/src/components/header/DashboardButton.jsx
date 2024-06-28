import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <button className="btn btn-secondary nav-item" onClick={handleClick}>
      Dashboard
    </button>
  );
};

export default DashboardButton;
