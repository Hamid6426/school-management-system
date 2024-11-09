import connectToDatabase from "../../../lib/mongodb";
import Role from "../../../lib/models/Role";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const roles = await Role.find({}).populate('userId', 'fullName email');
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching roles" });
    }
  } else if (req.method === "POST") {
    const { userId, role } = req.body;

    try {
      const newRole = new Role({ userId, role });
      await newRole.save();
      const populatedRole = await newRole.populate('userId', 'fullName email').execPopulate();
      res.status(201).json(populatedRole);
    } catch (error) {
      res.status(500).json({ message: "Error adding role" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
