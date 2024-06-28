import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/header/Header';
import LoginRegisterForm from './components/pages/LoginRegisterForm';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { getToken, setToken, removeToken, isLoggedIn } from './utils/auth';

const App = () => {
  const [token, setTokenState] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setTokenState(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setTokenState(null);
    navigate('/auth');
  };

  return (
    <div>
      <Header token={token} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<LoginRegisterForm onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} isLoggedIn={isLoggedIn()} />} />
      </Routes>
    </div>
  );
};

export default App;