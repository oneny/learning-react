import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    // 웹 요청을 취소할 수 있게 해주는 기능
    // 보통 웹에서 요청을 일단 보내면 이후에 필요 없어져도
    // 취소할 방법이 없어서 그냥 요청은 그대로 두고 응답받은 내용을 사용 안 하는 식으로만 구현할 때
    // 간단한 HTTP 요청을 응답이 꽤 빠르기 때문에 괜찮을 수도 있지만
    // 무거운 요청의 경우는 불필요한 네트워크 트래픽을 낭비하게 되거나 연결을 차지하고 있으므로 취소하는 것이 좋다.
    // 이 때 사용하는 것이 AbortController!
    // const controller = new AbortController(); // able to cancel any pending request that is still out there if component unmounts

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users");
        const usernames = response.data.map(user => user.username);
        isMounted && setUsers(usernames);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from : location }, replace: true });
      }
    }

    getUsers();

    // the cleanup function of course runs as the component unmounts
    return () => {
      isMounted = false;
      // we'll abort any requests or cancel any requests that we have when the component unmounts
      // controller.abort();
    }
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length
        ? (
          <ul>
            {users.map((user, i) => <li key={i}>{user}</li>)}
          </ul>
        ) : (
          <p>No users to display</p>
        )
      }
      <br />
    </article>
  );
}

export default Users;
