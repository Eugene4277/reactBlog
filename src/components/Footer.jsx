import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <nav className="navbar fixed-bottom  footer">
      <span>
        Made with
        <Link className="footer-link" to="https://reactjs.org/">
          ReactJs
        </Link>
        by
        <Link className="footer-link" to="https://github.com/Eugene4277">
          Eugene
        </Link>
      </span>
    </nav>
  );
}

export default Footer;
