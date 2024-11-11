import mongoose from 'mongoose';

const AdminSettingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true, default: 'admin' },
  password: { type: String, required: true }
}, { timestamps: true });

const AdminSetting = mongoose.models.AdminSetting || mongoose.model('AdminSetting', AdminSettingSchema);

export default AdminSetting;
