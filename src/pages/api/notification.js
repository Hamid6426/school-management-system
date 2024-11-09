// api/notification.js
import connectToDatabase from './../../lib/mongodb';
import Notification from './../../lib/models/Notification';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Only allow POST
  }

  await connectToDatabase();

  const { user, message } = req.body;

  // Create new notification
  const notification = new Notification({
    user,
    message,
    date: new Date(),
    read: false,
  });
  await notification.save();

  res.status(201).json({ message: 'Notification created successfully' });
}
