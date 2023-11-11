import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import db, { storage } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import "../css/style.css";

function LeftUserProfile() {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const [pPRef, setPPRef] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: actionTypes.REMOVE_USER,
          user: null,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  (async () => {
    try {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      const img = docSnap.data().profilePic;
      getDownloadURL(ref(storage, `userImages/${img}`))
        .then((url) => {
          setPPRef(url);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.error(e);
    }
  })();
  return (
    <div className="leftUser">
      <Link className="leftUser__header" to="/app">
        <ArrowBackIosNewIcon fontSize="large" />
        <Avatar
          className="leftUser__header__profilePic"
          src={pPRef}
          alt="user-avatar"
        />
      </Link>

      <div className="leftUser__body">
        <Link
          className={`leftUser__link${
            window.location.pathname === "/app/user-profile/edit-profile"
              ? "--active"
              : ""
          }`}
          to="/app/user-profile/edit-profile"
        >
          Edit profile
        </Link>
        <Link
          className={`leftUser__link${
            window.location.pathname === "/app/user-profile/settings"
              ? "--active"
              : ""
          }`}
          to="/app/user-profile/settings"
        >
          Settings
        </Link>
        <div className={`leftUser__link`} onClick={handleOpen}>
          Log out
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal"
        >
          <Box className="modal__container">
            <h1 className="modal__title">
              Are you sure you want to log out of Muffin?
            </h1>
            <Button className="modal__btn--so" onClick={handleLogout}>
              Log Out
            </Button>
            <Button className="modal__btn--cl" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default LeftUserProfile;
