import React, { useEffect, useState } from "react";
import "../css/style.css";
// import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import { Avatar, IconButton } from "@mui/material";
// import user from "../img/test/test-user.jpg";
import { Link } from "react-router-dom";
import {
  doc,
  onSnapshot,
  getDoc,
  query,
  collection,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import db, { storage } from "./firebase";
import { useStateValue } from "./StateProvider";

function Header({ restoIcon }) {
  const [{ user }, dispatch] = useStateValue();
  const [pPRef, setPPRef] = useState(null);
  const [user_name, setUser_name] = useState("");
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    async function updateGeneration() {}
    (async () => {
      try {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        const img = docSnap.data().profilePic;
        setUser_name(capitalizeFirstLetter(docSnap.data().name.split(" ")[0]));
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
  }, []);
  console.log(user);
  return (
    <div className="header">
      <Link to="/app/user-profile/edit-profile">
        <div className="header__userProfile">
          <Avatar className="user__profilePic" src={pPRef} alt={user_name} />
          <div className="user__name">{user_name}</div>
        </div>
      </Link>
      {window.location.pathname.startsWith("/app/chat/") ? (
        <div className="header__icons">
          <Link to="/app">
            <IconButton className="header__icon">
              <FavoriteIcon fontSize="large" />
            </IconButton>
          </Link>
          <Link to="/app/restaurants">
            <IconButton className="header__icon">
              <RamenDiningIcon fontSize="large" />
            </IconButton>
          </Link>
        </div>
      ) : (
        <Link to={restoIcon === "/" ? "/app" : "/app/restaurants"}>
          <IconButton className="header__icon">
            {restoIcon === "/" ? (
              <FavoriteIcon fontSize="large" />
            ) : (
              <RamenDiningIcon fontSize="large" />
            )}
          </IconButton>
        </Link>
      )}
    </div>
  );
}

export default Header;
