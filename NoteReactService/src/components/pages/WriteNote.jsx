import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteText from '../body/NoteText';
import NoteModifiers from '../body/NoteModifiers';
import noteService from '../../services/noteService';

const WriteNote = () => {
  const [content, setContent] = useState('');
  const [timeActive, setTimeActive] = useState('1440');
  const [maxAccessCount, setMaxAccessCount] = useState('5');
  const [infiniteReads, setInfiniteReads] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await noteService.createNote(content, timeActive, infiniteReads ? '0' : maxAccessCount);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <div className="write-note-container">
      <form onSubmit={handleSubmit} className="note-form">
        <NoteText content={content} onChange={setContent} />
        <NoteModifiers 
          timeActive={timeActive} 
          setTimeActive={setTimeActive} 
          maxAccessCount={maxAccessCount} 
          setMaxAccessCount={setMaxAccessCount} 
          infiniteReads={infiniteReads} 
          setInfiniteReads={setInfiniteReads} 
        />
        <button type="submit" className="btn btn-primary btn-lg">Create & Encrypt Note</button>
      </form>
    </div>
  );
};

export default WriteNote;
