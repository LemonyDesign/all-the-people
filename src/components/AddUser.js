import React, { useState } from "react";
import axios from "axios";

const initialFormState = {
  first_name: "",
  last_name: "",
  avatar: ""
};

function AddUser({ receiveNewUser }) {
  const [form, setForm] = useState(initialFormState);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post(`https://reqres.in/api/users`, form);
      setUserName(response.data.first_name);
      receiveNewUser(response.data);

      // clear
      setForm(initialFormState);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div
      style={{
        textAlign: "center"
      }}
    >
      <h2>Add New User</h2>
      <p>
        Generate your avatar at{" "}
        <a href="https://vinicius73.github.io/gravatar-url-generator/#/">
          Generator
        </a>
      </p>
      {error && <div className="displayError">{error.message}</div>}

      {userName && (
        <div className="responseMessage">
          A new user {userName} has been added.
        </div>
      )}

      <form
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center"
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="First Name"
          name="first_name"
          onChange={handleChange}
          value={form.first_name}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="last_name"
          onChange={handleChange}
          value={form.last_name}
        />
        <input
          type="text"
          placeholder="Avatar Url"
          name="avatar"
          onChange={handleChange}
          value={form.avatar}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddUser;
