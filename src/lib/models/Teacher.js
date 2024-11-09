// import mongoose from 'mongoose';

// const teacherSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   subject: { type: String, required: true }, // e.g., "Mathematics"
//   courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
//   announcements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Announcement' }],
//   role: { type: String, default: 'Teacher' }
// });

// export default mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema);

import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  // Additional fields can be added as needed (e.g., subject, department)
}, { timestamps: true });

const Teacher = mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);

export default Teacher;
