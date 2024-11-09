export default async function handler(req, res) {
  const { id } = req.query;
  const { method } = req;

  switch (method) {
    case 'GET':
      // Fetch a single role by ID
      const role = roles.find((r) => r._id === id);
      if (role) {
        res.status(200).json(role);
      } else {
        res.status(404).json({ message: 'Role not found' });
      }
      break;

    case 'PUT':
      // Update a role
      const updatedData = req.body;
      const index = roles.findIndex((r) => r._id === id);
      if (index !== -1) {
        roles[index] = { ...roles[index], ...updatedData };
        res.status(200).json(roles[index]);
      } else {
        res.status(404).json({ message: 'Role not found' });
      }
      break;

    case 'DELETE':
      // Delete a role
      roles = roles.filter((r) => r._id !== id);
      res.status(204).end();
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
