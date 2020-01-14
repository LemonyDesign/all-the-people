import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/components/register.scss";

const initialFormState = {
  email: "",
  password: ""
};

function Register({ receiveRegisterState }) {
  const [form, setForm] = useState(initialFormState);
  const [repeatP, setRepeatP] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const postRegisterData = async () => {
    setLoading(true);
    let success = false;
    try {
      const response = await axios.post(`https://reqres.in/api/register`, form);
      setLoading(false);
      success = true;
    } catch (err) {
      setError(err);
      setSubmitted(false);
      setForm(initialFormState);
      setRepeatP("");
      setLoading(false);
    }
    if (success) {
      receiveRegisterState(true);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    setSubmitted(true);
    if (!(form.email && form.password) || form.password !== repeatP) {
      return;
    }
    postRegisterData();
  };

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };
  const handleRepeatPassword = event => {
    setRepeatP(event.target.value);
  };

  return (
    <>
      <header>
        <h2 className="Register__title">Register for a new account</h2>
      </header>

      <form className="RegisterForm" onSubmit={handleSubmit}>
        <fieldset className="RegisterForm__fieldset">
          <legend className="show-for-sr">Register for a new account</legend>
          {error && (
            <p className="Register__error">{error.response.data.error}</p>
          )}
          <p>
            <label htmlFor="Register-email">Email address</label>
            <input
              type="email"
              placeholder="eve.holt@reqres.in"
              name="email"
              onChange={handleChange}
              value={form.email}
              className="RegisterForm__input"
              id="Register-email"
            />
            {submitted && !form.email && (
              <span className="RegisterForm__input-error">
                Please enter your email address.
              </span>
            )}
          </p>
          <p>
            <label htmlFor="Register-password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={form.password}
              autoComplete="new password"
              className="RegisterForm__input"
              id="Register-password"
            />
            {submitted && !form.password && (
              <span className="RegisterForm__input-error">
                Please enter a password.
              </span>
            )}
          </p>
          <p>
            <label htmlFor="Register-repeat-password">Confirm password</label>
            <input
              type="password"
              placeholder="Password"
              name="passwordRepeat"
              onChange={handleRepeatPassword}
              value={repeatP}
              autoComplete="repeat password"
              className="RegisterForm__input"
              id="registrtation-repeat-password"
            />
            {submitted && !repeatP && (
              <span className="RegisterForm__input-error">
                Please repeat password.
              </span>
            )}
            {submitted && repeatP !== form.password && (
              <span className="RegisterForm__input-error">
                Passwords don't match
              </span>
            )}
          </p>

          <button className="BtnCommon" disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin" />
                loading...
              </>
            ) : (
              "Register"
            )}
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default Register;

/*
 *
 * THIS IS BEFORE REFACTOR
 *
 */

// const handleSubmit = async event => {
//   event.preventDefault();
//   setLoading(true);
//   setSubmitted(true);
//   if (!(form.email && form.password)) {
//     return;
//   }
//   let success = false;
//   try {
//     const response = await axios.post(`https://reqres.in/api/register`, form);
//     setForm(initialFormState);
//     setLoading(false);
//     success = true;
//   } catch (err) {
//     setError(err);
//     setLoading(false);
//   }
//   if (success) {
//     receiveRegisterState(true);
//   }
// };
