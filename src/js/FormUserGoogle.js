import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../img/logo-pink-small-2x.png";
import db, { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

function FormUserGoogle(props) {
  const [{}, dispatch] = useStateValue();
  const navigate = useNavigate();

  const cont = () => {
    props.nextStep();
  };

  const signUp = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        async function checkUser() {
          const adminRef = doc(db, "users", "admin");
          const adminSnap = await getDoc(adminRef);
          if (!adminSnap.data().allUsers.includes(result.user.uid)) {
            // navigate("/sign-up");
            props.handleChange(result.user);
            props.values.user = result.user;
            console.log(props.values.user);
            cont();
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
    <div className="signUp">
      <img className="signUp__logo" src={Logo} alt="place" />
      <div className="signUp__action">
        <h1>Welcome! Let's get you started!</h1>
        <Button type="submit" onClick={signUp}>
          <img
            className="login__logo-signin"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/240px-Google_%22G%22_Logo.svg.png"
            alt="Google-signin"
          />
          Sign up with Google
        </Button>
      </div>
    </div>
  );
}

export default FormUserGoogle;
