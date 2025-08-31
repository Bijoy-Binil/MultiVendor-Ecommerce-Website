import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar- bg-info">
        {" "}
        <div className="container">
          {" "}
          <Link className="navbar-brand" to="/">
            {" "}
            Optimus store{" "}
          </Link>{" "}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {" "}
            <span className="navbar-toggler-icon"></span>{" "}
          </button>{" "}
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            {" "}
            <ul className="navbar-nav ms-auto">
              {" "}
              <li className="nav-item">
                {" "}
                <Link className="nav-link active" aria-current="page" to="/">
                  {" "}
                  Home{" "}
                </Link>{" "}
              </li>{" "}
              <li className="nav-item">
                {" "}
                <a className="nav-link active" href="#">
                  {" "}
                  Categories{" "}
                </a>{" "}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
        </div>{" "}
      </nav>
    </>
  );
};

export default Header;
