import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User"; // Make sure you import the User model, not Admin

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  if (method === "GET") {
    try {
      // Retrieve document where role is Admin
      const admin = await User.findOne({ role: "Admin" });
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ message: "Error fetching admin data" });
    }
  } else if (method === "PUT") {
    const { fullName, email } = req.body;
    try {
      // Update the document with role Admin
      const updatedAdmin = await User.findOneAndUpdate(
        { role: "Admin" }, // Filter to target the Admin role
        { fullName, email },
        { new: true }
      );
      res.status(200).json(updatedAdmin);
    } catch (error) {
      res.status(500).json({ message: "Error updating admin data" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
