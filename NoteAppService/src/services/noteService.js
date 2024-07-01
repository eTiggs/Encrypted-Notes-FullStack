import Note from '../models/Note.js';
import Encryption from '../utils/encryption.js';

class NoteService {
    static async create(userId, data) {
        const { content, expiresAt, maxAccessCount } = data;
        const encryptedContent = Encryption.encryptNote(content);
        const note = new Note({
            content,
            encryptedContent,
            expiresAt,
            maxAccessCount,
            userId
        });
        await note.save();
        return `http://link.com/note/${note._id}`;
    }

    static async get(noteId) {
        const note = await Note.findById(noteId);
        if (!note) {
            throw new Error('Note not found');
        }
        if (note.accessCount >= note.maxAccessCount || new Date() > note.expiresAt) {
            await note.remove();
            throw new Error('Note expired or max access count reached');
        }
        note.accessCount += 1;
        await note.save();
        return Encryption.decryptNote(note.encryptedContent);
    }
}

export default NoteService;
