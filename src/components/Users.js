import React from "react";
import PropTypes from "prop-types";

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

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteUser: PropTypes.func.isRequired
};

export default Users;
