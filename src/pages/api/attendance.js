// api/attendance.js
import connectToDatabase from './../../lib/mongodb';
import Attendance from './../../lib/models/Attendance';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Only allow POST
  }

  await connectToDatabase();

  const { student, date, status } = req.body;

  // Create new attendance record
  const attendance = new Attendance({ student, date, status });
  await attendance.save();

  res.status(201).json({ message: 'Attendance recorded successfully' });
}