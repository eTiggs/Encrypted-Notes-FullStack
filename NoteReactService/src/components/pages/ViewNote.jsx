// src/components/pages/ViewNote.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import noteService from '../../services/noteService';

const ViewNote = () => {
  const { id } = useParams();
  const [noteContent, setNoteContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await noteService.getNote(id);
        setNoteContent(data.decryptedContent);
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };

    fetchNote();
  }, [id]);

  return (
    <div className="note-view-container">
      <h1 className="note-view-heading">Note Content</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <p className="note-content">{noteContent}</p>
      )}
    </div>
  );
};

export default ViewNote;
