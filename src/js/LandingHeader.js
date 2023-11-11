import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logoPink from "../img/logo-pink-small-2x.png";

function LandingHeader() {
  return (
    <div className="landing__header">
      <img src={logoPink} alt="logo" />
      <div className="landing__nav">
        <Link className="landing__nav__link" to="/">
          <Button
            className={
              window.location.pathname === "/"
                ? `landing__nav--active`
                : "landing__nav--inactive"
            }
          >
            HOME
          </Button>
        </Link>
        <Link className="landing__nav__link" to="/about">
          <Button
            className={
              window.location.pathname === "/about"
                ? `landing__nav--active`
                : "landing__nav--inactive"
            }
          >
            ABOUT
          </Button>
        </Link>
        <Link className="landing__nav__link" to="/contact">
          <Button
            className={
              window.location.pathname === "/contact"
                ? `landing__nav--active`
                : "landing__nav--inactive"
            }
          >
            CONTACT
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default LandingHeader;
