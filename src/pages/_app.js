import "./../styles/globals.css";
import "./../styles/darkmode.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import AdminLayout from "../components/Layouts/AdminLayout"; // Import AdminLayout
import ParentLayout from "../components/Layouts/ParentLayout"; // Import ParentLayout
import StudentLayout from "../components/Layouts/StudentLayout"; // Import StudentLayout
import TeacherLayout from "../components/Layouts/TeacherLayout"; // Import StudentLayout

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Define routes where the sidebar should not be displayed
  const noSidebarRoutes = [
    "/",
    "/authentication/sign-up",
    "/authentication/login",
    "/authentication/forgot-password",
  ];

  // Check if the route starts with "/admin-dashboard"
  const isAdminRoute = router.pathname.startsWith("/admin-dashboard");

  // Check if the route starts with "/parent-dashboard"
  const isParentRoute = router.pathname.startsWith("/parent-dashboard");

  // Check if the route starts with "/student-dashboard"
  const isStudentRoute = router.pathname.startsWith("/student-dashboard");

  // Check if the route starts with "/teacher-dashboard"
  const isTeacherRoute = router.pathname.startsWith("/teacher-dashboard");

  // Check if the current route matches a dynamic path for reset password
  const isResetPasswordRoute = router.asPath.startsWith(
    "/authentication/reset-password/"
  );

  // Determine if the sidebar should be shown
  const showSidebar =
    !noSidebarRoutes.includes(router.pathname) && !isResetPasswordRoute;

  return (
    <>
      {isAdminRoute ? (
        // For admin routes, wrap the page with AdminLayout
        <AdminLayout>
          {showSidebar ? (
            <Component {...pageProps} />
          ) : (
            <Component {...pageProps} />
          )}
        </AdminLayout>
      ) : isParentRoute ? (
        // For parent routes, wrap the page with ParentLayout
        <ParentLayout>
          {showSidebar ? (
            <Component {...pageProps} />
          ) : (
            <Component {...pageProps} />
          )}
        </ParentLayout>
      ) : isTeacherRoute ? (
        // For parent routes, wrap the page with ParentLayout
        <TeacherLayout>
          {showSidebar ? (
            <Component {...pageProps} />
          ) : (
            <Component {...pageProps} />
          )}
        </TeacherLayout>
      ) : isStudentRoute ? (
        // For student routes, wrap the page with StudentLayout
        <StudentLayout>
          {showSidebar ? (
            <Component {...pageProps} />
          ) : (
            <Component {...pageProps} />
          )}
        </StudentLayout>
      ) : // For all other routes, just render the component directly
      showSidebar ? (
        <Component {...pageProps} />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
