import React from 'react';
import NavBar from './NavBar';

const Header = ({ token, onLogout }) => {
    return (
        <div>
            <NavBar token={token} onLogout={onLogout} />
        </div>
    );
}

export default Header;
