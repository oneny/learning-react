import React, { useReducer, useState } from "react";

const firstUser = {
  id: "9102-8293-7193",
  firstName: "Bill",
  lastName: "Wilson",
  city: "Missoula",
  state: "Montana",
  email: "bwilson@mtnwilsons.com",
  admin: false,
};

function User() {
  // useReducer를 사용하면 초기 상태와 새 정보를 쉽게 한데 모을 수 있다.
  const [user, setUser] = useReducer(
    (user, newDetails) => ({ ...user, ...newDetails }),
    firstUser
  );

  return (
    <div>
      <h1>
        {user.firstName} {user.lastName} - {user.admin ? "Admin" : "User"}
      </h1>
      <p>Email: {user.email}</p>
      <p>
        Location: {user.city}, {user.state}
      </p>
      <button onClick={() => setUser({ admin: !user.admin })}>Change Role</button>
    </div>
  );
}

export default User;
