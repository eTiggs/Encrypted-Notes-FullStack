import Note from '../models/Note.js';
import Encryption from '../utils/encryption.js';

export const createNote = async (req, res) => {
  const { content, timeActive, maxAccessCount } = req.body;
  const userId = req.userId;
  
  try {
    const encryptedContent = Encryption.encryptNote(content);
    const expiresAt = new Date(Date.now() + parseInt(timeActive) * 60000);

    const note = new Note({
      encryptedContent,
      expiresAt,
      maxAccessCount,
      userId
    });

    await note.save();
    res.status(201).json({ message: 'Note created successfully', noteId: note._id });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Failed to create note' });
  }
};

export const getNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const { noteIds } = req.body;

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId !== userId) {
      if (note.maxAccessCount > 0) {
        note.accessCount += 1;
        if (note.accessCount >= note.maxAccessCount) {
          await Note.deleteMany({ _id: { $in: noteIds } });
          return res.status(404).json({ message: 'Note expired or max access count reached' });
        } 
        await note.save();
      }
    }

    const decryptedContent = Encryption.decryptNote(note.encryptedContent);
    res.status(200).json({ decryptedContent });
  } catch (error) {
    console.error('Error getting note:', error);
    res.status(500).json({ message: 'Failed to get note' });
  }
};

export const getAllNotes = async (req, res) => {
  const userId = req.userId;
  const { noteIds } = req.body;
  try {
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error getting notes:', error);
    res.status(500).json({ message: 'Failed to get notes' });
  }
};

export const deleteNotes = async (req, res) => {
  const { noteIds } = req.body;
  try {
    await Note.deleteMany({ _id: { $in: noteIds } });
    res.status(200).json({ message: 'Notes deleted successfully' });
  } catch (error) {
    console.error('Error deleting notes:', error);
    res.status(500).json({ message: 'Failed to delete notes' });
  }
};

export const updateReads = async (req, res) => {
  const { noteId, newReads } = req.body;
  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    note.maxAccessCount += parseInt(newReads);
    await note.save();
    res.status(200).json({ message: 'Reads updated successfully' });
  } catch (error) {
    console.error('Error updating reads:', error);
    res.status(500).json({ message: 'Failed to update reads' });
  }
};

export const updateTime = async (req, res) => {
  const { noteId, newExpiryTime } = req.body;
  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    note.expiresAt = new Date(note.expiresAt.getTime() + parseInt(newExpiryTime) * 60000);
    await note.save();
    res.status(200).json({ message: 'Expiry time updated successfully' });
  } catch (error) {
    console.error('Error updating expiry time:', error);
    res.status(500).json({ message: 'Failed to update expiry time' });
  }
};
