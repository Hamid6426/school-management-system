import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now }
});

export default mongoose.models.Announcement || mongoose.model('Announcement', announcementSchema);
