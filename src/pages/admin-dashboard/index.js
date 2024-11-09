import { verifyToken } from "./../../lib/utils/verifyToken";
import User from "./../../lib/models/User"; // Adjust the path as needed
import AdminLayout from "./../../components/Layouts/AdminLayout";

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
export default function AdminDashboard({ userData }) {
  return (
    <AdminLayout>
      <div className="bg-dark2 text-dark">
        <h1>
          Welcome, {userData.fullName} ({userData.role})
        </h1>
      </div>
    </AdminLayout>
  );
}
