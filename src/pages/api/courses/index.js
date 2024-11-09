let courses = []; // Mock courses array

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Fetch all courses
      res.status(200).json(courses);
      break;
      
    case 'POST':
      // Add a new course
      const newCourse = { ...req.body, _id: Date.now().toString() };
      courses.push(newCourse);
      res.status(201).json(newCourse);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
