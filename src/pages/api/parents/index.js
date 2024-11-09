let parents = []; // Mock parents array

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Fetch all parents
      res.status(200).json(parents);
      break;
      
    case 'POST':
      // Add a new parent
      const newParent = { ...req.body, _id: Date.now().toString() };
      parents.push(newParent);
      res.status(201).json(newParent);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
