import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import useFormFields from "../hooks/useFormFields";
import "../styles/components/login.scss";

const initialFormState = {
  email: "",
  password: ""
};

function Login({ receiveAuth, receiveLoginState }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const [form, handleChange, resetForm] = useFormFields(initialFormState);

  const postLoginData = async () => {
    setLoading(true);
    let success = false;
    try {
      const response = await axios.post(`https://reqres.in/api/login`, form);
      receiveAuth(response.data.token);
      resetForm();
      setLoading(false);
      success = true;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
    if (success) {
      receiveLoginState(true);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    setSubmitted(true);
    if (!(form.email && form.password)) {
      return;
    }
    postLoginData();
  };

  return (
    <>
      <header>
        <h2 className="Login__title">Log in</h2>
      </header>

      <form className="LoginForm" onSubmit={handleSubmit}>
        <fieldset className="LoginForm__fieldset">
          <legend className="show-for-sr">Sign in to your account</legend>
          {error && (
            <p className="Login__error">
              Oops: {error.response.data.error}. Please try again.
            </p>
          )}

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
              <span className="LoginForm__input-error">
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
              <span className="LoginForm__input-error">
                Please enter a password.
              </span>
            )}
          </p>
          <button className="BtnCommon BtnCommon--dark" disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin" />
                loading...
              </>
            ) : (
              "Login"
            )}
          </button>
        </fieldset>
      </form>
    </>
  );
}

Login.propTypes = {
  receiveAuth: PropTypes.func.isRequired,
  receiveLoginState: PropTypes.func.isRequired
};

export default Login;
