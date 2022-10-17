import React, { useState } from "react";
import GitHubUser from "./components/GitHubUser";
import SearchForm from "./components/SearchForm";
import UserRepositories from "./components/UserRepositories";
import RepositoryReadme from "./components/RepositoryReadme";

function App() {
  const [login, setLogin] = useState();
  const [repo, setRepo] = useState();

  // 사용자가 검색 필드의 내용을 지우거나 아무 사용자도 검색하지 않을 때 repo의 값을 비울 수 있어야 한다.
  // login의 값이 없을 때 repo를 변경해주는 handleSearch 메서드 추가
  const handleSearch = login => {
    if (login) return setLogin(login);
    setLogin("");
    setRepo("");
  }

  if (!login) return (
    <SearchForm value={login} onSearch={handleSearch} />
  )

  // GithubUser, UserRepositories, RepositoryReadmd 컴포넌트는 모두 깃허브에 데이터를 얻기 위한 요청을 한다.
  // 같은 수준에서 이들을 렌더링하면 이 모든 요청이 동시에 병렬적으로 이뤄진다.
  return (
    <>
      {/* 필요한 데이터가 준비되기 전까지 컴포넌트 렌더링하지 않기 */}
      <SearchForm value={login} onSearch={handleSearch} />
      {login && <GitHubUser login={login} />}
      {login && (
        <UserRepositories login={login} repo={repo} onSelect={setRepo} />
      )}
      {login && repo && <RepositoryReadme login={login} repo={repo} />}
    </>
  );
}

export default App;
