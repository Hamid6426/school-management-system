import connectToDatabase from "@/lib/mongodb";
import Teacher from "@/lib/models/Teacher";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { fullName, email, phone } = req.body;

    try {
      await connectToDatabase();
      const teacher = await Teacher.findByIdAndUpdate(id, { fullName, email, phone }, { new: true });
      res.status(200).json(teacher);
    } catch (error) {
      res.status(500).json({ message: "Error updating teacher" });
    }
  } else if (req.method === "DELETE") {
    try {
      await connectToDatabase();
      const teacher = await Teacher.findByIdAndDelete(id);
      res.status(200).json({ message: "Teacher deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting teacher" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
