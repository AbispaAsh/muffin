import React from "react";
import "../css/style.css";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { IconButton, Tooltip } from "@mui/material";

function SwipeButtons() {
  return (
    <div className="swipeButtons">
      <p className="swipeButtons__report">
        <FlagOutlinedIcon />
        Block &amp; report
      </p>
      <div className="swipeButtons__swipe">
        <IconButton className="swipeButtons__left">
          <CloseIcon />
        </IconButton>
        <IconButton className="swipeButtons__right">
          <FavoriteIcon />
        </IconButton>
      </div>
      <div className="swipeButtons__instruction">
        <Tooltip title={<h2>Skip</h2>} arrow>
          <ArrowLeftIcon />
        </Tooltip>
        <Tooltip title={<h2>Scroll down</h2>} arrow>
          <ArrowDropUpIcon />
        </Tooltip>
        <Tooltip title={<h2>Scroll up</h2>} arrow>
          <ArrowDropDownIcon />
        </Tooltip>
        <Tooltip title={<h2>Skip</h2>} arrow>
          <ArrowRightIcon />
        </Tooltip>
      </div>
    </div>
  );
}

export default SwipeButtons;
