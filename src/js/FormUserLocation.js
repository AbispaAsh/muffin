import { Button, MobileStepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Logo from "../img/logo-pink-small-2x.png";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import "@geocodeearth/autocomplete-element";

function FormUserLocation(props) {
  const [btnAble, setBtnAble] = useState(true);
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
  const valueSetter = (v, x) => {
    props.values.livesIn = v;
    props.values.livesInLoc = [x[1], x[0]];
    props.handleChange("livesIn", v);
    props.handleChange("livesInLoc", [x[1], x[0]]);
    setBtnAble(false);
  };
  useEffect(() => {
    const el = document.querySelector("ge-autocomplete");
    el.addEventListener("select", ({ detail, currentTarget }) => {
      valueSetter(detail.properties.label, detail.geometry.coordinates);
    });

    return () => {
      el.removeEventListener("select", ({ detail, currentTarget }) => {
        console.log("change", currentTarget);
        console.log(detail);
      });
    };
  }, []);
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
          <h2>We need a location to show you people nearby</h2>
          <ge-autocomplete
            style={{ width: "70%", marginTop: "2rem" }}
            api_key="ge-49164db40a81bfce"
          ></ge-autocomplete>
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

export default FormUserLocation;
