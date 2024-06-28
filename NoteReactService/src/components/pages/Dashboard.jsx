import React from 'react';
import { isLoggedIn } from '../../utils/auth';

const Dashboard = () => {
  return (
  <div>
    {isLoggedIn() ? (
      <h1>Welcome back to the Dashboard, User!</h1>
    ) : (
      <h1>Welcome to the Dashboard</h1>
    )}
    </div>
  );
};

export default Dashboard;
