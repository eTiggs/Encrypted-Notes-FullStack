import { describe, it, expect, afterEach, vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import noteService from '../../src/services/noteService';
import * as auth from '../../src/utils/auth';

const mock = new MockAdapter(axios);
const API_URL = `${import.meta.env.VITE_APP_API_URL}/note`;

vi.spyOn(auth, 'getToken').mockReturnValue('testToken');

describe('noteService', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should create a note successfully', async () => {
    const data = { noteId: '123' };
    mock.onPost(`${API_URL}/create`).reply(201, data);

    const response = await noteService.createNote('content', '60', '10');
    expect(response).toEqual(data);
  });

  it('should handle error while creating a note', async () => {
    mock.onPost(`${API_URL}/create`).reply(500);

    await expect(noteService.createNote('content', '60', '10')).rejects.toThrow();
  });

  it('should get a note successfully', async () => {
    const data = { decryptedContent: 'test content' };
    mock.onGet(`${API_URL}/123`).reply(200, data);

    const response = await noteService.getNote('123');
    expect(response).toEqual(data);
  });

  it('should handle error while fetching a note', async () => {
    mock.onGet(`${API_URL}/123`).reply(500);

    await expect(noteService.getNote('123')).rejects.toThrow();
  });

  it('should get all notes successfully', async () => {
    const data = [{ noteId: '123', content: 'test content' }];
    mock.onGet(API_URL).reply(200, data);

    const response = await noteService.getAllNotes();
    expect(response).toEqual(data);
  });

  it('should handle error while fetching all notes', async () => {
    mock.onGet(API_URL).reply(500);

    await expect(noteService.getAllNotes()).rejects.toThrow();
  });

  it('should delete notes successfully', async () => {
    mock.onDelete(API_URL).reply(200);

    await expect(noteService.deleteNotes(['123', '456'])).resolves.toBeUndefined();
  });

  it('should handle error while deleting notes', async () => {
    mock.onDelete(API_URL).reply(500);

    await expect(noteService.deleteNotes(['123', '456'])).rejects.toThrow();
  });

  it('should update reads successfully', async () => {
    mock.onPut(`${API_URL}/reads`).reply(200);

    await expect(noteService.updateReads('123', '5')).resolves.toBeUndefined();
  });

  it('should handle error while updating reads', async () => {
    mock.onPut(`${API_URL}/reads`).reply(500);

    await expect(noteService.updateReads('123', '5')).rejects.toThrow();
  });

  it('should update time successfully', async () => {
    mock.onPut(`${API_URL}/time`).reply(200);

    await expect(noteService.updateTime('123', '60')).resolves.toBeUndefined();
  });

  it('should handle error while updating time', async () => {
    mock.onPut(`${API_URL}/time`).reply(500);

    await expect(noteService.updateTime('123', '60')).rejects.toThrow();
  });
});