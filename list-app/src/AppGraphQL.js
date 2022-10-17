import React, { useEffect, useState } from 'react';
import { GraphQLClient } from "graphql-request";

const query = `
  query findRepos($login: String!){ 
    user(login: $login) {
      login
      name
      location
      avatar_url: avatarUrl
      repositories(first:100) {
        totalCount
        nodes {
          name
        }
      }
    }
  }
`;

const client = new GraphQLClient("https://api.github.com/graphQL", {
  headers: {
    Authorization: `Bearer PERSONAL_ACCESS_TOKEN`,
  },
});

function AppGraphQL() {
  const [login, setLogin] = useState("moontahoe");
  const [userData, setUserData] = useState();

  useEffect(() => {
    client
      .request(query, { login })
      .then(({ user }) => user)
      .then(setUserData)
      .catch(console.error);
  }, [login, query, client])

  if (!userData) return <p>Loading...</p>;

  return (
    <>
      <SearchForm value={login} onSearch={setLogin} />
      {/* <UserDetails {...userData} /> */}
      <p>{userData.repositories.totalCount} - repos</p>
      <List
        data={userData.repositories.nodes}
        renderEmpty={<p>This list is empty</p>}
        renderItem={repo => <span>{repo.name}</span>}
      />
    </>
  )
}

function UserDetails({ data }) {
  console.log(data);
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

function List({ data = [], renderEmpty, renderItem }) {
  return !data.length ? (
    renderEmpty
  ) : (
    <ul>
      {data.map((item, i) => (
        <li key={i}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}

export default AppGraphQL