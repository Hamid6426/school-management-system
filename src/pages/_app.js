// pages/_app.js
import './../styles/globals.css';
import './../styles/darkmode.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Define routes where the sidebar should not be displayed
  const noSidebarRoutes = [
    '/',
    '/authentication/sign-up',
    '/authentication/login',
    '/authentication/forgot-password',
  ];

  // Check if the current route matches a dynamic path for reset password
  const isResetPasswordRoute = router.asPath.startsWith('/authentication/reset-password/');

  const showSidebar =
    !noSidebarRoutes.includes(router.pathname) && !isResetPasswordRoute;

  return (
    <>
      {showSidebar ? (
          <Component {...pageProps} />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
