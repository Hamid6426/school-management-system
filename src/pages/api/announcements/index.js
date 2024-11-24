import connectToDatabase from "@/lib/mongodb";
import Announcement from "@/lib/models/Announcement";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const announcements = await Announcement.find({});
      res.status(200).json(announcements);
    } catch (error) {
      res.status(500).json({ message: "Error fetching announcements" });
    }
  } else if (req.method === "POST") {
    const { title, message, date } = req.body;
    try {
      const announcement = new Announcement({ title, message, date });
      await announcement.save();
      res.status(201).json(announcement);
    } catch (error) {
      res.status(500).json({ message: "Error adding announcement" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
