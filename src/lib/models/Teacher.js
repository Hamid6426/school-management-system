import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subject: { type: String, required: true }, // e.g., "Mathematics"
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  announcements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Announcement' }],
  role: { type: String, default: 'Teacher' }
});

export default mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema);
