import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { signInWithPopup } from "firebase/auth";
import "../css/style.css";
import Logo from "../img/logo-pink-2x.png";
import db, { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import { doc, getDoc } from "firebase/firestore";

function Login() {
  const [{}, dispatch] = useStateValue();
  const navigate = useNavigate();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        async function checkUser() {
          const adminRef = doc(db, "users", "admin");
          const adminSnap = await getDoc(adminRef);
          if (!adminSnap.data().allUsers.includes(result.user.uid)) {
            navigate("/sign-up");
          } else {
            dispatch({
              type: actionTypes.SET_USER,
              user: result.user,
            });
            navigate("/app");
          }
        }
        checkUser();
      })
      .catch((error) => console.error(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img className="login__logo" src={Logo} alt="Muffin-logo" />
        </Link>
        <div className="login__text">
          <h1>Get Started</h1>
          <h1 className="login__divider">________________________________</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          <img
            className="login__logo-signin"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/240px-Google_%22G%22_Logo.svg.png"
            alt="Google-signin"
          />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
