import React from 'react';
import { Link } from 'react-router-dom';

const NotesTable = ({ notes, onSelectNote, selectedNotes }) => {
  return (
    <tbody>
      {notes.map((note) => (
        <tr key={note._id}>
          <td className="table-column-small">
            <input
              type="checkbox"
              checked={selectedNotes.includes(note._id)}
              onChange={() => onSelectNote(note._id)}
            />
          </td>
          <td className="table-column">{note.name}</td>
          <td className="table-column">{new Date(note.expiresAt).toLocaleString()}</td>
          <td className="table-column">{note.maxAccessCount === 0 ? "Infinite" : note.maxAccessCount}</td>
          <td className="table-column-link">
            <Link to={`https://encrypted-notes-fullstack.onrender.com/note/${note._id}`}>View Note</Link>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default NotesTable;