import React from "react";

function User({ user, deleteUser, userIndex }) {
  const handleDelete = (id, event) => {
    event.preventDefault();
    deleteUser(id);
  };

  return (
    <li className="user">
      <img src={user.avatar} alt={user.first_name} />
      <p>{`${user.first_name}  ${user.last_name}`}</p>
      <p>{user.id}</p>

      <button
        className="btn delete"
        onClick={event => handleDelete(userIndex, event)}
      >
        Delete
      </button>
      <hr />
    </li>
  );
}

export default User;
