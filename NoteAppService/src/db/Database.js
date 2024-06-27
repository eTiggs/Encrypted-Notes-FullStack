import mongoose from 'mongoose';

export default class Database {
    constructor(uri) {
        this.uri = uri;
    }

    async connect() {
        try {
            await mongoose.connect(this.uri);
            console.log('MongoDB connected');
        } catch (err) {
            console.log('MongoDB connection error:', err);
        }
    }
}
