import connectToDatabase from "../../../lib/mongodb";
import Role from "../../../lib/models/Role";

export default async function handler(req, res) {
  const { id } = req.query;
  await connectToDatabase();

  if (req.method === "PUT") {
    const { role } = req.body;
    try {
      const updatedRole = await Role.findByIdAndUpdate(id, { role }, { new: true }).populate('userId', 'name email');
      res.status(200).json(updatedRole);
    } catch (error) {
      res.status(500).json({ message: "Error updating role" });
    }
  } else if (req.method === "DELETE") {
    try {
      await Role.findByIdAndDelete(id);
      res.status(200).json({ message: "Role deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting role" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
