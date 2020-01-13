import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    setSubmitted(true);
    if (!(form.email && form.password)) {
      return;
    }
    try {
      const response = await axios.post(`https://reqres.in/api/register`, form);
      receiveRegisterState(true);

      setForm(initialFormState);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
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
    <div
      style={{
        textAlign: "center"
      }}
    >
      <h2>Register</h2>
      {error && (
        <p className="displayError">
          {error.response.data.error} ({error.message})
        </p>
      )}

      <form
        className="RegistrationForm"
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center"
        }}
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend>Register for a new account</legend>
          <p>
            <label htmlFor="registration-email">Email address</label>
            <input
              type="email"
              placeholder="eve.holt@reqres.in"
              name="email"
              onChange={handleChange}
              value={form.email}
              className="RegistrationForm__input"
              id="registration-email"
            />
            {submitted && !form.email && (
              <span className="RegistrationForm__input-error --error-email">
                Please enter your email address.
              </span>
            )}
          </p>
          <p>
            <label htmlFor="registration-password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={form.password}
              autoComplete="new password"
              className="RegistrationForm__input"
              id="registration-password"
            />
            {submitted && !form.password && (
              <span className="RegistrationForm__input-error --error-email">
                Please enter a password.
              </span>
            )}
          </p>
          <p>
            <label htmlFor="registration-repeat-password">
              Confirm password
            </label>
            <input
              type="password"
              placeholder="Password"
              name="passwordRepeat"
              onChange={handleRepeatPassword}
              value={repeatP}
              autoComplete="repeat password"
              className="RegistrationForm__input"
              id="registrtation-repeat-password"
            />
            {submitted && !repeatP && (
              <span className="RegistrationForm__input-error --error-password">
                Please repeat password.
              </span>
            )}
            {submitted && repeatP !== form.password && (
              <span className="RegistrationForm__input-error --error-repeat-password">
                Passwords don't match
              </span>
            )}
          </p>

          <button className="RegistrationForm__btn" disabled={loading}>
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
        <p>Already have an account? Login</p>
      </form>
    </div>
  );
}

export default Register;
