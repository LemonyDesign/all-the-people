import React, { useState } from "react";
import axios from "axios";

const initialFormState = {
  email: "",
  password: ""
};

function Login({ receiveAuth, receiveLoginState }) {
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const postLoginData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`https://reqres.in/api/login`, form);
      receiveAuth(response.data.token);
      receiveLoginState(true);

      // clear
      setForm(initialFormState);
      setLoading(false);
    } catch (err) {
      setError(err);
      setForm(initialFormState);
      setLoading(false);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    // for basic validation
    setSubmitted(true);
    if (!(form.email && form.password)) {
      return;
    }
    postLoginData();
  };

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div
      style={{
        textAlign: "center"
      }}
    >
      <h2>Login</h2>
      {error && <p className="displayError">({error.message})</p>}

      <form
        className="LoginForm"
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center"
        }}
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend>Sign in to your account</legend>
          <p>
            <label htmlFor="login-email">Email address</label>
            <input
              type="email"
              placeholder="eve.holt@reqres.in"
              name="email"
              onChange={handleChange}
              value={form.email}
              className="LoginForm__input"
              id="login-email"
            />
            {submitted && !form.email && (
              <span className="LoginForm__input-error --error-email">
                Please enter your email address.
              </span>
            )}
          </p>
          <p>
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={form.password}
              autoComplete="new password"
              className="LoginForm__input"
              id="login-password"
            />
            {submitted && !form.password && (
              <span className="LoginForm__input-error --error-email">
                Please enter a password.
              </span>
            )}
          </p>
          <button className="LoginForm__btn" disabled={loading}>
            {loading && !error ? (
              <>
                <i className="fas fa-spinner fa-spin" />
                loading...
              </>
            ) : (
              "Login"
            )}
          </button>
        </fieldset>
        <p>Don't have an account? Register</p>
      </form>
    </div>
  );
}

export default Login;

/*
 *
 * THIS IS BEFORE REFACTOR
 *
 */
// const handleSubmit = async event => {
//   event.preventDefault();
//   setLoading(true);

//   // for basic validation
//   setSubmitted(true);
//   if (!(form.email && form.password)) {
//     return;
//   }
//   try {
//     const response = await axios.post(`https://reqres.in/api/login`, form);
//     receiveAuth(response.data.token);
//     receiveLoginState(true);

//     // clear
//     setForm(initialFormState);
//     setLoading(false);
//   } catch (err) {
//     setError(err);
//     setForm(initialFormState);
//     setLoading(false);
//   }
// };
