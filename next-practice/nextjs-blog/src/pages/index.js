import Link from 'next/link';

export async function getServerSideProps() {
  return {
    props: { time: new Date().toString() },
  };
}

export default function Home({ time }) {
  return (
    <>
      <h1 className='title'>
        {time}
      </h1>
      <h1><Link href='/csr'>CSR로</Link></h1>
    </>
  )
}
