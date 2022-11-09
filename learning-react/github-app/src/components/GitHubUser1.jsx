import React, { useState, useEffect } from "react";

const loadJSON = key => key && JSON.parse(localStorage.getItem(key));

const saveJSON =(key, data) => localStorage.setItem(key, JSON.stringify(data));

function GitHubUser({ login }) {
  // 처음에 로컬 스토리지에는 user:oneny에 대한 값이 없으므로 전체 JSON 정보가 출력되는데
  // 새로고침하면 로컬 스토리지에 있기 때문에 그 정보(4중)를 렌더링한다.
  const [data, setData] = useState(loadJSON(`user:${login}`));
  
  useEffect(() => {
    if (!data) return;
    // if (data.login === login) return;
    const { name, avatar_url, location } = data;
    saveJSON(`user:${login}`, {
      name,
      login,
      avatar_url,
      location
    });
  }, [data]);

  useEffect(() => {
    if (!login) return;
    if (data && data.login === login) return;
    fetch(`https://api.github.com/users/${login}`)
      .then((response) => response.json())
      .then(setData)
      .catch(console.error);
  }, [login])

  if (data) return <pre>{JSON.stringify(data, null, 2)}</pre>;

  return null;
}

export default GitHubUser;
