import React from "react";
import PropTypes from "prop-types";

import "../styles/components/user.scss";

function User({ user, deleteUser, userIndex }) {
  const handleDelete = (id, event) => {
    event.preventDefault();
    deleteUser(id);
  };

  const greetings = [
    "Hey",
    "Wotcha",
    "Hiya",
    "Areet?",
    "How do?",
    "Ayup!",
    "What's cooking?",
    "Howzit?"
  ];

  let greeting = greetings[Math.floor(Math.random() * greetings.length)];

  return (
    <li className="UserComponent">
      <div className="User">
        <figure className="User__figure">
          <img
            className="User__image"
            src={user.avatar}
            alt={user.first_name}
          />
        </figure>
        <h2 className="User__greeting">{greeting}</h2>
        <p className="User__title">{`${user.first_name}  ${user.last_name}`}</p>
        <p className="User__id">Parklife Id: {user.id}</p>
        <button
          className="BtnCommon BtnCommon--bordered"
          onClick={event => handleDelete(userIndex, event)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
  userIndex: PropTypes.number.isRequired
};

export default User;
