// import mongoose from 'mongoose';

// const parentSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
//   notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
//   role: { type: String, default: 'Parent' }
// });

// export default mongoose.models.Parent || mongoose.model('Parent', parentSchema);

import mongoose from 'mongoose';

const ParentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  // Additional fields can be added as needed (e.g., subject, department)
}, { timestamps: true });

const Parent = mongoose.models.Parent || mongoose.model('Parent', ParentSchema);

export default Parent;