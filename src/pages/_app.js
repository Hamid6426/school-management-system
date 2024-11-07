// pages/_app.js
import './../styles/globals.css';
import './../styles/darkmode.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './layout';
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

  const showSidebar = !noSidebarRoutes.includes(router.pathname);

  return (
    <>
      {showSidebar ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}