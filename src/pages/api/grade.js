// api/grade.js
import connectToDatabase from './../../lib/mongodb';
import Grade from './../../lib/models/Grade';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Only allow POST
  }

  await connectToDatabase();

  const { student, course, grade, dateAwarded } = req.body;

  // Create new grade record
  const newGrade = new Grade({ student, course, grade, dateAwarded });
  await newGrade.save();

  res.status(201).json({ message: 'Grade added successfully' });
}
