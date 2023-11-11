import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  MobileStepper,
  Select,
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import Logo from "../img/logo-pink-small-2x.png";
import { Timestamp } from "firebase/firestore";

function FormUserAge(props) {
  const [btnAble, setBtnAble] = useState(true);
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();
  const [days, setDays] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ]);
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const years = [];
  for (let i = 0; i < 62; i++) {
    years.push(Timestamp.now().toDate().getFullYear() - 18 - i);
  }
  const [activeStep, setActiveStep] = useState(props.step - 1);
  const handleBack = () => {
    props.prevStep();
  };
  const cont = () => {
    props.nextStep();
  };
  const handleChange1 = (e) => {
    setValue1(e.target.value);
    if (e.target.value) {
      const myDate = new Date(
        value3,
        value2,
        e.target.value > 9 ? e.target.value : `0${e.target.value}`
      );
      const v =
        (Timestamp.now().toDate() - myDate) / (1000 * 60 * 60 * 24 * 365.25);
      if (v > 18) {
        props.values.dob = Timestamp.fromDate(myDate);
        props.handleChange("dob", Timestamp.fromDate(myDate));
        setBtnAble(false);
      } else {
        setBtnAble(true);
      }
    }
  };
  const handleChange2 = (e) => {
    setValue2(e.target.value);
    if (e.target.value) {
      const myDate = new Date(
        value3,
        e.target.value,
        value1 > 9 ? value1 : `0${value1}`
      );
      const v =
        (Timestamp.now().toDate() - myDate) / (1000 * 60 * 60 * 24 * 365.25);
      if (v > 18) {
        props.values.dob = Timestamp.fromDate(myDate);
        props.handleChange("dob", Timestamp.fromDate(myDate));
        setBtnAble(false);
      } else {
        setBtnAble(true);
      }
    }
  };
  const handleChange3 = (e) => {
    setValue3(e.target.value);
    if (e.target.value) {
      const myDate = new Date(
        e.target.value,
        value2,
        value1 > 9 ? value1 : `0${value1}`
      );
      const v =
        (Timestamp.now().toDate() - myDate) / (1000 * 60 * 60 * 24 * 365.25);
      if (v > 18) {
        props.values.dob = Timestamp.fromDate(myDate);
        props.handleChange("dob", Timestamp.fromDate(myDate));
        setBtnAble(false);
      } else {
        setBtnAble(true);
      }
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
          <h2>{`Hey ${props.values.name}! When's your birthday?`}</h2>
          <div className="signUp__datePicker">
            <Box sx={{ width: 80 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Day</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value1}
                  label="Day"
                  onChange={handleChange1}
                >
                  {days.map((d) => (
                    <MenuItem value={d}>{d}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Month</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value2}
                  label="Month"
                  onChange={handleChange2}
                >
                  <MenuItem value={0}>January</MenuItem>
                  <MenuItem value={1}>February</MenuItem>
                  <MenuItem value={2}>March</MenuItem>
                  <MenuItem value={3}>April</MenuItem>
                  <MenuItem value={4}>May</MenuItem>
                  <MenuItem value={5}>June</MenuItem>
                  <MenuItem value={6}>July</MenuItem>
                  <MenuItem value={7}>August</MenuItem>
                  <MenuItem value={8}>September</MenuItem>
                  <MenuItem value={9}>October</MenuItem>
                  <MenuItem value={10}>Novemeber</MenuItem>
                  <MenuItem value={11}>December</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 100 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value3}
                  label="Year"
                  onChange={handleChange3}
                >
                  {years.map((y) => (
                    <MenuItem value={y}>{y}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <p>You must be at least 18 years old to use Muffin</p>
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

export default FormUserAge;
