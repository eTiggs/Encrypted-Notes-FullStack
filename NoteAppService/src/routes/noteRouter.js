import express from 'express';
import { createNote, getNote, getAllNotes, deleteNotes, updateReads, updateTime } from '../controllers/noteController.js';
import AuthValidator from '../middleware/authValidator.js';
import validateNoteCreation from '../middleware/noteValidator.js';

export default class NoteRouter {
    #router;
    #routeStartPoint;

    constructor() {
        this.#router = express.Router();
        this.#routeStartPoint = '/note';
        this.routes();
    }

    routes() {
        this.#router.post('/create', AuthValidator.authenticate, validateNoteCreation, createNote);
        this.#router.get('/:id', AuthValidator.optionalAuthenticate, getNote);
        this.#router.get('/', AuthValidator.authenticate, getAllNotes);
        this.#router.delete('/', AuthValidator.authenticate, deleteNotes);
        this.#router.put('/reads', AuthValidator.authenticate, updateReads);
        this.#router.put('/time', AuthValidator.authenticate, updateTime);
    }

    getRouter() {
        return this.#router;
    }

    getRouteStartPoint() {
        return this.#routeStartPoint;
    }
}