import connectToDatabase from "../../../lib/mongodb";
import Course from "../../../lib/models/Course";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const courses = await Course.find({});
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: "Error fetching courses" });
    }
  } else if (req.method === "POST") {
    const { title, description, duration, instructor } = req.body;
    try {
      const course = new Course({ title, description, duration, instructor });
      await course.save();
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ message: "Error adding course" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
