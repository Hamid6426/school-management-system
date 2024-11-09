import connectToDatabase from "../../../lib/mongodb";
import Parent from "../../../lib/models/Parent";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { fullName, email, phone } = req.body;

    try {
      await connectToDatabase();
      const parent = await Parent.findByIdAndUpdate(id, { fullName, email, phone }, { new: true });
      res.status(200).json(parent);
    } catch (error) {
      res.status(500).json({ message: "Error updating parent" });
    }
  } else if (req.method === "DELETE") {
    try {
      await connectToDatabase();
      const parent = await Parent.findByIdAndDelete(id);
      res.status(200).json({ message: "Parent deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting parent" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
