import React from "react";
import { useFetch } from "../hooks/useFetch";

function Fetch({
  uri,
  renderSuccess,
  loadingFallback = <p>loading...</p>,
  renderError = error => (
    <pre>{JSON.stringify(error, null, 2)}</pre>
  ),
}) {
  // useFetch는 fetch 요청을 보내는 메커니즘을 추상화해준다.
  // Fetch 컴포넌트느느 또 한겹 추상화를 제공한다.
  const { loading, data, error } = useFetch(uri);

  if (loading) return loadingFallback;
  if (error) return renderError(error);
  if (data) return renderSuccess({ data });
}

export default Fetch;
