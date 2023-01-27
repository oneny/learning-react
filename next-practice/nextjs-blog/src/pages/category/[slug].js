import Layout from 'components/Layout'
import SubLayout from 'components/SubLayout'
import { useRouter } from 'next/router'
import { useEffect } from 'react';

export default function Category() {
  const router = useRouter();

  return (
    <>
      <h1 className="title">My Info</h1>
    </>
  )
}

Category.getLayout = function getLayout(page) {
  return (
    <Layout>
      <SubLayout>{page}</SubLayout>
    </Layout>
  )
}
