import { describe, it, expect, beforeEach } from 'vitest';
import { getToken, setToken, removeToken, isLoggedIn } from '../../src/utils/auth';

const localStorageMock = (function() {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

describe('auth utility functions', () => {
  beforeEach(() => {
    // Clear mock localStorage before each test
    localStorageMock.clear();
    // Use vi to mock global localStorage with our mock
    global.localStorage = localStorageMock;
  });

  it('should get token from localStorage', () => {
    localStorage.setItem('token', 'testToken');
    expect(getToken()).toBe('testToken');
  });

  it('should set token in localStorage', () => {
    setToken('newToken');
    expect(localStorage.getItem('token')).toBe('newToken');
  });

  it('should remove token from localStorage', () => {
    localStorage.setItem('token', 'testToken');
    removeToken();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should return true if token exists', () => {
    localStorage.setItem('token', 'testToken');
    expect(isLoggedIn()).toBe(true);
  });

  it('should return false if token does not exist', () => {
    expect(isLoggedIn()).toBe(false);
  });
});