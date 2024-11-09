import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  grade: { type: String, required: true }, // e.g., "10th Grade"
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }],
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent' },
  performanceReports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grade' }],
  role: { type: String, default: 'Student' }
});

export default mongoose.models.Student || mongoose.model('Student', studentSchema);
