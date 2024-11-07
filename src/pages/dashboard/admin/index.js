// pages/dashboard/admin.js
import { verifyToken } from '../../utils/verifyToken';

export async function getServerSideProps(context) {
  const token = context.req.cookies.token || ''; // Retrieve token from cookies
  const userData = verifyToken(token);

  if (!userData || userData.role !== 'Admin') {
    return {
      redirect: { destination: '/authentication/login', permanent: false },
    };
  }

  return { props: { userData } };
}

export default function AdminDashboard({ userData }) {
  return <h1>Welcome, {userData.role}</h1>;
}
