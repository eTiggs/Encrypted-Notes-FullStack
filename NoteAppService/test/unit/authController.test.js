import { expect } from 'chai';
import sinon from 'sinon';
import AuthService from '../../src/services/authService.js';
import AuthController from '../../src/controllers/authController.js';

describe('Auth Controller Unit Tests', () => {
  describe('register', () => {
    it('should register a new user successfully', async () => {
      const req = { body: { username: 'testuser', password: 'password123' } };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };
      sinon.stub(AuthService.prototype, 'register').resolves();

      await AuthController.register(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.send.calledWith('User registered')).to.be.true;

      AuthService.prototype.register.restore();
    });

    it('should handle errors in register', async () => {
      const req = { body: { username: 'testuser', password: 'password123' } };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };
      sinon.stub(AuthService.prototype, 'register').throws(new Error('Test Error'));

      await AuthController.register(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.send.calledWith('Test Error')).to.be.true;

      AuthService.prototype.register.restore();
    });
  });
});
