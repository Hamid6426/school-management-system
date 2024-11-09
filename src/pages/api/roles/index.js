let roles = []; // Mock roles array

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Fetch all roles
      res.status(200).json(roles);
      break;
      
    case 'POST':
      // Add a new role
      const newRole = { ...req.body, _id: Date.now().toString() };
      roles.push(newRole);
      res.status(201).json(newRole);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
