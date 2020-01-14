import React from "react";
import axios from "axios";

import User from "./User";
import "../styles/components/users.scss";

function Users({ users, deleteUser }) {
  return (
    <section className="Users">
      <ul>
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
    </section>
  );
}

export default Users;
