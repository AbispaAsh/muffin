import React from "react";
import logoWhite from "../img/logo-white-small-2x.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

function LandingFooter() {
  return (
    <div className="landing__footer">
      <img src={logoWhite} alt="logo" />
      <div className="landing__socials">
        <FacebookIcon />
        <TwitterIcon />
        <InstagramIcon />
      </div>
      <div className="landing__copy">&copy; 2022 Muffin</div>
    </div>
  );
}

export default LandingFooter;
