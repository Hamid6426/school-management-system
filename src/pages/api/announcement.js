// api/announcement.js
import connectToDatabase from './../../lib/mongodb';
import Announcement from './../../lib/models/Announcement';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Only allow POST
  }

  await connectToDatabase();

  const { creator, title, content } = req.body;

  // Create new announcement
  const announcement = new Announcement({
    creator,
    title,
    content,
    dateCreated: new Date(),
  });
  await announcement.save();

  res.status(201).json({ message: 'Announcement posted successfully' });
}
