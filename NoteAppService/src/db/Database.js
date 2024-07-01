import mongoose from 'mongoose';
import Note from '../models/Note.js';

export default class Database {
    constructor(uri) {
        this.uri = uri;
    }

    async connect() {
        try {
            await mongoose.connect(this.uri);
            Note.ensureIndexes().catch((err) => console.error('Error ensuring indexes:', err));
            console.log('MongoDB connected');
        } catch (err) {
            console.log('MongoDB connection error:', err);
        }
    }
}
