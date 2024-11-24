import connectToDatabase from "@/lib/mongodb";
import Teacher from "@/lib/models/Teacher";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectToDatabase();
      const teachers = await Teacher.find({});
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ message: "Error fetching teachers" });
    }
  } else if (req.method === "POST") {
    const { fullName, email, phone } = req.body;
    try {
      // Check if teacher already exists
      const existingTeacher = await Teacher.findOne({ email });
      if (existingTeacher) {
        return res.status(400).json({ message: 'Teacher already exists' });
      }

      const teacher = new Teacher({ fullName, email, phone });
      await teacher.save();

      res.status(201).json(teacher);
    } catch (error) {
      res.status(500).json({ message: "Error adding teacher" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
