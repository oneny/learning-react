import React from "react";
import Fetch from "./Fetch";
import UserRepositories from "./UserRepositories";

// 성공할 경우의 렌더 프롭
function UserDetails({ data }) {
  if (!data.login) {
    return <p>시간 당 요청 횟수를 초과하셨습니다.</p>
  }

  return (
    <div className="githubUser">
      <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />

      <div>
        <h1>{data.login}</h1>
        {data.name && <p>{data.name}</p>}
        {data.location && <p>{data.location}</p>}
      </div>
    </div>
  );
}

// GitHub 컴포넌트는 깃허브에서 살펴볼 사용자명을 login으로 받는다
// login을 사용해 Fetch 컴포넌트에게 전달할 uri 프로퍼티를 만든다.
// Fetch 컴포넌트의 fetch가 성공하면 UserDetails 컴포넌트가 렌더링되고,
// 요청이 진행 중이면 디폴트인 "loading..." 메시지가 표시된다.
// 오류가 발생하면 오류 정보가 자동으로 표시된다.
function GitHubUser({ login }) {
  return (
    <Fetch
      uri={`https://api.github.com/users/${login}`}
      renderSuccess={UserDetails}
    />
  )
}

export default GitHubUser;
