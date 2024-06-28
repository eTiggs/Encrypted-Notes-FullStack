import React from 'react';
import { Form } from 'react-bootstrap';

const NoteText = ({ noteContent, handleNoteChange }) => {
  return (
    <div className="write-note-form-group">
      <h1 className="text-center">Write your note</h1>
      <Form.Group controlId="formNoteText">
        <Form.Control
          as="textarea"
          rows={4}
          maxLength={256}
          value={noteContent}
          onChange={handleNoteChange}
          placeholder="Write your note here..."
          required
        />
      </Form.Group>
    </div>
  );
};

export default NoteText;
