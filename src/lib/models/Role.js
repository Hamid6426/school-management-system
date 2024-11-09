import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['Admin', 'Teacher', 'Student', 'Parent'], required: true }
}, { timestamps: true });

const Role = mongoose.models.Role || mongoose.model('Role', RoleSchema);

export default Role;
