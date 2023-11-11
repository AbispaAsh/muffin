import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import "../css/style.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Modal,
  Slider,
} from "@mui/material";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { grey, red } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TransgenderIcon from "@mui/icons-material/Transgender";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EventIcon from "@mui/icons-material/Event";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import db, { storage } from "./firebase";

function UserSettings() {
  const [{ user }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const [curI, setCurI] = useState(0);
  const [tag, setTag] = useState([
    {
      func: GenderModal,
    },
    {
      func: AgeModal,
    },
    {
      func: DistanceModal,
    },
    {
      func: DeleteModal,
    },
  ]);
  const [infoTags, setInfoTags] = useState([
    {
      value: "Everyone",
    },
    {
      value: "",
    },
    {
      value: 0,
    },
  ]);
  const handleOpen = (ii, curii) => {
    setI(ii);
    setCurI(curii);
    setOpen(true);
    return;
  };
  const handleClose = () => setOpen(false);
  const modalSetValue = () => {
    const CustomTag = tag[i].func;
    return <CustomTag value={infoTags} close={handleClose} />;
  };
  const [generatedAgeStart, setGeneratedAgeStart] = useState(0);
  const [generatedAgeEnd, setGeneratedAgeEnd] = useState(0);
  const [generatedDistance, setGeneratedDistance] = useState(0);
  const [generatedGender, setGeneratedGender] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSnap = await getDoc(doc(db, "users", user.uid));
        const cardUser = userSnap.data();
        setGeneratedAgeEnd(cardUser.interestedInAgeEnd);
        setGeneratedAgeStart(cardUser.interestedInAgeStart);
        setGeneratedDistance(cardUser.interestedInDistance);
        setGeneratedGender(cardUser.interestedInGender);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setInfoTags([
      {
        value: generatedGender,
      },
      {
        value: `${generatedAgeStart}-${generatedAgeEnd}`,
      },
      {
        value: generatedDistance,
      },
    ]);
  }, [
    generatedGender,
    generatedDistance,
    generatedAgeEnd,
    generatedAgeStart,
    infoTags,
  ]);
  return (
    <div className="userEditProfile userSettings">
      <div className="userEditProfile__header">
        <div className="userEditProfile__header__title">Settings</div>
        <div className="userEditProfile__header__icons">
          <Link to="/app">
            <IconButton size="large">
              <CloseIcon
                fontSize="large"
                className="userEditProfile__header__icon"
              />
            </IconButton>
          </Link>
        </div>
      </div>
      <div className="userEditProfile__body">
        <Accordion className="userEditProfile__aboutMe">
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ fontSize: 24, color: grey[900] }} />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Filter
          </AccordionSummary>
          <AccordionDetails>
            <div className="userEditProfile__basicInfo-btns">
              <Button
                onClick={() => handleOpen(0)}
                className="userEditProfile__basicInfo-btn"
              >
                <div className="userEditProfile__basicInfo-btn-title">
                  {infoTags[0].value === "Woman" ? (
                    <FemaleIcon />
                  ) : infoTags[0].value === "Man" ? (
                    <MaleIcon />
                  ) : (
                    <TransgenderIcon />
                  )}
                  I'm interested in...
                </div>
                <div className="userEditProfile__basicInfo-btn-value">
                  {infoTags[0].value === "Woman"
                    ? `Women`
                    : infoTags[0].value === "Man"
                    ? `Men`
                    : infoTags[0].value}
                </div>
              </Button>
              <Button
                onClick={() => handleOpen(1)}
                className="userEditProfile__basicInfo-btn"
              >
                <div className="userEditProfile__basicInfo-btn-title">
                  <EventIcon />
                  Age
                </div>
                <div className="userEditProfile__basicInfo-btn-value">
                  {infoTags[1].value}
                </div>
              </Button>
              <Button
                onClick={() => handleOpen(2)}
                className="userEditProfile__basicInfo-btn"
              >
                <div className="userEditProfile__basicInfo-btn-title">
                  <SocialDistanceIcon />
                  Distance
                </div>
                <div className="userEditProfile__basicInfo-btn-value">
                  {infoTags[2].value === 161
                    ? "Whole Country"
                    : `${infoTags[2].value} km`}
                </div>
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
        <Button
          onClick={() => handleOpen(3)}
          className="userEditProfile__previewBtn"
        >
          Deactivate account
        </Button>
        <Modal
          open={open}
          // onClose={handleCloser}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal"
        >
          <Box className="modal__container">{modalSetValue()}</Box>
        </Modal>
      </div>
    </div>
  );
}

const GenderModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState(props.value[0].value);
  const valueSetter = (v) => {
    props.value[0].value = v;
    async function updateData() {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const adminRef = doc(db, "users", "admin");
      const adminSnap = await getDoc(adminRef);
      const userInterests = adminSnap.data().userInterests;
      userInterests[userSnap.data().adminI].genderInt = v;
      await updateDoc(userRef, {
        interestedInGender: v,
      });
      await updateDoc(adminRef, {
        userInterests: userInterests,
      });
      props.close();
    }
    updateData();
  };
  return (
    <div className="modal__tags">
      <TransgenderIcon />
      <h1 className="modal__tags__title">I'm interested in...</h1>
      <div className="modal__tags__buttons">
        <Button
          onClick={() => valueSetter("Man")}
          className={
            value === "Man"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Men
        </Button>
        <Button
          onClick={() => valueSetter("Woman")}
          className={
            value === "Woman"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Women
        </Button>
        <Button
          onClick={() => valueSetter("Everyone")}
          className={
            value === "Everyone"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Everyone
        </Button>
      </div>
    </div>
  );
};

const AgeModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const minDistance = 1;
  // props.value[1].value =
  //   props.value[1].value === "null" ? "90 cm" : props.value[0].value;
  const [value, setValue] = useState([
    parseInt(props.value[1].value.substring(0, 2)),
    parseInt(props.value[1].value.substring(3)),
  ]);
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };
  const valueSetter = (v) => {
    props.value[1].value = `${value[0]}-${value[1]}`;
    async function updateData() {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const adminRef = doc(db, "users", "admin");
      const adminSnap = await getDoc(adminRef);
      const userInterests = adminSnap.data().userInterests;
      userInterests[userSnap.data().adminI].ageStart = value[0];
      userInterests[userSnap.data().adminI].ageEnd = value[1];
      await updateDoc(userRef, {
        interestedInAgeEnd: value[1],
        interestedInAgeStart: value[0],
      });
      await updateDoc(adminRef, {
        userInterests: userInterests,
      });
      props.close();
    }
    updateData();
  };
  return (
    <div className="modal__tags">
      <EventIcon />
      <h1 className="modal__tags__title">Age?</h1>
      <Box className="modal__tags__slider" sx={{ width: 350 }}>
        <h2 id="non-linear-slider" gutterBottom>
          {`Between ${value[0]} and ${value[1]}`}
        </h2>
        <Slider
          getAriaLabel={() => "Minimum distance"}
          value={value}
          min={18}
          max={80}
          onChange={handleChange}
          // valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
          disableswap
        />
      </Box>
      <div className="modal__tags__buttons">
        <Button onClick={() => valueSetter(value)}>Save</Button>
        <Button onClick={() => props.close()}>Cancel</Button>
      </div>
    </div>
  );
};

const DistanceModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState(props.value[2].value);
  const handleChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };
  const valueSetter = (v) => {
    props.value[2].value = v;
    async function updateData() {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const adminRef = doc(db, "users", "admin");
      const adminSnap = await getDoc(adminRef);
      const userInterests = adminSnap.data().userInterests;
      userInterests[userSnap.data().adminI].distance = v;
      await updateDoc(userRef, {
        interestedInDistance: v,
      });
      await updateDoc(adminRef, {
        userInterests: userInterests,
      });
      props.close();
    }
    updateData();
  };
  return (
    <div className="modal__tags">
      <SocialDistanceIcon />
      <h1 className="modal__tags__title">Distance?</h1>
      <Box className="modal__tags__slider" sx={{ width: 350 }}>
        <h2 id="non-linear-slider" gutterBottom>
          {value === 161 ? "Whole Country" : `Up to ${value} km away`}
        </h2>
        <Slider
          value={value}
          min={5}
          // step={1}
          max={161}
          onChange={handleChange}
          // valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
      </Box>
      <div className="modal__tags__buttons">
        <Button onClick={() => valueSetter(value)}>Save</Button>
        <Button onClick={() => props.close()}>Cancel</Button>
      </div>
    </div>
  );
};

const DeleteModal = (props) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
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
  return (
    <div className="modal__tags">
      <h1 className="modal__tags__title">Are you sure?</h1>
      <p style={{ fontSize: "1.6rem" }}>
        {`This means your account will be hidden until you reactivate it by logging back in.`}
      </p>
      <div className="modal__tags__buttons">
        <Button onClick={handleLogout}>Yup!</Button>
        <Button onClick={() => props.close()}>Cancel</Button>
      </div>
    </div>
  );
};

export default UserSettings;
