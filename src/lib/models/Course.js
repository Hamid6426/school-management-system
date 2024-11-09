import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String }, // e.g., "6 weeks"
  instructor: { type: String } // e.g., "John Doe" or can be a reference to a Teacher model if needed
}, { timestamps: true });

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

export default Course;
