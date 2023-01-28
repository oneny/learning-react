import Head from "next/head";
import Layout from "../../components/Layout";

export default function FIrstPost() {
  return (
    <>
      <Layout>
        <Head>
          <title>첫 번째 글</title>
        </Head>
        <h1>첫 번쨰 글</h1>
      </Layout>
    </>
  )
}