import connectToDatabase from "../../../lib/mongodb";
import Parent from "../../../lib/models/Parent";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectToDatabase();
      const parents = await Parent.find({});
      res.status(200).json(parents);
    } catch (error) {
      res.status(500).json({ message: "Error fetching parents" });
    }
  } else if (req.method === "POST") {
    const { fullName, email, phone } = req.body;
    try {
      const existingParent = await Parent.findOne({ email });
      if (existingParent) {
        return res.status(400).json({ message: 'Parent already exists' });
      }

      const parent = new Parent({ fullName, email, phone });
      await parent.save();

      res.status(201).json(parent);
    } catch (error) {
      res.status(500).json({ message: "Error adding parent" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}