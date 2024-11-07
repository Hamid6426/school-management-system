import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, required: true, enum: ['Admin', 'Teacher', 'Student', 'Parent'] },
  
//   // New fields for password reset functionality
//   resetPasswordToken: { type: String }, // Store the hashed reset token
//   resetPasswordTokenExpiry: { type: Date }, // Store the expiry time of the reset token
// });

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['Admin', 'Teacher', 'Student', 'Parent'] }, // Ensure role is defined here
  resetPasswordToken: String,
  resetPasswordTokenExpiry: Date,
});

export default mongoose.models.User || mongoose.model('User', userSchema);
