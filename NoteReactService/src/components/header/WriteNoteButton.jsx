import React from 'react';
import { useNavigate } from 'react-router-dom';

const WriteNoteButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/writenote');
  };

  return (
    <button className="btn btn-secondary nav-item" onClick={handleClick}>
      Write Note
    </button>
  );
};

export default WriteNoteButton;