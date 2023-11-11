import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MobileStepper,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import Logo from "../img/logo-pink-small-2x.png";
import { red } from "@mui/material/colors";

function FormUserGender(props) {
  const [btnAble, setBtnAble] = useState(props.values.name.length === 0);
  const [value, setValue] = useState(props.values.gender);
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
    props.handleChange("gender", e.target.value);
    props.values.gender = e.target.value;
    if (e.target.value.length > 0) {
      setBtnAble(false);
    } else {
      setBtnAble(true);
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
          <h2>And how do you identify?</h2>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Woman"
                control={
                  <Radio
                    sx={{
                      color: red[500],
                      "&.Mui-checked": {
                        color: red[500],
                      },
                    }}
                  />
                }
                label={
                  <p style={{ fontSize: "1.6rem", marginRight: "2rem" }}>
                    Woman
                  </p>
                }
                sx={{
                  border: "1px solid #dcdcdc",
                  paddingRight: "15rem",
                  marginLeft: "1.5rem",
                  marginTop: "1.5rem",
                  alignSelf: "center",
                  borderRadius: "10px",
                }}
              />
              <FormControlLabel
                value="Man"
                control={
                  <Radio
                    sx={{
                      color: red[500],
                      "&.Mui-checked": {
                        color: red[500],
                      },
                    }}
                  />
                }
                label={
                  <p style={{ fontSize: "1.6rem", marginRight: "4.4rem" }}>
                    Man
                  </p>
                }
                sx={{
                  border: "1px solid #dcdcdc",
                  paddingRight: "15rem",
                  marginLeft: "1.5rem",
                  marginTop: "1.5rem",

                  alignSelf: "center",
                  borderRadius: "10px",
                }}
              />
            </RadioGroup>
          </FormControl>
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

export default FormUserGender;
