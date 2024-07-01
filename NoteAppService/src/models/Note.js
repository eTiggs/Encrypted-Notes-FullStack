import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  encryptedContent: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  accessCount: { type: Number, default: 0 },
  maxAccessCount: { type: Number, required: true },
  userId: { type: String, required: true }
});

noteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Note = mongoose.model('Note', noteSchema);
export default Note;
