import CodeBlock from '@components/CodeBlock';
import Date from '@components/Date';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';
import Button from '@components/Button';
import { useState } from 'react';
// import dynamic from 'next/dynamic';

// const Button = dynamic(() => import('@components/Button'), {
//   loading: () => <div>Loading...</div>
// })

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params, preview }) {
  console.log(`>>>>>>>> ${preview}`);
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

const components = { Button, CodeBlock };

const ErrorComponent = () => {
  const [error, setError] = useState(false);

  if (error) {
    throw new Error('Error occured!');
  }

  return (
    <button
      className="rounded px-2 bg-green-500"
      onClick={() => setError(true)}
    >
      Error Fire
    </button>
  );
};

export default function Post({ postData }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <ErrorComponent />
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {postData.contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        )}
        {postData.mdxSource && (
          <MDXRemote {...postData.mdxSource} components={components} />
        )}
      </article>
    </>
  );
}
