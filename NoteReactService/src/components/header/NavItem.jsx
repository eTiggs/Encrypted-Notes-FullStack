import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginRegister from './LoginRegister';
import LogoutButton from './LogoutButton';
import DashboardButton from './DashboardButton';
import WriteNoteButton from './WriteNoteButton';
import { isLoggedIn } from '../../utils/auth';

const NavItem = ({ token, onLogout }) => {
  const location = useLocation();
  const loggedIn = isLoggedIn();

  return (
    <div className="ml-auto d-flex align-items-center">
      {loggedIn ? (
        <>
          {location.pathname !== '/dashboard' && <DashboardButton />}
          {location.pathname !== '/writenote' && <WriteNoteButton />}
          <LogoutButton onLogout={onLogout} />
        </>
      ) : (
        <LoginRegister />
      )}
    </div>
  );
}

export default NavItem;
