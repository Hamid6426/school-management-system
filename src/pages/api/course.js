//api/course.js
import connectToDatabase from './../../lib/mongodb';
import Course from './../../lib/models/Course';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Only allow POST
  }

  await connectToDatabase();

  const { courseName, courseCode, teacher, students, description } = req.body;

  // Check if course already exists
  const existingCourse = await Course.findOne({ courseCode });
  if (existingCourse) {
    return res.status(400).json({ message: 'Course already exists' });
  }

  // Create new course
  const course = new Course({
    courseName,
    courseCode,
    teacher,
    students,
    description,
  });
  await course.save();

  res.status(201).json({ message: 'Course added successfully' });
}