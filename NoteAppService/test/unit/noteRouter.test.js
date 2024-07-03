import { expect } from 'chai';
import sinon from 'sinon';
import * as noteController from '../../src/controllers/noteController.js';
import Note from '../../src/models/Note.js';
import Encryption from '../../src/utils/encryption.js';

describe('Note Controller Unit Tests', () => {

  describe('createNote', () => {
    let req, res, noteStub;

    beforeEach(() => {
      req = {
        body: { content: 'Test Note', timeActive: '60', maxAccessCount: '10' },
        userId: '123',
      };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      noteStub = sinon.stub(Note.prototype, 'save').resolves();
      sinon.stub(Encryption, 'encryptNote').returns('encryptedNote');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should create a new note successfully', async () => {
      await noteController.createNote(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('message', 'Note created successfully'))).to.be.true;
    });

    it('should handle errors in createNote', async () => {
      noteStub.throws(new Error('Test Error'));

      await noteController.createNote(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('message', 'Failed to create note'))).to.be.true;
    });

    it('should handle invalid content', async () => {
      req.body.content = null;

      await noteController.createNote(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('message', 'Failed to create note'))).to.be.true;
    });

    it('should handle invalid timeActive', async () => {
      req.body.timeActive = 'invalid';

      await noteController.createNote(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('message', 'Failed to create note'))).to.be.true;
    });

    it('should handle invalid maxAccessCount', async () => {
      req.body.maxAccessCount = 'invalid';

      await noteController.createNote(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('message', 'Failed to create note'))).to.be.true;
    });
  });

  describe('getNote', () => {
    let req, res, noteStub, note;

    beforeEach(() => {
      req = {
        params: { id: '1' },
        userId: '123',
        body: { noteIds: ['1', '2'] },
      };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      note = {
        _id: '1',
        userId: '123',
        encryptedContent: 'encryptedNote',
        accessCount: 0,
        maxAccessCount: 10,
        save: sinon.stub().resolves(),
        remove: sinon.stub().resolves()
      };
      noteStub = sinon.stub(Note, 'findById').resolves(note);
      sinon.stub(Encryption, 'decryptNote').returns('decryptedNote');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should get a note successfully', async () => {
      await noteController.getNote(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('decryptedContent', 'decryptedNote'))).to.be.true;
    });

    it('should return 404 if note not found', async () => {
      noteStub.resolves(null);

      await noteController.getNote(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('message', 'Note not found'))).to.be.true;
    });

    it('should handle max access count reached', async () => {
      note.userId = '456';
      note.accessCount = 9;
      await noteController.getNote(req, res);

      expect(note.save.called).to.be.false;
      expect(res.status.calledWith(404)).to.be.false;
      expect(res.json.calledWith(sinon.match.has('message', 'Note expired or max access count reached'))).to.be.false;
    });

    it('should handle errors in getNote', async () => {
      noteStub.throws(new Error('Test Error'));

      await noteController.getNote(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('message', 'Failed to get note'))).to.be.true;
    });
  });

  describe('deleteNotes', () => {
    let req, res, deleteStub;

    beforeEach(() => {
      req = {
        body: { noteIds: ['1', '2'] },
      };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      deleteStub = sinon.stub(Note, 'deleteMany').resolves({ deletedCount: 2 });
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should delete notes successfully', async () => {
      await noteController.deleteNotes(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('message', 'Notes deleted successfully'))).to.be.true;
    });

    it('should handle errors in deleteNotes', async () => {
      deleteStub.throws(new Error('Test Error'));

      await noteController.deleteNotes(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('message', 'Failed to delete notes'))).to.be.true;
    });
  });

  describe('updateReads', () => {
    let req, res, noteStub;

    beforeEach(() => {
      req = {
        body: { noteId: '1', newReads: '5' },
      };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      noteStub = sinon.stub(Note, 'findById').resolves({
        _id: '1',
        maxAccessCount: 5,
        save: sinon.stub().resolves()
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should update the read count of a note successfully', async () => {
      await noteController.updateReads(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('message', 'Reads updated successfully'))).to.be.true;
    });

    it('should return 404 if note not found', async () => {
      noteStub.resolves(null);

      await noteController.updateReads(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('message', 'Note not found'))).to.be.true;
    });

    it('should handle errors in updateReads', async () => {
      noteStub.throws(new Error('Test Error'));

      await noteController.updateReads(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('message', 'Failed to update reads'))).to.be.true;
    });
  });

  describe('updateTime', () => {
    let req, res, noteStub;

    beforeEach(() => {
      req = {
        body: { noteId: '1', newExpiryTime: '60' },
      };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      noteStub = sinon.stub(Note, 'findById').resolves({
        _id: '1',
        expiresAt: new Date(),
        save: sinon.stub().resolves()
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should update the expiry time of a note successfully', async () => {
      await noteController.updateTime(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('message', 'Expiry time updated successfully'))).to.be.true;
    });

    it('should return 404 if note not found', async () => {
      noteStub.resolves(null);

      await noteController.updateTime(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('message', 'Note not found'))).to.be.true;
    });

    it('should handle errors in updateTime', async () => {
      noteStub.throws(new Error('Test Error'));

      await noteController.updateTime(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('message', 'Failed to update expiry time'))).to.be.true;
    });
  });
});
