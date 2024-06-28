import axios from 'axios';

const API_URL = 'http://localhost:6969';

const createNote = async (noteData) => {
  try {
    const response = await axios.post(`${API_URL}/writenote`, noteData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

export default { createNote };
