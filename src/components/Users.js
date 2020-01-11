import React from "react";
import User from "./User";

function Users({ users, deleteUser }) {
  console.log(users);

  return (
    <ul className="users">
      {users.map((user, index) => {
        return (
          <User
            user={user}
            key={user.id}
            deleteUser={deleteUser}
            userIndex={index}
          />
        );
      })}
    </ul>
  );
}

export default Users;
