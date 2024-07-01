import React from 'react';

const NoteActions = ({ onDeleteNotes, onUpdateReads, onUpdateTime }) => {
  return (
    <div className="action-buttons">
      <button className="btn btn-danger" onClick={onDeleteNotes}>Delete Selected Notes</button>
      <button className="btn btn-warning mx-2" onClick={onUpdateReads}>Add Reads</button>
      <button className="btn btn-info" onClick={onUpdateTime}>Add Time</button>
    </div>
  );
};

export default NoteActions;