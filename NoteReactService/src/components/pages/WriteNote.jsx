import React from 'react';
import { isLoggedIn } from '../../utils/auth';

const WriteNote = () => {
  return (
  <div>
    {isLoggedIn() ? (
      <h1>Welcome back to writing notes, User!</h1>
    ) : (
      <h1>Welcome to writing notes</h1>
    )}
    </div>
  );
};

export default WriteNote;
