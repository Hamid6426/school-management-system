import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  grade: { type: String, required: true }, // e.g., "A", "B+"
  dateAwarded: { type: Date, default: Date.now }
});

export default mongoose.models.Grade || mongoose.model('Grade', gradeSchema);
