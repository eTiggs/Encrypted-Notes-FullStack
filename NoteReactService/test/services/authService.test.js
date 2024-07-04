import { afterEach, describe, expect, it } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import authService from '../../src/services/authService';

const mock = new MockAdapter(axios);

describe('authService', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should login successfully', async () => {
    const data = { token: 'testToken' };
    mock.onPost(`${process.env.REACT_APP_API_URL}/auth/login`).reply(200, data);

    const response = await authService.login('testuser', 'password');
    expect(response).toEqual(data);
  });

  it('should handle login error', async () => {
    mock.onPost(`${process.env.REACT_APP_API_URL}/auth/login`).reply(500);

    await expect(authService.login('testuser', 'password')).rejects.toThrow();
  });

  it('should register and login successfully', async () => {
    const data = { token: 'testToken' };
    mock.onPost(`${process.env.REACT_APP_API_URL}/auth/register`).reply(201);
    mock.onPost(`${process.env.REACT_APP_API_URL}/auth/login`).reply(200, data);

    const response = await authService.register('testuser', 'password');
    expect(response).toEqual(data);
  });

  it('should handle registration error', async () => {
    mock.onPost(`${process.env.REACT_APP_API_URL}/auth/register`).reply(500);

    await expect(authService.register('testuser', 'password')).rejects.toThrow();
  });
});