import { Button, IconButton, MobileStepper } from "@mui/material";
import React, { useEffect, useReducer, useRef, useState } from "react";
import Logo from "../img/logo-pink-small-2x.png";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import AddIcon from "@mui/icons-material/Add";

function FormUserImages(props) {
  const [btnAble, setBtnAble] = useState(props.values.images.length === 0);
  const [value, setValue] = useState(props.values.images);
  const [activeStep, setActiveStep] = useState(props.step - 1);
  const [imgs, setImgs] = useState([]);
  const uploadInputRef = useRef(null);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handleBack = () => {
    props.prevStep();
  };
  const cont = () => {
    props.nextStep();
  };
  for (let i = 0; i < props.values.images.length; i++) {
    let img = new Image();
    let imgWidth, imgHeight;
    img.src = window.URL.createObjectURL(value[i]);
    img.onload = () => {
      imgWidth = img.width;
      imgHeight = img.height;
      if (imgWidth >= 500 && imgHeight >= 500) {
        imgs.push(img.src);
        window.URL.revokeObjectURL(value[i]);
      }
    };
  }
  const onChange = (e) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      let img = new Image();
      let imgWidth, imgHeight;
      img.src = window.URL.createObjectURL(files[i]);
      img.onload = () => {
        imgWidth = img.width;
        imgHeight = img.height;
        if (imgWidth >= 500 && imgHeight >= 500) {
          imgs.push(img.src);
          value.push(files[i]);
          window.URL.revokeObjectURL(files[i]);
        }
      };
    }

    props.handleChange("images", value);
    props.values.images = value;
    props.nextStep();
  };
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
          <h2>Good start, {props.values.name}</h2>
          <h3
            style={{ width: "40rem", textAlign: "center", marginTop: "1rem" }}
          >
            In our experience, profiles with at least six photos are more
            popular, so uploading some mor now will increase your chances.
          </h3>
          <div className="signUp__imagesContainer">
            <div className="signUp__image">
              {imgs[0] ? (
                <img
                  src={imgs[0]}
                  alt="userImage"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <IconButton
                  onClick={() =>
                    uploadInputRef.current && uploadInputRef.current.click()
                  }
                >
                  <AddIcon />
                  <input
                    id="upload"
                    ref={uploadInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    multiple="multiple"
                    hidden
                  />
                </IconButton>
              )}
            </div>
            <div className="signUp__image">
              {imgs[1] ? (
                <img
                  src={imgs[1]}
                  alt="userImage"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <IconButton
                  onClick={() =>
                    uploadInputRef.current && uploadInputRef.current.click()
                  }
                >
                  <AddIcon />
                  <input
                    id="upload"
                    ref={uploadInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    multiple="multiple"
                    hidden
                  />
                </IconButton>
              )}
            </div>
            <div className="signUp__image">
              {imgs[2] ? (
                <img
                  src={imgs[2]}
                  alt="userImage"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <IconButton
                  onClick={() =>
                    uploadInputRef.current && uploadInputRef.current.click()
                  }
                >
                  <AddIcon />
                  <input
                    id="upload"
                    ref={uploadInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    multiple="multiple"
                    hidden
                  />
                </IconButton>
              )}
            </div>
            <div className="signUp__image">
              {imgs[3] ? (
                <img
                  src={imgs[3]}
                  alt="userImage"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <IconButton
                  onClick={() =>
                    uploadInputRef.current && uploadInputRef.current.click()
                  }
                >
                  <AddIcon />
                  <input
                    id="upload"
                    ref={uploadInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    multiple="multiple"
                    hidden
                  />
                </IconButton>
              )}
            </div>
            <div className="signUp__image">
              {imgs[4] ? (
                <img
                  src={imgs[4]}
                  alt="userImage"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <IconButton
                  onClick={() =>
                    uploadInputRef.current && uploadInputRef.current.click()
                  }
                >
                  <AddIcon />
                  <input
                    id="upload"
                    ref={uploadInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    multiple="multiple"
                    hidden
                  />
                </IconButton>
              )}
            </div>
            <div className="signUp__image">
              {imgs[5] ? (
                <img
                  src={imgs[5]}
                  alt="userImage"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <IconButton
                  onClick={() =>
                    uploadInputRef.current && uploadInputRef.current.click()
                  }
                >
                  <AddIcon />
                  <input
                    id="upload"
                    ref={uploadInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    multiple="multiple"
                    hidden
                  />
                </IconButton>
              )}
            </div>
          </div>
          <p>We accept JPGs and PNGs of at least 500x500px</p>
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

export default FormUserImages;
