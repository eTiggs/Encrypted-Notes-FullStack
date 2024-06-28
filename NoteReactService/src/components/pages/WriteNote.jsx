import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NoteText from '../body/NoteText';
import NoteModifiers from '../body/NoteModifiers';
import NoteService from '../../services/noteService';

const WriteNote = () => {
  const [noteContent, setNoteContent] = useState('');
  const [timeActive, setTimeActive] = useState('5');
  const [reads, setReads] = useState('');
  const [infiniteReads, setInfiniteReads] = useState(false);

  const handleNoteChange = (e) => {
    setNoteContent(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTimeActive(e.target.value);
  };

  const handleReadsChange = (e) => {
    setReads(e.target.value);
  };

  const handleInfiniteChange = (e) => {
    setInfiniteReads(e.target.checked);
    if (e.target.checked) {
      setReads('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteData = {
      content: noteContent,
      timeActive,
      maxAccessCount: infiniteReads ? null : reads
    };

    try {
      const response = await NoteService.createNote(noteData);
      console.log('Note created:', response);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <Container className="write-note-container">
      <Row className="w-100 justify-content-center">
        <Col>
          <NoteText noteContent={noteContent} handleNoteChange={handleNoteChange} />
        </Col>
      </Row>
      <Row className="write-note-mt-3 w-100 justify-content-center">
        <Col>
          <NoteModifiers
            timeActive={timeActive}
            handleTimeChange={handleTimeChange}
            reads={reads}
            handleReadsChange={handleReadsChange}
            infiniteReads={infiniteReads}
            handleInfiniteChange={handleInfiniteChange}
            handleSubmit={handleSubmit}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default WriteNote;