import { studentsData } from "../../../data/studentsData"; // Dummy data or DB connection

// In-memory students data (replace this with DB calls in a real app)
let students = studentsData || [];

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      // Fetch all students
      res.status(200).json(students);
      break;
    case "POST":
      // Add new student
      const newStudent = {
        _id: students.length + 1, // Just a mock _id, ideally this would be generated by a DB
        ...req.body,
      };
      students.push(newStudent);
      res.status(201).json(newStudent);
      break;
    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}