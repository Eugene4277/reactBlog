import React from "react";
import { Link, withRouter } from "react-router-dom";

function Breadcrumbs(props) {
  const {
    location: { pathname },
  } = props;
  const pathnames = pathname.split("/").filter((p) => p);
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {pathnames.length > 0 ? (
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
        ) : (
          <li className="breadcrumb-item active">
            <span>Home</span>
          </li>
        )}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index - 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const dispalyLink = name[0].toUpperCase() + name.slice(1);
          return isLast ? (
            <li key={name} className="breadcrumb-item active">
              <span>{dispalyLink}</span>
            </li>
          ) : (
            <li key={name} className="breadcrumb-item">
              <Link to={routeTo}>{dispalyLink}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default withRouter(Breadcrumbs);
