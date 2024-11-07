// pages/_app.js
import './../styles/globals.css';
import './../styles/darkmode.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './layout';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
