import crypto from 'crypto';
import Config from '../config/Config.js';

Config.load();

const ALGORITHM = 'aes-256-cbc';
const KEY = Buffer.from(Config.encryptionKey, 'hex');
const IV = Buffer.alloc(16, 0); // Initialization vector (16 bytes)

export default class Encryption {
    static encryptNote(noteContent) {
        if (!noteContent || typeof noteContent !== 'string') {
            throw new TypeError('The "data" argument must be of type string');
        }
        const cipher = crypto.createCipheriv(ALGORITHM, KEY, IV);
        let encrypted = cipher.update(noteContent, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    static decryptNote(encryptedContent) {
        const decipher = crypto.createDecipheriv(ALGORITHM, KEY, IV);
        let decrypted = decipher.update(encryptedContent, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
