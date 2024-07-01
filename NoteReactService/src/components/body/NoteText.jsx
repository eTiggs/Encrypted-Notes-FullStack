import React from 'react';

const NoteText = ({ content, onChange }) => {
  return (
    <div className="mb-3">
      <h1>Write your note</h1>
      <textarea 
        className="form-control" 
        value={content} 
        onChange={e => onChange(e.target.value)} 
        maxLength="128" 
        rows="4" 
        placeholder="Write your note here (max 128 characters)"
      />
    </div>
  );
};

export default NoteText;