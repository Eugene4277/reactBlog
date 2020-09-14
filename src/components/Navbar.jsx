import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { UserContext } from "../context/user/userContext";

function Navbar(props) {
  const { user } = useContext(UserContext);
  const linksRender = _.isEmpty(user.payload);
  let displayName = null;
  if (!linksRender) displayName = user.payload.email.split("@")[0];

  return (
    <nav
      className="navbar navbar-dark navbar-expand-md fixed-top"
      style={{ backgroundColor: "#0d66e9" }}
    >
      <NavLink className="navbar-brand" to="/" exact>
        React Blog
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav  mr-auto">
          <NavLink className="nav-link" to="/" exact>
            Home
          </NavLink>
          <NavLink className="nav-link" to="/posts">
            Posts
          </NavLink>
        </div>
        {linksRender ? (
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/signin">
              Sign in
            </NavLink>
            <NavLink className="nav-link" to="/signup">
              Sign up
            </NavLink>
          </div>
        ) : (
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/profile">
              {displayName}
            </NavLink>
            <NavLink className="nav-link" to="/logout">
              Logout
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
