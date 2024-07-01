import React, { useEffect, useState } from 'react';
import noteService from '../../services/noteService';
import TableHeading from '../body/TableHeading';
import NotesTable from '../body/NotesTable';
import NoNotesError from '../body/NoNotesError';
import NoteActions from '../body/NoteActions.jsx';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await noteService.getAllNotes();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
    fetchNotes();
  }, []);

  const handleSelectNote = (noteId) => {
    setSelectedNotes((prevSelected) =>
      prevSelected.includes(noteId)
        ? prevSelected.filter((id) => id !== noteId)
        : [...prevSelected, noteId]
    );
  };

  const handleDeleteNotes = async () => {
    try {
      await noteService.deleteNotes(selectedNotes);
      setNotes(notes.filter(note => !selectedNotes.includes(note._id)));
      setSelectedNotes([]);
    } catch (error) {
      console.error('Error deleting notes:', error);
    }
  };

  const handleUpdateReads = async () => {
    const newReads = prompt("Enter the number of additional reads:");
    if (newReads !== null && newReads >= 0) {
      try {
        for (let noteId of selectedNotes) {
          await noteService.updateReads(noteId, newReads);
        }
        const updatedNotes = notes.map(note => {
          if (selectedNotes.includes(note._id)) {
            return { ...note, maxAccessCount: note.maxAccessCount + parseInt(newReads) };
          }
          return note;
        });
        setNotes(updatedNotes);
        setSelectedNotes([]);
      } catch (error) {
        console.error('Error updating reads:', error);
      }
    }
  };

  const handleUpdateTime = async () => {
    const newExpiryTime = prompt("Enter the amount of additional time in minutes:");
    if (newExpiryTime !== null) {
      try {
        for (let noteId of selectedNotes) {
          await noteService.updateTime(noteId, newExpiryTime);
        }
        const updatedNotes = notes.map(note => {
          if (selectedNotes.includes(note._id)) {
            return { ...note, expiresAt: new Date(new Date(note.expiresAt).getTime() + parseInt(newExpiryTime) * 60000) };
          }
          return note;
        });
        setNotes(updatedNotes);
        setSelectedNotes([]);
      } catch (error) {
        console.error('Error updating time:', error);
      }
    }
  };

  return (
    <div className="dashboard-container">
      {notes.length > 0 ? (
        <>
          <div className="center-table-container">
          <table className="table">
          <div className="table-container">
            <TableHeading />
            <NotesTable notes={notes} onSelectNote={handleSelectNote} selectedNotes={selectedNotes} />
          </div>
            </table>
          </div>
          {selectedNotes.length > 0 && (
            <div className="action-buttons-container">
              <NoteActions
              onDeleteNotes={handleDeleteNotes}
              onUpdateReads={handleUpdateReads}
              onUpdateTime={handleUpdateTime}
              />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="center-table-container">
            <table className="table">
              <TableHeading />
              <tbody>
                <tr>
                  <td colSpan="5">
                    <NoNotesError />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
