import React from "react";
import "../css/style.css";
import Header from "./Header";
import Chats from "./Chats";
import Search from "./Search";

function LeftApp() {
  const headerIcon = HeaderIconDecider();
  return (
    <div className="left">
      <Header restoIcon={headerIcon} />
      <h2 style={{ marginLeft: "2rem", color: "#555", alignSelf: "center" }}>
        Chats
      </h2>
      <Chats />
    </div>
  );
}

function HeaderIconDecider() {
  if (window.location.pathname === "/app/restaurants") {
    return "/";
  } else if (window.location.pathname === "/app") {
    return "";
  }
}

export default LeftApp;
