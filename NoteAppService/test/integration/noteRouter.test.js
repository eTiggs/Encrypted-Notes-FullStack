import { expect } from 'chai';
import axios from 'axios';
import mongoose from 'mongoose';
import server from '../../index.js';
import Note from '../../src/models/Note.js';
import User from '../../src/models/User.js';

const API_URL = `http://localhost:${process.env.PORT || 6969}`;

describe('Note Routes Integration Tests', () => {
  let token;
  let userId;

  before(async () => {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    await Note.deleteMany({});
    await User.deleteMany({});

    await axios.post(`${API_URL}/auth/register`, {
      username: 'testuser',
      password: 'Test@123',
      pin: '1234'
    });

    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      username: 'testuser',
      password: 'Test@123',
      pin: '1234'
    });

    token = loginRes.data.token;

    const user = await User.findOne({ username: 'testuser' });
    userId = user._id.toString();
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe('PUT /note/time', () => {
    let noteId;

    beforeEach(async () => {
      const note = new Note({
        encryptedContent: 'Encrypted Test Note',
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
        maxAccessCount: 10,
        userId,
      });

      await note.save();
      noteId = note._id;
    });

    it('should update the expiry time of a note', async () => {
      const res = await axios.put(`${API_URL}/note/time`, {
        noteId,
        newExpiryTime: 60
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      expect(res.status).to.equal(200);
      expect(res.data).to.be.a('object');
      expect(res.data).to.have.property('message').eql('Expiry time updated successfully');
    });

    it('should return 404 if note not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      try {
        await axios.put(`${API_URL}/note/time`, {
          noteId: fakeId,
          newExpiryTime: 60
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        const { response } = err;
        expect(response.status).to.equal(404);
        expect(response.data).to.be.a('object');
        expect(response.data).to.have.property('message').eql('Note not found');
      }
    });

    it('should return 400 for invalid input', async () => {
      try {
        await axios.put(`${API_URL}/note/time`, {
          noteId,
          newExpiryTime: 'invalid'
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        const { response } = err;
        expect(response.status).to.equal(400);
        expect(response.data).to.be.a('object');
        expect(response.data).to.have.property('message').eql('Invalid newExpiryTime');
      }
    });
  });
});
