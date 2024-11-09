import { studentsData } from "../../../data/studentsData"; // Dummy data or DB connection

let students = studentsData || [];

export default async function handler(req, res) {
  const { id } = req.query;
  const studentIndex = students.findIndex((student) => student._id === parseInt(id));

  switch (req.method) {
    case "GET":
      if (studentIndex !== -1) {
        res.status(200).json(students[studentIndex]);
      } else {
        res.status(404).json({ message: "Student not found" });
      }
      break;
    case "PUT":
      if (studentIndex !== -1) {
        students[studentIndex] = { ...students[studentIndex], ...req.body };
        res.status(200).json(students[studentIndex]);
      } else {
        res.status(404).json({ message: "Student not found" });
      }
      break;
    case "DELETE":
      if (studentIndex !== -1) {
        const deletedStudent = students.splice(studentIndex, 1);
        res.status(200).json(deletedStudent[0]);
      } else {
        res.status(404).json({ message: "Student not found" });
      }
      break;
    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}
