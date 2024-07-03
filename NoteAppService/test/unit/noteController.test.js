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
});
