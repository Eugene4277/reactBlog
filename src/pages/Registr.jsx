import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import _ from "lodash";
import { UserContext } from "../context/user/userContext";
import Loader from "../components/Loader";

function Registr(props) {
  const user = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const isDisabled = email && password && name ? false : true;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim() && name.trim()) {
      user.registration(email.trim(), password.trim(), name.trim());

      setEmail("");
      setPassword("");
      setName("");
    } else {
    }
  };

  if (!_.isEmpty(user.user)) return <Redirect to="/" />;
  return (
    <>
      {user.loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <p>
            Have an account?{" "}
            <b>
              <Link to="/signin">Sign In</Link>
            </b>
          </p>

          <button
            type="submit"
            disabled={isDisabled}
            className="btn btn-primary"
          >
            Sign Up
          </button>
        </form>
      )}
    </>
  );
}

export default Registr;
