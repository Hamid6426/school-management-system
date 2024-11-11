import connectToDatabase from "../../../lib/mongodb";
import Announcement from "../../../lib/models/Announcement";

export default async function handler(req, res) {
  const { id } = req.query;
  await connectToDatabase();

  if (req.method === "PUT") {
    const { title, message, date } = req.body;
    try {
      const announcement = await Announcement.findByIdAndUpdate(id, { title, message, date }, { new: true });
      res.status(200).json(announcement);
    } catch (error) {
      res.status(500).json({ message: "Error updating announcement" });
    }
  } else if (req.method === "DELETE") {
    try {
      await Announcement.findByIdAndDelete(id);
      res.status(200).json({ message: "Announcement deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting announcement" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
