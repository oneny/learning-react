import Layout from 'components/Layout'
import SubLayout from 'components/SubLayout'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CartDateSlug() {
  const router = useRouter();
  const { date } = router.query;

  return (
    <>
      <h1 className="title">Cart Date Slug {JSON.stringify(date)}</h1>
      <Link href='/cart/2023/01/27'>2023년 1월 27일</Link>
      <br />
      <button onClick={() => router.push('/cart/2023/01/27')}>2023년 1월 27일로</button>
    </>
  )
}

CartDateSlug.getLayout = function getLayout(page) {
  return (
    <Layout>
      <SubLayout>{page}</SubLayout>
    </Layout>
  )
}
