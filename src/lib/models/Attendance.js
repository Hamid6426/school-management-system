import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true, enum: ['Present', 'Absent', 'Late'] }
});

export default mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);
