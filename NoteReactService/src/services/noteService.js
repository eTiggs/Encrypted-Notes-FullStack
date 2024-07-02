import axios from 'axios';
import { getToken } from '../utils/auth';

const API_URL = process.env.REACT_APP_API_URL + '/auth';

const createNote = async (content, timeActive, maxAccessCount) => {
  const token = getToken();
  try {
    const response = await axios.post(`${API_URL}/create`, {
      content,
      timeActive,
      maxAccessCount
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

const getNote = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching note:', error);
    throw error;
  }
};

const getAllNotes = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

const deleteNotes = async (noteIds) => {
  try {
    await axios.delete(API_URL, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      data: { noteIds }
    });
  } catch (error) {
    console.error('Error deleting notes:', error);
    throw error;
  }
};

const updateReads = async (noteId, newReads) => {
  try {
    await axios.put(`${API_URL}/reads`, { noteId, newReads }, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
  } catch (error) {
    console.error('Error updating reads:', error);
    throw error;
  }
};

const updateTime = async (noteId, newExpiryTime) => {
  try {
    await axios.put(`${API_URL}/time`, { noteId, newExpiryTime }, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
  } catch (error) {
    console.error('Error updating time:', error);
    throw error;
  }
};

export default {
  createNote,
  getNote,
  getAllNotes,
  deleteNotes,
  updateReads,
  updateTime
};
