import React, { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from "react-markdown";
import { useMountedRef } from '../hooks/useMountedRef';

function RepositoryReadme({ repo, login }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [markdown, setMarkdown] = useState("");
  const mounted = useMountedRef();

  const loadReadme = useCallback(async (login, repo) => {
    setLoading(true);
    const uri = `https://api.github.com/repos/${login}/${repo}/readme`;
    const { download_url } = await fetch(uri).then(res => res.json());
    const markdown = await fetch(download_url).then(res => res.text());

    // useMountedRef 훅을 사용해 상태를 갱신하기 전에 컴포넌트가 마운트되어 있는지 확인할 수 있다.
    if (mounted.current) {
      setMarkdown(markdown);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!repo || !login) return;
    loadReadme(login, repo).catch(setError);
  }, [repo]);

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  if (loading) return <p>Loading...</p>

  return (
    <ReactMarkdown children={markdown} />
  )
}

export default RepositoryReadme