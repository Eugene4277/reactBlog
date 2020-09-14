import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import _ from "lodash";
import { UserContext } from "../context/user/userContext";
import Loader from "../components/Loader";

function Login(props) {
  const user = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isDisabled = email && password ? false : true;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      user.login(email.trim(), password.trim());

      setEmail("");
      setPassword("");
      props.history.goBack();
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
          <p>
            Don't have an account?{" "}
            <b>
              <Link to="/signup">Sign Up</Link>
            </b>
          </p>

          <button
            type="submit"
            disabled={isDisabled}
            className="btn btn-success"
          >
            Sign In
          </button>
        </form>
      )}
    </>
  );
}

export default Login;
