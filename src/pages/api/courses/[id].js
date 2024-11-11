// [id].js
import connectToDatabase from "../../../lib/mongodb";
import Course from "../../../lib/models/Course";

export default async function handler(req, res) {
  const { id } = req.query;
  await connectToDatabase();

  if (req.method === "PUT") {
    const { title, description, duration, instructor } = req.body;
    try {
      const course = await Course.findByIdAndUpdate(
        id,
        { title, description, duration, instructor },
        { new: true }
      );
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: "Error updating course" });
    }
  } else if (req.method === "DELETE") {
    try {
      await Course.findByIdAndDelete(id);
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting course" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
