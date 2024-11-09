export default async function handler(req, res) {
  const { id } = req.query;
  const { method } = req;

  switch (method) {
    case 'GET':
      // Fetch a single course by ID
      const course = courses.find((c) => c._id === id);
      if (course) {
        res.status(200).json(course);
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
      break;

    case 'PUT':
      // Update a course
      const updatedData = req.body;
      const index = courses.findIndex((c) => c._id === id);
      if (index !== -1) {
        courses[index] = { ...courses[index], ...updatedData };
        res.status(200).json(courses[index]);
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
      break;

    case 'DELETE':
      // Delete a course
      courses = courses.filter((c) => c._id !== id);
      res.status(204).end();
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
