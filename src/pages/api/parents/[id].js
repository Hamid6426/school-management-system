export default async function handler(req, res) {
  const { id } = req.query;
  const { method } = req;

  switch (method) {
    case 'GET':
      // Fetch a single parent by ID
      const parent = parents.find((p) => p._id === id);
      if (parent) {
        res.status(200).json(parent);
      } else {
        res.status(404).json({ message: 'Parent not found' });
      }
      break;

    case 'PUT':
      // Update a parent
      const updatedData = req.body;
      const index = parents.findIndex((p) => p._id === id);
      if (index !== -1) {
        parents[index] = { ...parents[index], ...updatedData };
        res.status(200).json(parents[index]);
      } else {
        res.status(404).json({ message: 'Parent not found' });
      }
      break;

    case 'DELETE':
      // Delete a parent
      parents = parents.filter((p) => p._id !== id);
      res.status(204).end();
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
