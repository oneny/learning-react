import '../styles/globl.css';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Next Migration App</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
