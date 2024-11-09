import connectToDatabase from "../../../lib/mongodb";
import Student from "../../../lib/models/Student";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectToDatabase();
      const students = await Student.find({});
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: "Error fetching students" });
    }
  } else if (req.method === "POST") {
    const { fullName, email, phone } = req.body;
    try {
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ message: 'Student already exists' });
      }

      const student = new Student({ fullName, email, phone });
      await student.save();

      res.status(201).json(student);
    } catch (error) {
      res.status(500).json({ message: "Error adding student" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}