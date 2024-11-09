import { verifyToken } from "./../../lib/utils/verifyToken";
import User from "./../../lib/models/User"; // Adjust the path as needed
import StudentLayout from "./../../components/Layouts/StudentLayout";

export async function getServerSideProps(context) {
  const token = context.req.cookies.token || "";
  const decodedToken = verifyToken(token);

  if (!decodedToken || decodedToken.role !== "Admin") {
    return {
      redirect: {
        destination: "/authentication/login",
        permanent: false,
      },
    };
  }

  // Fetch user data from the database
  const user = await User.findById(decodedToken.userId).select("fullName role");

  // To welcome the user
  return {
    props: {
      userData: {
        fullName: user.fullName,
        role: user.role,
      },
    },
  };
}
export default function StudentDashboard({ userData }) {
  return (
    <StudentLayout>
      <div>
        <h1>
          Welcome, {userData.fullName} ({userData.role})
        </h1>
        ;
      </div>
    </StudentLayout>
  );
}
