import React from 'react';
import LoginRegister from './LoginRegister';
import LogoutButton from './LogoutButton';

const NavItem = ({ token, onLogout }) => {
    return (
      <div className="ml-auto d-flex align-items-center">
        {token ? (
          <LogoutButton onLogout={onLogout} />
        ) : (
          <LoginRegister />
        )}
        </div>
    );
}

export default NavItem;
