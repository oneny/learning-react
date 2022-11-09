import React, { useEffect } from "react";
import { useIterator } from "../hooks/useIterator";
import RepositoryReadme from "./RepositoryReadme";

// 저장소 메뉴 컴포넌트
// Previous 버튼을 클릭하면 이전 저장소의 이름을 보여준다. Next는 반대로.
function RepoMenu({ repositories, selected, onSelect = (f) => f }) {
  if (!repositories) return;

  // RepoMenu 컴포넌트는 저장소 목록에 무엇이 들어있든 항상 첫 번째 저장소로 시작한다.
  // 안에 selectedRepo 프로퍼티를 사용해 표시될 저장소의 초기 인덱스를 설정해야 한다.
  // 즉, selected 프로퍼티가 있다면 name이 selected와 같은 우너소를 찾는다.
  // 처음에 저장소 메뉴가 올바른 이름을 표시하기 위해 이런 과정이 필요하다.
  // 그리고 부모(UserRepositories)로부터 전달받아야 한다.
  const [{ name }, previous, next] = useIterator(
    repositories,
    selected ? repositories.findIndex((repo) => repo.name === selected) : null
  );

  useEffect(() => {
    if (!name) return;
    onSelect(name);
  }, [name]);

  return (
    <div style={{ display: "flex" }}>
      <button onClick={previous}>&lt;</button>
      <p>{name}</p>
      <button onClick={next}>&gt;</button>
    </div>
  );
}

export default RepoMenu;
