import React from "react";
import Fetch from "./Fetch";
import RepoMenu from "./RepoMenu";

// 깃허브 사용자 저장소 목록을 먼저 요청하고, 결과를 받으면 RepoMenu 컴포넌트에 저장소 목록을 전달해야 한다.
// login을 사용해 URI를 만들고 Fetch 컴포넌트에게 넘긴다.
// fetch가 성공하면 Fetch 컴포넌트가 돌려준 저장소 목록을 RepoMenu에 data를 전달한다.
// 사용자가 다른 저장소를 선택하면 이 새 저장소의 이ㅡ름과 부모 객체를 넘긴다.
function UserRepositories({ login, repo, onSelect = (f) => f }) {
  
  return (
    <Fetch
      uri={`https://api.github.com/users/${login}/repos`}
      renderSuccess={({ data }) => (
        <RepoMenu
          login={login}
          repositories={data}
          selected={repo}
          onSelect={onSelect}
        />
      )}
    />
  );
}

export default UserRepositories;
