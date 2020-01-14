import React, { useState } from "react";
import axios from "axios";
import cx from "classnames";

import "../styles/components/adduser.scss";

const initialFormState = {
  first_name: "",
  last_name: "",
  avatar: ""
};

function AddUser({ receiveNewUser }) {
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(false);

  const postAddUserData = async () => {
    setLoading(true);
    let success = false;
    try {
      const response = await axios.post(`https://reqres.in/api/users`, form);
      setUserName(response.data.first_name);
      receiveNewUser(response.data);
      setForm(initialFormState);
      setLoading(false);
      setSubmitted(false);
      success = true;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
    if (success) {
      setClicked(!clicked);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    setSubmitted(true);
    if (!(form.first_name && form.last_name && form.avatar)) {
      return;
    }
    postAddUserData();
  };

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleClick = event => setClicked(!clicked);

  const showForm = cx("AddUserForm", {
    "AddUserForm--open": clicked,
    "AddUserForm--closed": !clicked
  });

  return (
    <section className="AddUser">
      <header className="AddUser__header">
        <h2 onClick={handleClick} className="AddUser__title">
          Add New User
          {!clicked ? (
            <i className="fas fa-plus-circle"></i>
          ) : (
            <i className="fas fa-minus-circle"></i>
          )}
        </h2>
      </header>

      {error && <p className="AddUser__error">{error.message}</p>}

      {userName && (
        <div className="AddUser__notice">
          {userName} has been given a Parklife.
        </div>
      )}
      <form className={showForm} onSubmit={handleSubmit}>
        <fieldset className="AddUserForm__fieldset">
          <legend className="show-for-sr">Sign in to your account</legend>
          <p>
            <a
              target="_blank"
              href="https://vinicius73.github.io/gravatar-url-generator/#/"
            >
              Generate an avatar
            </a>
          </p>
          <p>
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              onChange={handleChange}
              value={form.first_name}
              className="AddUserForm__input"
            />
            {submitted && !form.first_name && (
              <span className="AddUserForm__input-error">
                Please enter user's first name.
              </span>
            )}
          </p>
          <p>
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              onChange={handleChange}
              value={form.last_name}
              className="AddUserForm__input"
            />
            {submitted && !form.last_name && (
              <span className="AddUserForm__input-error">
                Please enter user's first name.
              </span>
            )}
          </p>
          <p>
            <input
              type="text"
              placeholder="Avatar Url: https:etc"
              name="avatar"
              onChange={handleChange}
              value={form.avatar}
              className="AddUserForm__input"
            />
          </p>
          <button className="BtnCommon BtnCommon--dark" disabled={loading}>
            {loading && !error ? (
              <>
                <i className="fas fa-spinner fa-spin" />
                loading...
              </>
            ) : (
              "Add User"
            )}
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default AddUser;
