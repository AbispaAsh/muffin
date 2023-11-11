import { Button, MobileStepper } from "@mui/material";
import React, { useState } from "react";
import Logo from "../img/logo-pink-small-2x.png";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

function FormUserName(props) {
  const [btnAble, setBtnAble] = useState(props.values.name.length === 0);
  const [value, setValue] = useState(props.values.name);
  const [activeStep, setActiveStep] = useState(props.step - 1);
  const handleBack = () => {
    props.prevStep();
  };
  const cont = () => {
    props.nextStep();
  };
  //   if (props.values.name.length > 0) {
  //     setBtnAble(false);
  //   }
  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value.length > 0) {
      setBtnAble(true);
    } else {
      setBtnAble(false);
    }
  };
  return (
    <div>
      <div className="signUp">
        <img className="signUp__logo" src={Logo} alt="place" />
        <div className="signUp__continue">
          <MobileStepper
            variant="dots"
            steps={6}
            position="static"
            activeStep={activeStep}
            sx={{
              maxWidth: 400,
              margin: "4rem",
              marginLeft: "0rem",
              marginRight: "15rem",
            }}
            backButton={
              <Button
                size="small"
                onClick={() => handleBack()}
                disabled={activeStep === 0}
                sx={{ marginRight: "8rem" }}
              >
                <KeyboardArrowLeft />
              </Button>
            }
          />
          <h2>Nice one! So, what do you like to be called?</h2>
          <input
            type="text"
            name="text"
            placeholder="Your name"
            onChange={(e) => {
              setValue(e.target.value);
              props.handleChange("name", e.target.value);
              if (e.target.value.length > 0) {
                setBtnAble(false);
              } else {
                setBtnAble(true);
              }
            }}
            value={value}
          />
          <p>This is how you'll appear on Muffin</p>
          <Button
            className={`signUp__continue__button ${
              btnAble ? "signUp__continue__disable" : ""
            }`}
            type="submit"
            disabled={btnAble}
            onClick={cont}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FormUserName;
