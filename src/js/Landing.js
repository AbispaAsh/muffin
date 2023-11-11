import React, { useEffect, Component } from "react";
// import "../css/landing.css";
import logoPink from "../img/logo-pink-small-2x.png";
import logoWhite from "../img/logo-white-small-2x.png";
import adImage from "../img/dffd.jpg";
// import jquery from "./jquery";

import styled, { css } from "styled-components";

import LandingHeader from "./LandingHeader";
import LandingBody from "./LandingBody";
import LandingFooter from "./LandingFooter";

function Landing(props) {
  return (
    <div className="landing">
      <LandingHeader />
      <LandingBody />
      <LandingFooter />
    </div>
  );
}

export default Landing;
