import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound__container">
        <h3 className="notfound__header">Oops! Something went wrong.</h3>
        <p className="notfound__message">
          We’re sorry, but we can’t find the page you were looking for.
        </p>
        <Link to="/">
          <Button className="notfound__cta">Back to Homepage</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
