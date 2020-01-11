import React from "react";
import axios from "axios";

import User from "./User";

function Users({ users, deleteUser }) {
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
