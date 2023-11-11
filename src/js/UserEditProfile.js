import React, { useState, useEffect, useRef } from "react";
import "../css/style.css";
import { Link } from "react-router-dom";
import Compressor from "compressorjs";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Slider,
  TextareaAutosize,
  Tooltip,
} from "@mui/material";
import "@geocodeearth/autocomplete-element";
import { useForm } from "react-hook-form";
import { grey, red } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StraightenIcon from "@mui/icons-material/Straighten";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SchoolIcon from "@mui/icons-material/School";
import WineBarIcon from "@mui/icons-material/WineBar";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import SearchIcon from "@mui/icons-material/Search";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import InsightsIcon from "@mui/icons-material/Insights";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SoapIcon from "@mui/icons-material/Soap";
import TransgenderIcon from "@mui/icons-material/Transgender";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
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
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import db, { storage } from "./firebase";
import { useStateValue } from "./StateProvider";
import ProfileCard from "./ProfileCard";

let autoComplete;

function UserEditProfile() {
  const [characterCount, setCharacterCount] = useState(0);
  const [characterCount1, setCharacterCount1] = useState(0);
  const [characterCount2, setCharacterCount2] = useState(0);
  const [characterCount3, setCharacterCount3] = useState(0);
  const [{ user }, dispatch] = useStateValue();
  const [tag, setTag] = useState([
    {
      func: HeightModal,
    },
    {
      func: ExerciseModal,
    },
    {
      func: EducationModal,
    },
    {
      func: DrinkingModal,
    },
    {
      func: SmokingModal,
    },
    {
      func: SearchWantModal,
    },
    {
      func: KidsModal,
    },
    {
      func: ZodiacModal,
    },
    {
      func: PoliticsModal,
    },
    {
      func: ReligionModal,
    },
    {
      func: GenderModal,
    },
    {
      func: LivesInModal,
    },
    {
      func: FromModal,
    },
    {
      func: WorkAddModal,
    },
    {
      func: WorkEditModal,
    },
    {
      func: EducationAddModal,
    },
    {
      func: EducationEditModal,
    },
    {
      func: ImageEditModal,
    },
    {
      func: ImageAddModal,
    },
  ]);
  const [infoTags, setInfoTags] = useState([
    {
      name: StraightenIcon,
      value: "null",
    },
    {
      name: FitnessCenterIcon,
      value: "null",
    },
    {
      name: SchoolIcon,
      value: "In college",
    },
    {
      name: WineBarIcon,
      value: "Socially",
    },
    {
      name: SmokingRoomsIcon,
      value: "Socially",
    },
    {
      name: SearchIcon,
      value: "Don't know yet",
    },
    {
      name: ChildFriendlyIcon,
      value: "Don't want",
    },
    {
      name: InsightsIcon,
      value: "Libra",
    },
    {
      name: AccountBalanceIcon,
      value: "Apolitical",
    },
    {
      name: SoapIcon,
      value: "Atheist",
    },
    {
      name: TransgenderIcon,
      value: "Man",
    },
    {
      name: LocationCityIcon,
      value: "null",
    },
    {
      name: HomeIcon,
      value: "null",
    },
    {
      value: [],
    },
    {
      value: [],
    },
    {
      value: [],
    },
  ]);
  const jobs = ["Ceo at Puraniks", "Coo at Lodha"];
  const institutions = ["Ramnarain Ruia 2022", "Whistling woods 2024"];
  const [workRadioValue, setWorkRadioValue] = useState("");
  const [edRadioValue, setEdRadioValue] = useState("");
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const [curI, setCurI] = useState(0);
  const handleOpen = (ii, curii) => {
    setI(ii);
    setCurI(curii);
    setOpen(true);
    return;
  };
  const handleClose = () => setOpen(false);
  // const handleCloser = () => {};
  const modalSetValue = () => {
    if (i <= 12) {
      const CustomTag = tag[i].func;
      return <CustomTag value={infoTags} close={handleClose} />;
    } else if (i === 13 || i === 14) {
      const CustomTag = tag[i].func;
      return <CustomTag value={infoTags} close={handleClose} current={curI} />;
    } else if (i === 15 || i === 16) {
      const CustomTag = tag[i].func;
      return <CustomTag value={infoTags} close={handleClose} current={curI} />;
    } else if (i === 17) {
      const CustomTag = tag[17].func;
      return <CustomTag value={infoTags} close={handleClose} current={curI} />;
    } else if (i === 18) {
      const CustomTag = tag[i].func;
      return <CustomTag value={infoTags} close={handleClose} />;
    }
  };

  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const questions = [
    "What's your favorite breakfast?",
    "How do you drink your coffee?",
    "What's on your favorite sandwich?",
    "Soup or Salad?",
    "What's your favorite cookbook?",
    "No more sweets or no more hearty foods?",
    "What's your favorite Cuisine? ",
    "What's your favorite food movie?",
    "What's your most guilty pleasure?",
    "Cooking at home or going out for dinner?",
    "High end or low profile?",
    "What's your favorite restaurant?",
    "The tastiest food I've ever eaten was:",
    "What's your favorite cocktail?",
    "What should not be missing in your kitchen?",
    "What's your favorite snack?",
    "What's on your pizza?",
    "What food do you really dislike?",
    "What's your favorite food blog?",
    "What's the weirdest thing you've ever eaten?",
    "What's on your food bucket list?",
    "I couldn't live without:",
  ];

  const handleChange1 = (event) => {
    setQuestion1(event.target.value);
    setAnswer1("");
  };
  const handleChange2 = (event) => {
    setQuestion2(event.target.value);
    setAnswer2("");
  };
  const handleChange3 = (event) => {
    setQuestion3(event.target.value);
    setAnswer3("");
  };

  const handleChange4 = (event) => {
    setWorkRadioValue(event.target.value);
    const atIndex = event.target.value.indexOf(" at ");
    const com = event.target.value.substring(atIndex + 4);
    const tit = event.target.value.substring(0, atIndex);
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "cardInfo", "aboutMe");
      await updateDoc(userRef, {
        currentCompany: com,
        currentTitle: tit,
      });
    }
    updateData();
  };
  const handleChange5 = (event) => {
    setEdRadioValue(event.target.value);
    const atIndex = event.target.value.lastIndexOf(" ");
    const ins = event.target.value.substring(0, atIndex);
    const yer = event.target.value.substring(atIndex + 1);
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "cardInfo", "aboutMe");
      await updateDoc(userRef, {
        currentGraduationYear: yer,
        currentInstitution: ins,
      });
    }
    updateData();
  };

  // FOR THE MODAL
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60vw",
    // bgcolor: "background.paper",
    // border: "2px solid #000",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
    padding: "0px",
    outline: "0px",
  };

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const [people, setPeople] = useState([
    {
      name: "",
      id: "",
      currentInstitution: "",
      currentTitle: "",
      currentCompany: "",
      currentGraduationYears: "",
      aboutMe: "",
      urls: [],
      answers: [],
      questions: [],
      age: "",
      from: "",
      livesIn: "",
    },
  ]);
  const [cardInfo, setCardInfo] = useState([
    {
      currentInstitution: "",
      currentTitle: "",
      currentCompany: "",
      currentGraduationYear: "",
      value: "",
    },
    {},
    {
      urls: [],
    },
    {
      answers: [],
      questions: [],
    },
    {
      companies: [],
      titles: [],
    },
  ]);
  const [iinfoTags, setIinfoTags] = useState([
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "",
    },
  ]);
  const [newAboutMe, setNewAboutme] = useState("");
  const [generatedId, setgeneratedId] = useState("");
  const [generatedName, setgeneratedName] = useState("");
  const [generatedLivesIn, setgeneratedLivesIn] = useState("");
  const [generatedGender, setgeneratedGender] = useState("");
  const [generatedDob, setgeneratedDob] = useState(
    Timestamp.fromDate(new Date())
  );
  const [generatedUrls, setgeneratedUrls] = useState([]);
  const [generatedNewUrls, setgeneartedNewUrls] = useState([]);
  const aboutMeRef = useRef();

  //get generatedList from current user
  useEffect(() => {
    const fetchData = async () => {
      try {
        setgeneratedId(user.uid);
        const userSnap = await getDoc(doc(db, "users", user.uid));
        const cardUser = userSnap.data();
        setgeneratedName(cardUser.name);
        setgeneratedDob(cardUser.dob);
        setgeneratedLivesIn(cardUser.livesIn);
        setgeneratedGender(cardUser.gender);
        // setgeneratedUrls([]);
        const cardInfoQuery = query(
          collection(db, "users", userSnap.id, "cardInfo")
        );
        const cardInfoSnap = onSnapshot(cardInfoQuery, (snapshot) => {
          setCardInfo(
            snapshot.docs.map((doc) => {
              return doc.data();
            })
          );
        });
        const infoTagsQuery = query(
          collection(db, "users", userSnap.id, "infoTags")
        );
        const infoTagsSnap = onSnapshot(infoTagsQuery, (snapshot) => {
          setIinfoTags(
            snapshot.docs.map((doc) => {
              return doc.data();
            })
          );
        });
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const age = Math.trunc(
      (Timestamp.now().toDate() - generatedDob.toDate()) /
        (1000 * 60 * 60 * 24 * 365.25)
    );
    // setgeneratedUrls([]);
    setPeople([
      {
        age: age,
        name: generatedName,
        id: generatedId,
        currentInstitution: cardInfo[0].currentInstitution,
        currentTitle: cardInfo[0].currentTitle,
        currentCompany: cardInfo[0].currentCompany,
        currentGraduationYear: cardInfo[0].currentGraduationYear,
        aboutMe: cardInfo[0].value,
        urls: cardInfo[2].urls,
        answers: cardInfo[3].answers,
        questions: cardInfo[3].questions,
        infoTags: {
          height: iinfoTags[4].value,
          exercise: iinfoTags[2].value,
          educationLevel: iinfoTags[1].value,
          drinking: iinfoTags[0].value,
          smoking: iinfoTags[9].value,
          lookingFor: iinfoTags[6].value,
          kids: iinfoTags[5].value,
          starSign: iinfoTags[10].value,
          politics: iinfoTags[7].value,
          religion: iinfoTags[8].value,
        },
        from: iinfoTags[3].value,
        livesIn: generatedLivesIn,
      },
    ]);
    setNewAboutme(cardInfo[0].value);
    setQuestion1(cardInfo[3].questions[0]);
    setQuestion2(cardInfo[3].questions[1]);
    setQuestion3(cardInfo[3].questions[2]);
    setAnswer1(cardInfo[3].answers[0]);
    setAnswer2(cardInfo[3].answers[1]);
    setAnswer3(cardInfo[3].answers[2]);
    infoTags[0].value = iinfoTags[4].value;
    infoTags[1].value = iinfoTags[2].value;
    infoTags[2].value = iinfoTags[1].value;
    infoTags[3].value = iinfoTags[0].value;
    infoTags[4].value = iinfoTags[9].value;
    infoTags[5].value = iinfoTags[6].value;
    infoTags[6].value = iinfoTags[5].value;
    infoTags[7].value = iinfoTags[10].value;
    infoTags[8].value = iinfoTags[7].value;
    infoTags[9].value = iinfoTags[8].value;
    infoTags[10].value = generatedGender;
    infoTags[11].value = generatedLivesIn;
    infoTags[12].value = iinfoTags[3].value;
    infoTags[13].value = cardInfo[4].companies.map((ti, i) => {
      return `${cardInfo[4].titles[i]} at ${ti}`;
    });
    if (
      infoTags[13].value.includes(
        `${cardInfo[0].currentTitle} at ${cardInfo[0].currentCompany}`
      )
    ) {
      setWorkRadioValue(
        `${cardInfo[0].currentTitle} at ${cardInfo[0].currentCompany}`
      );
    } else {
      setWorkRadioValue("");
    }
    if (cardInfo[1].institutions?.length > 0) {
      infoTags[14].value = cardInfo[1].institutions.map((ins, i) => {
        return `${ins} ${cardInfo[1].graduationYears[i]}`;
      });
    }
    if (
      infoTags[14].value.includes(
        `${cardInfo[0].currentInstitution} ${cardInfo[0].currentGraduationYear}`
      )
    ) {
      setEdRadioValue(
        `${cardInfo[0].currentInstitution} ${cardInfo[0].currentGraduationYear}`
      );
    } else {
      setEdRadioValue("");
    }
    if (generatedUrls.length === 0) {
      getDownloadURL(ref(storage, `userImages/${cardInfo[2].urls[0]}`))
        .then((url) => {
          setgeneratedUrls([...generatedUrls, url]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (generatedUrls.length === 1 && cardInfo[2].urls.length > 1) {
      getDownloadURL(ref(storage, `userImages/${cardInfo[2].urls[1]}`))
        .then((url) => {
          setgeneratedUrls([...generatedUrls, url]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (generatedUrls.length === 2 && cardInfo[2].urls.length > 2) {
      getDownloadURL(ref(storage, `userImages/${cardInfo[2].urls[2]}`))
        .then((url) => {
          setgeneratedUrls([...generatedUrls, url]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (generatedUrls.length === 3 && cardInfo[2].urls.length > 3) {
      getDownloadURL(ref(storage, `userImages/${cardInfo[2].urls[3]}`))
        .then((url) => {
          setgeneratedUrls([...generatedUrls, url]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (generatedUrls.length === 4 && cardInfo[2].urls.length > 4) {
      getDownloadURL(ref(storage, `userImages/${cardInfo[2].urls[4]}`))
        .then((url) => {
          setgeneratedUrls([...generatedUrls, url]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (generatedUrls.length === 5 && cardInfo[2].urls.length === 6) {
      getDownloadURL(ref(storage, `userImages/${cardInfo[2].urls[5]}`))
        .then((url) => {
          setgeneratedUrls([...generatedUrls, url]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    infoTags[15].value = cardInfo[2].urls;
  }, [
    generatedId,
    generatedName,
    generatedLivesIn,
    cardInfo,
    iinfoTags,
    generatedDob,
    generatedUrls,
    infoTags,
    generatedGender,
  ]);

  const handleAboutMeCancel = (e) => {
    e.preventDefault();
    setNewAboutme(people[0].aboutMe);
    console.log(newAboutMe);
  };

  const handleAboutMeSave = (e) => {
    e.preventDefault();
    people[0].aboutMe = newAboutMe;
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "cardInfo", "aboutMe");
      await updateDoc(userRef, {
        value: people[0].aboutMe,
      });
    }
    updateData();
  };

  const handleAnswer1Cancel = (e) => {
    e.preventDefault();
    setAnswer1(people[0].answers[0]);
    setQuestion1(people[0].questions[0]);
  };

  const handleAnswer1Save = (e) => {
    e.preventDefault();

    setAnswer1(answer1);
    setQuestion1(question1);
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "cardInfo", "prompts");
      people[0].answers[0] = answer1;
      people[0].questions[0] = question1;
      await updateDoc(userRef, {
        answers: people[0].answers,
        questions: people[0].questions,
      });
    }
    updateData();
  };

  const handleAnswer2Cancel = (e) => {
    e.preventDefault();
    setAnswer2(people[0].answers[1]);
    setQuestion2(people[0].questions[1]);
  };

  const handleAnswer2Save = (e) => {
    e.preventDefault();

    setAnswer2(answer2);
    setQuestion2(question2);
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "cardInfo", "prompts");
      people[0].answers[1] = answer2;
      people[0].questions[1] = question2;
      await updateDoc(userRef, {
        answers: people[0].answers,
        questions: people[0].questions,
      });
    }
    updateData();
  };

  const handleAnswer3Cancel = (e) => {
    e.preventDefault();
    setAnswer3(people[0].answers[2]);
    setQuestion3(people[0].questions[2]);
  };

  const handleAnswer3Save = (e) => {
    e.preventDefault();

    setAnswer3(answer3);
    setQuestion3(question3);
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "cardInfo", "prompts");
      people[0].answers[2] = answer3;
      people[0].questions[2] = question3;
      await updateDoc(userRef, {
        answers: people[0].answers,
        questions: people[0].questions,
      });
    }
    updateData();
  };

  // const handleImageAction = () => {};

  const getPerson = () => {
    // console.log(`${user.uid}-${Timestamp.now().seconds}`);
    return people[0];
  };

  return (
    <div className="userEditProfile">
      <div className="userEditProfile__header">
        <div className="userEditProfile__header__title">Date profile</div>
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
        <div className="userEditProfile__imagesContainer">
          <div className="userEditProfile__images">
            {generatedUrls[0] ? (
              <div className="userEditProfile__image userEditProfile__image-1">
                <img
                  src={generatedUrls[0]}
                  alt="Profileimage-1"
                  className="userEditProfile__pic"
                ></img>
                {generatedUrls.length > 0 && (
                  <span
                    className="userEditProfile__imageRemove"
                    // onClick={() => handleOpen(17)}
                  >
                    <IconButton
                      onClick={() => handleOpen(17, 0)}
                      sx={{ padding: "0", marginBottom: "2px" }}
                    >
                      <CloseIcon fontSize="large" />
                    </IconButton>
                  </span>
                )}
              </div>
            ) : (
              <div className="userEditProfile__image userEditProfile__image-1"></div>
            )}
            {generatedUrls[1] ? (
              <div className="userEditProfile__image userEditProfile__image-2">
                <img
                  src={generatedUrls[1]}
                  alt="Profileimage-1"
                  className="userEditProfile__pic"
                ></img>
                <span className="userEditProfile__imageRemove">
                  <IconButton
                    onClick={() => handleOpen(17, 1)}
                    sx={{ padding: "0", marginBottom: "2px" }}
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                </span>
              </div>
            ) : (
              <div className="userEditProfile__image userEditProfile__image-2">
                <AddCircleIcon
                  onClick={() => handleOpen(18)}
                  className="userEditProfile__imageAdd"
                />
              </div>
            )}

            {generatedUrls[2] ? (
              <div className="userEditProfile__image userEditProfile__image-3">
                <img
                  src={generatedUrls[2]}
                  alt="Profileimage-1"
                  className="userEditProfile__pic"
                ></img>
                <span className="userEditProfile__imageRemove">
                  <IconButton
                    onClick={() => handleOpen(17, 2)}
                    sx={{ padding: "0", marginBottom: "2px" }}
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                </span>
              </div>
            ) : (
              <div className="userEditProfile__image userEditProfile__image-3">
                <AddCircleIcon
                  onClick={() => handleOpen(18)}
                  className="userEditProfile__imageAdd"
                />
              </div>
            )}

            {generatedUrls[3] ? (
              <div className="userEditProfile__image userEditProfile__image-4">
                <img
                  src={generatedUrls[3]}
                  alt="Profileimage-1"
                  className="userEditProfile__pic"
                ></img>
                <span className="userEditProfile__imageRemove">
                  <IconButton
                    onClick={() => handleOpen(17, 3)}
                    sx={{ padding: "0", marginBottom: "2px" }}
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                </span>
              </div>
            ) : (
              <div className="userEditProfile__image userEditProfile__image-4">
                <AddCircleIcon
                  onClick={() => handleOpen(18)}
                  className="userEditProfile__imageAdd"
                />
              </div>
            )}

            {generatedUrls[4] ? (
              <div className="userEditProfile__image userEditProfile__image-5">
                <img
                  src={generatedUrls[4]}
                  alt="Profileimage-1"
                  className="userEditProfile__pic"
                ></img>
                <span className="userEditProfile__imageRemove">
                  <IconButton
                    onClick={() => handleOpen(17, 4)}
                    sx={{ padding: "0", marginBottom: "2px" }}
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                </span>
              </div>
            ) : (
              <div className="userEditProfile__image userEditProfile__image-5">
                <AddCircleIcon
                  onClick={() => handleOpen(18)}
                  className="userEditProfile__imageAdd"
                />
              </div>
            )}
            {generatedUrls[5] ? (
              <div className="userEditProfile__image userEditProfile__image-6">
                <img
                  src={generatedUrls[5]}
                  alt="Profileimage-1"
                  className="userEditProfile__pic"
                ></img>
                <span className="userEditProfile__imageRemove">
                  <IconButton
                    onClick={() => handleOpen(17, 5)}
                    sx={{ padding: "0", marginBottom: "2px" }}
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                </span>
              </div>
            ) : (
              <div className="userEditProfile__image userEditProfile__image-6">
                <AddCircleIcon
                  onClick={() => handleOpen(18)}
                  className="userEditProfile__imageAdd"
                />
              </div>
            )}
          </div>
        </div>
        <Button
          onClick={handleModalOpen}
          className="userEditProfile__previewBtn"
        >
          Preview profile
          <ArrowForwardIosIcon />
        </Button>
        <Modal
          open={modalOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <IconButton onClick={handleModalClose} sx={{ marginLeft: "57vw" }}>
              <CloseIcon fontSize="large" sx={{ color: grey[50] }} />
            </IconButton>
            <div className="profileCard__container">
              {people[0].name.length > 0 &&
                people[0].id.length > 0 &&
                people[0].aboutMe.length > 0 &&
                people[0].urls.length > 0 && (
                  <ProfileCard person={getPerson()} />
                )}
            </div>
          </Box>
        </Modal>
        <Accordion className="userEditProfile__aboutMe1">
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ fontSize: 24, color: grey[900] }} />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            My Profile Prompts
          </AccordionSummary>
          <AccordionDetails>
            <form>
              <Box sx={{ width: "37.5rem" }}>
                <FormControl variant="standard" fullWidth>
                  {/* <InputLabel id="demo-simple-select-label">Prompt 1</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    displayEmpty
                    id="demo-simple-select"
                    value={question1}
                    onChange={handleChange1}
                    sx={{ fontSize: "1.2rem" }}
                    name="question1"
                    // defaultValue={questions[0]}
                    // input={questions[0]}
                  >
                    <MenuItem value="">{question1}</MenuItem>
                    {questions
                      .filter((qn) => qn !== question2 && qn !== question3)
                      .map((qn) => (
                        <MenuItem
                          key={qn}
                          value={qn}
                          // style={getStyles(name, personName, theme)}
                        >
                          {qn}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
              <TextareaAutosize
                className="userEditProfile__aboutMe1-input"
                aria-label="minimum height"
                minRows={3}
                placeholder="Tell us..."
                name="text"
                type="text"
                maxLength="160"
                style={{ width: 375 }}
                onChange={(e) => {
                  setCharacterCount1(e.target.value.length);
                  setAnswer1(e.target.value);
                }}
                value={answer1}
              />
              <div className="userEditProfile__aboutMe1-btns">
                <input
                  onClick={handleAnswer1Cancel}
                  className="userEditProfile__aboutMe1-btns--cl"
                  type="submit"
                  value="Cancel"
                />

                <div>
                  {characterCount1 === 160
                    ? `That's it!`
                    : characterCount1 === 0
                    ? ""
                    : `${160 - characterCount1} left`}
                </div>
                <input
                  onClick={handleAnswer1Save}
                  className="userEditProfile__aboutMe1-btns--sv"
                  type="submit"
                  value="Save"
                />
              </div>
            </form>
            <form>
              <Box sx={{ width: "37.5rem" }}>
                <FormControl variant="standard" fullWidth>
                  {/* <InputLabel id="demo-simple-select-label">Prompt 1</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    displayEmpty
                    id="demo-simple-select"
                    value={question2}
                    onChange={handleChange2}
                    sx={{ fontSize: "1.2rem" }}
                    name="question2"
                    // defaultValue={questions[0]}
                    // input={questions[0]}
                  >
                    <MenuItem value="">{question2}</MenuItem>
                    {questions
                      .filter((qn) => qn !== question1 && qn !== question3)
                      .map((qn) => (
                        <MenuItem
                          key={qn}
                          value={qn}
                          // style={getStyles(name, personName, theme)}
                        >
                          {qn}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
              <TextareaAutosize
                className="userEditProfile__aboutMe2-input"
                aria-label="minimum height"
                minRows={3}
                placeholder="Tell us..."
                name="text"
                type="text"
                maxLength="160"
                style={{ width: 375 }}
                onChange={(e) => {
                  setCharacterCount2(e.target.value.length);
                  setAnswer2(e.target.value);
                }}
                value={answer2}
              />
              <div className="userEditProfile__aboutMe2-btns">
                <input
                  onClick={handleAnswer2Cancel}
                  className="userEditProfile__aboutMe2-btns--cl"
                  type="submit"
                  value="Cancel"
                />
                <div>
                  {characterCount2 === 160
                    ? `That's it!`
                    : characterCount2 === 0
                    ? ""
                    : `${160 - characterCount2} left`}
                </div>
                <input
                  onClick={handleAnswer2Save}
                  className="userEditProfile__aboutMe2-btns--sv"
                  type="submit"
                  value="Save"
                />
              </div>
            </form>
            <form>
              <Box sx={{ width: "37.5rem" }}>
                <FormControl variant="standard" fullWidth>
                  {/* <InputLabel id="demo-simple-select-label">Prompt 1</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    displayEmpty
                    id="demo-simple-select"
                    value={question3}
                    onChange={handleChange3}
                    sx={{ fontSize: "1.2rem" }}
                    name="question3"
                    // defaultValue={questions[0]}
                    // input={questions[0]}
                  >
                    <MenuItem value="">{question3}</MenuItem>
                    {questions
                      .filter((qn) => qn !== question1 && qn !== question2)
                      .map((qn) => (
                        <MenuItem
                          key={qn}
                          value={qn}
                          // style={getStyles(name, personName, theme)}
                        >
                          {qn}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
              <TextareaAutosize
                className="userEditProfile__aboutMe3-input"
                aria-label="minimum height"
                minRows={3}
                placeholder="Tell us..."
                name="text"
                type="text"
                maxLength="160"
                style={{ width: 375 }}
                onChange={(e) => {
                  setCharacterCount3(e.target.value.length);
                  setAnswer3(e.target.value);
                }}
                value={answer3}
              />
              <div className="userEditProfile__aboutMe3-btns">
                <input
                  onClick={handleAnswer3Cancel}
                  className="userEditProfile__aboutMe3-btns--cl"
                  type="submit"
                  value="Cancel"
                />
                <div>
                  {characterCount3 === 160
                    ? `That's it!`
                    : characterCount3 === 0
                    ? ""
                    : `${160 - characterCount3} left`}
                </div>
                <input
                  onClick={handleAnswer3Save}
                  className="userEditProfile__aboutMe3-btns--sv"
                  type="submit"
                  value="Save"
                />
              </div>
            </form>
          </AccordionDetails>
        </Accordion>
        <Accordion className="userEditProfile__aboutMe">
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ fontSize: 24, color: grey[900] }} />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            About Me
          </AccordionSummary>
          <AccordionDetails>
            <form ref={aboutMeRef}>
              <TextareaAutosize
                className="userEditProfile__aboutMe-input"
                aria-label="minimum height"
                minRows={3}
                name="text"
                type="text"
                placeholder="A little bit about you..."
                maxLength="300"
                style={{ width: 375 }}
                onChange={(e) => {
                  setCharacterCount(e.target.value.length);
                  setNewAboutme(e.target.value);
                }}
                value={newAboutMe !== "null" ? newAboutMe : ""}
              />
              <div className="userEditProfile__aboutMe-btns">
                <input
                  onClick={handleAboutMeCancel}
                  className="userEditProfile__aboutMe-btns--cl"
                  type="submit"
                  value="Cancel"
                />
                <div>
                  {characterCount === 300
                    ? `That's it!`
                    : characterCount === 0
                    ? ""
                    : `${300 - characterCount} left`}
                </div>
                <input
                  onClick={handleAboutMeSave}
                  className="userEditProfile__aboutMe-btns--sv"
                  type="submit"
                  value="Save"
                />
              </div>
            </form>
          </AccordionDetails>
        </Accordion>
        <Accordion className="userEditProfile__aboutMe">
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ fontSize: 24, color: grey[900] }} />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            My Basic Info
          </AccordionSummary>
          <AccordionDetails>
            <div className="userEditProfile__basicInfo-btns">
              <Button
                onClick={() => handleOpen(0)}
                className="userEditProfile__basicInfo-btn"
              >
                <div className="userEditProfile__basicInfo-btn-title">
                  <StraightenIcon />
                  Height
                </div>
                <div className="userEditProfile__basicInfo-btn-value">
                  {infoTags[0].value === "null" ? (
                    <AddCircleIcon />
                  ) : infoTags[0].value === "90 cm" ? (
                    `I prefer not to say`
                  ) : infoTags[0].value === "221 cm" ? (
                    `>220cm`
                  ) : (
                    infoTags[0].value
                  )}
                </div>
              </Button>
              <Button
                onClick={() => handleOpen(1)}
                className="userEditProfile__basicInfo-btn"
              >
                <div className="userEditProfile__basicInfo-btn-title">
                  <FitnessCenterIcon />
                  Excercise
                </div>
                <div className="userEditProfile__basicInfo-btn-value">
                  {infoTags[1].value === "null" ? (
                    <AddCircleIcon />
                  ) : (
                    infoTags[1].value
                  )}
                </div>
              </Button>
              <Button
                onClick={() => handleOpen(2)}
                className="userEditProfile__basicInfo-btn"
              >
                <div className="userEditProfile__basicInfo-btn-title">
                  <SchoolIcon />
                  Education level
                </div>
                <div className="userEditProfile__basicInfo-btn-value">
                  {infoTags[2].value === "null" ? (
                    <AddCircleIcon />
                  ) : (
                    infoTags[2].value
                  )}
                </div>
              </Button>
              <Button
                onClick={() => handleOpen(3)}
                className="userEditProfile__basicInfo-btn"
              >
                <div className="userEditProfile__basicInfo-btn-title">
                  <WineBarIcon />
                  Drinking
                </div>
                <div className="userEditProfile__basicInfo-btn-value">
                  {infoTags[3].value === "null" ? (
                    <AddCircleIcon />
                  ) : (
                    infoTags[3].value
                  )}
                </div>
              </Button>
              <Button
                onClick={() => handleOpen(4)}
                className="userEditProfile__basicInfo-btn"
              >
                <div className="userEditProfile__basicInfo-btn-title">
                  <SmokingRoomsIcon />
                  Smoking
                </div>
                <div className="userEditProfile__basicInfo-btn-value">
                  {infoTags[4].value === "null" ? (
                    <AddCircleIcon />
                  ) : (
                    infoTags[4].value
                  )}
                </div>
              </Button>
              <Button
                onClick={() => handleOpen(5)}
                className="userEditProfile__basicInfo-btn"
              >
                <div className="userEditProfile__basicInfo-btn-title">
                  <SearchIcon />
                  Looking for
                </div>
                <div className="userEditProfile__basicInfo-btn-value">
                  {infoTags[5].value === "null" ? (
                    <AddCircleIcon />
                  ) : (
                    infoTags[5].value
                  )}
                </div>
              </Button>
              <Button
                onClick={() => handleOpen(6)}
                className="userEditProfile__basicInfo-btn"
              >
                <div className="userEditProfile__basicInfo-btn-title">
                  <ChildFriendlyIcon />
                  Kids
                </div>
                <div className="userEditProfile__basicInfo-btn-value">
                  {infoTags[6].value === "null" ? (
                    <AddCircleIcon />
                  ) : (
                    infoTags[6].value
                  )}
                </div>
              </Button>
              <Button
                onClick={() => handleOpen(7)}
                className="userEditProfile__basicInfo-btn"
              >
                <div className="userEditProfile__basicInfo-btn-title">
                  <InsightsIcon />
                  Star sign
                </div>
                <div className="userEditProfile__basicInfo-btn-value">
                  {infoTags[7].value === "null" ? (
                    <AddCircleIcon />
                  ) : (
                    infoTags[7].value
                  )}
                </div>
              </Button>
              <Button
                onClick={() => handleOpen(8)}
                className="userEditProfile__basicInfo-btn"
              >
                <div className="userEditProfile__basicInfo-btn-title">
                  <AccountBalanceIcon />
                  Politics
                </div>
                <div className="userEditProfile__basicInfo-btn-value">
                  {infoTags[8].value === "null" ? (
                    <AddCircleIcon />
                  ) : (
                    infoTags[8].value
                  )}
                </div>
              </Button>
              <Button
                onClick={() => handleOpen(9)}
                className="userEditProfile__basicInfo-btn"
              >
                <div className="userEditProfile__basicInfo-btn-title">
                  <SoapIcon />
                  Religion
                </div>
                <div className="userEditProfile__basicInfo-btn-value">
                  {infoTags[9].value === "null" ? (
                    <AddCircleIcon />
                  ) : (
                    infoTags[9].value
                  )}
                </div>
              </Button>
              <Button
                onClick={() => handleOpen(10)}
                className="userEditProfile__basicInfo-btn"
              >
                <div className="userEditProfile__basicInfo-btn-title">
                  <TransgenderIcon />
                  Gender
                </div>
                <div className="userEditProfile__basicInfo-btn-value">
                  {infoTags[10].value === "null" ? (
                    <AddCircleIcon />
                  ) : (
                    infoTags[10].value
                  )}
                </div>
              </Button>
              <Button
                onClick={() => handleOpen(11)}
                className="userEditProfile__basicInfo-btn"
              >
                <div className="userEditProfile__basicInfo-btn-title">
                  <LocationCityIcon />
                  Lives in
                </div>
                <div className="userEditProfile__basicInfo-btn-value">
                  {infoTags[11].value === "null" ? (
                    <AddCircleIcon />
                  ) : (
                    infoTags[11].value
                  )}
                </div>
              </Button>
              <Button
                onClick={() => handleOpen(12)}
                className="userEditProfile__basicInfo-btn"
              >
                <div className="userEditProfile__basicInfo-btn-title">
                  <HomeIcon />
                  From
                </div>
                <div className="userEditProfile__basicInfo-btn-value">
                  {infoTags[12].value === "null" ? (
                    <AddCircleIcon />
                  ) : (
                    infoTags[12].value
                  )}
                </div>
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion className="userEditProfile__aboutMe">
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ fontSize: 24, color: grey[900] }} />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            My Work &amp; Education
          </AccordionSummary>
          <AccordionDetails>
            <div className="userEditProfile__work">
              <div className="userEditProfile__work__title">Your job</div>
              <FormControl>
                {/* <FormLabel id="demo-controlled-radio-buttons-group">
                  Gender
                </FormLabel> */}
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={workRadioValue}
                  onChange={handleChange4}
                >
                  {infoTags[13].value.map((job, index) => {
                    const ind = index;
                    return (
                      <FormControlLabel
                        sx={{
                          borderRadius: "20px",
                          border: "1px solid #dcdcdc",
                          marginBottom: "1rem",
                        }}
                        value={job}
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 28,
                                color: red[500],
                                "&.Mui-checked": {
                                  color: red[500],
                                },
                              },
                            }}
                          />
                        }
                        label={
                          <div className="userEditProfile__work__labels">
                            {job}
                            <IconButton onClick={() => handleOpen(14, ind)}>
                              <ModeEditOutlinedIcon fontSize="large" />
                            </IconButton>
                          </div>
                        }
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <Button
                onClick={() => handleOpen(13)}
                className="userEditProfile__basicInfo-btn"
              >
                <div className="userEditProfile__basicInfo-btn-title">
                  <AddCircleIcon />
                  Add a job
                </div>
              </Button>
            </div>
            <div className="userEditProfile__education">
              <div className="userEditProfile__work__title--2">
                Your education
              </div>
              <FormControl>
                {/* <FormLabel id="demo-controlled-radio-buttons-group">
                  Gender
                </FormLabel> */}
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={edRadioValue}
                  onChange={handleChange5}
                >
                  {infoTags[14].value.map((job, index) => {
                    const ind = index;
                    return (
                      <FormControlLabel
                        sx={{
                          borderRadius: "20px",
                          border: "1px solid #dcdcdc",
                          marginBottom: "1rem",
                        }}
                        value={job}
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 28,
                                color: red[500],
                                "&.Mui-checked": {
                                  color: red[500],
                                },
                              },
                            }}
                          />
                        }
                        label={
                          <div className="userEditProfile__work__labels">
                            {job}
                            <IconButton onClick={() => handleOpen(16, ind)}>
                              <ModeEditOutlinedIcon fontSize="large" />
                            </IconButton>
                          </div>
                        }
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <Button
                onClick={() => handleOpen(15)}
                className="userEditProfile__basicInfo-btn"
              >
                <div className="userEditProfile__basicInfo-btn-title">
                  <AddCircleIcon />
                  Add an institution
                </div>
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
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

const HeightModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  props.value[0].value =
    props.value[0].value === "null" ? "90 cm" : props.value[0].value;
  const [value, setValue] = useState(props.value[0].value.match(/(\d+)/)[0]);
  const handleChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };
  const valueSetter = (v) => {
    props.value[0].value = v !== "null" ? `${v} cm` : "null";
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "infoTags", "height");
      await updateDoc(userRef, {
        value: v !== "null" ? `${v} cm` : "null",
      });
      props.close();
    }
    updateData();
  };
  return (
    <div className="modal__tags">
      <StraightenIcon />
      <h1 className="modal__tags__title">What is your height?</h1>
      <Box className="modal__tags__slider" sx={{ width: 250 }}>
        <h2 id="non-linear-slider" gutterBottom>
          {value < 91
            ? "I Prefer not to say"
            : value === 221
            ? `>220 cm (>7' 3")`
            : value === 91
            ? `<91 cm (<3' 1")`
            : `${value} cm (${Math.trunc(value / 30)}' ${Math.trunc(
                (value % 30) / 2.5
              )}")`}
        </h2>
        <Slider
          value={value}
          min={90}
          // step={1}
          max={221}
          onChange={handleChange}
          // valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
      </Box>
      <div className="modal__tags__buttons">
        <Button onClick={() => valueSetter(value)}>
          Yup, That's how tall I am
        </Button>
        <Button onClick={() => valueSetter("null")}>Skip</Button>
      </div>
    </div>
  );
};

const ExerciseModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState(props.value[1].value);
  const valueSetter = (v) => {
    props.value[1].value = v;
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "infoTags", "exercise");
      await updateDoc(userRef, {
        value: v,
      });
      props.close();
    }
    updateData();
  };
  return (
    <div className="modal__tags">
      <FitnessCenterIcon />
      <h1 className="modal__tags__title">Do you work out?</h1>
      <div className="modal__tags__buttons">
        <Button
          onClick={() => valueSetter("null")}
          className="modal__tags__buttons--inactive"
        >
          Skip
        </Button>
        <Button
          onClick={() => valueSetter("Active")}
          className={
            value === "Active"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Active
        </Button>
        <Button
          onClick={() => valueSetter("Sometimes")}
          className={
            value === "Sometimes"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Sometimes
        </Button>
        <Button
          onClick={() => valueSetter("Almost never")}
          className={
            value === "Almost never"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Almost never
        </Button>
      </div>
    </div>
  );
};

const EducationModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState(props.value[2].value);
  const valueSetter = (v) => {
    props.value[2].value = v;
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "infoTags", "educationLevel");
      await updateDoc(userRef, {
        value: v,
      });
      props.close();
    }
    updateData();
  };
  return (
    <div className="modal__tags">
      <SchoolIcon />
      <h1 className="modal__tags__title">What's your education?</h1>
      <div className="modal__tags__buttons">
        <Button
          onClick={() => valueSetter("null")}
          className="modal__tags__buttons--inactive"
        >
          Skip
        </Button>
        <Button
          onClick={() => valueSetter("High school")}
          className={
            value === "High school"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          High school
        </Button>
        <Button
          onClick={() => valueSetter("In college")}
          className={
            value === "In college"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          In college
        </Button>
        <Button
          onClick={() => valueSetter("Undergraduate degree")}
          className={
            value === "Undergraduate degree"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Undergraduate degree
        </Button>
        <Button
          onClick={() => valueSetter("In grad school")}
          className={
            value === "In grad school"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          In grad school
        </Button>
        <Button
          onClick={() => valueSetter("Graduate degree")}
          className={
            value === "Graduate degree"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Graduate degree
        </Button>
      </div>
    </div>
  );
};

const DrinkingModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState(props.value[3].value);
  const valueSetter = (v) => {
    props.value[3].value = v;
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "infoTags", "drinking");
      await updateDoc(userRef, {
        value: v,
      });
      props.close();
    }
    updateData();
  };
  return (
    <div className="modal__tags">
      <WineBarIcon />
      <h1 className="modal__tags__title">Do you drink?</h1>
      <div className="modal__tags__buttons">
        <Button
          onClick={() => valueSetter("null")}
          className="modal__tags__buttons--inactive"
        >
          Skip
        </Button>
        <Button
          onClick={() => valueSetter("Socially")}
          className={
            value === "Socially"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Socially
        </Button>
        <Button
          onClick={() => valueSetter("Never")}
          className={
            value === "Never"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Never
        </Button>
        <Button
          onClick={() => valueSetter("Frequently")}
          className={
            value === "Frequently"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Frequently
        </Button>
        <Button
          onClick={() => valueSetter("Sober")}
          className={
            value === "Sober"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Sober
        </Button>
      </div>
    </div>
  );
};

const SmokingModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState(props.value[4].value);
  const valueSetter = (v) => {
    props.value[4].value = v;
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "infoTags", "smoking");
      await updateDoc(userRef, {
        value: v,
      });
      props.close();
    }
    updateData();
  };
  return (
    <div className="modal__tags">
      <SchoolIcon />
      <h1 className="modal__tags__title">Do you smoke?</h1>
      <div className="modal__tags__buttons">
        <Button
          onClick={() => valueSetter("null")}
          className="modal__tags__buttons--inactive"
        >
          Skip
        </Button>
        <Button
          onClick={() => valueSetter("Socially")}
          className={
            value === "Socially"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Socially
        </Button>
        <Button
          onClick={() => valueSetter("Never")}
          className={
            value === "Never"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Never
        </Button>
        <Button
          onClick={() => valueSetter("Regularly")}
          className={
            value === "Regularly"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Regularly
        </Button>
      </div>
    </div>
  );
};

const SearchWantModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState(props.value[5].value);
  const valueSetter = (v) => {
    props.value[5].value = v;
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "infoTags", "lookingFor");
      await updateDoc(userRef, {
        value: v,
      });
      props.close();
    }
    updateData();
  };
  return (
    <div className="modal__tags">
      <SearchIcon />
      <h1 className="modal__tags__title">What do you want from your dates?</h1>
      <div className="modal__tags__buttons">
        <Button
          onClick={() => valueSetter("null")}
          className="modal__tags__buttons--inactive"
        >
          Skip
        </Button>
        <Button
          onClick={() => valueSetter("Relationship")}
          className={
            value === "Relationship"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Relationship
        </Button>
        <Button
          onClick={() => valueSetter("Something casual")}
          className={
            value === "Something casual"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Something casual
        </Button>
        <Button
          onClick={() => valueSetter("Don't know yet")}
          className={
            value === "Don't know yet"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Don't know yet
        </Button>
        <Button
          onClick={() => valueSetter("Marriage")}
          className={
            value === "Marriage"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Marriage
        </Button>
      </div>
    </div>
  );
};

const KidsModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState(props.value[6].value);
  const valueSetter = (v) => {
    props.value[6].value = v;
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "infoTags", "kids");
      await updateDoc(userRef, {
        value: v,
      });
      props.close();
    }
    updateData();
  };
  return (
    <div className="modal__tags">
      <ChildFriendlyIcon />
      <h1 className="modal__tags__title">
        What are your ideal plans for children?
      </h1>
      <div className="modal__tags__buttons">
        <Button
          onClick={() => valueSetter("null")}
          className="modal__tags__buttons--inactive"
        >
          Skip
        </Button>
        <Button
          onClick={() => valueSetter("Want someday")}
          className={
            value === "Want someday"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Want someday
        </Button>
        <Button
          onClick={() => valueSetter("Don't want")}
          className={
            value === "Don't want"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Don't want
        </Button>
        <Button
          onClick={() => valueSetter("Have & want more")}
          className={
            value === "Have & want more"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Have &amp; want more
        </Button>
        <Button
          onClick={() => valueSetter("Have & don't want more")}
          className={
            value === "Have & don't want more"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Have &amp; don't want more
        </Button>
        <Button
          onClick={() => valueSetter("Not sure yet")}
          className={
            value === "Not sure yet"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Not sure yet
        </Button>
      </div>
    </div>
  );
};

const ZodiacModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState(props.value[7].value);
  const valueSetter = (v) => {
    props.value[7].value = v;
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "infoTags", "starSign");
      await updateDoc(userRef, {
        value: v,
      });
      props.close();
    }
    updateData();
  };
  return (
    <div className="modal__tags">
      <InsightsIcon />
      <h1 className="modal__tags__title">What's your zodiac sign?</h1>
      <div className="modal__tags__buttons">
        <Button
          onClick={() => valueSetter("null")}
          className="modal__tags__buttons--inactive"
        >
          Skip
        </Button>
        <Button
          onClick={() => valueSetter("Aries")}
          className={
            value === "Aries"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Aries
        </Button>
        <Button
          onClick={() => valueSetter("Taurus")}
          className={
            value === "Taurus"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Taurus
        </Button>
        <Button
          onClick={() => valueSetter("Gemini")}
          className={
            value === "Gemini"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Gemini
        </Button>
        <Button
          onClick={() => valueSetter("Cancer")}
          className={
            value === "Cancer"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Cancer
        </Button>
        <Button
          onClick={() => valueSetter("Leo")}
          className={
            value === "Leo"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Leo
        </Button>
        <Button
          onClick={() => valueSetter("Libra")}
          className={
            value === "Libra"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Libra
        </Button>
        <Button
          onClick={() => valueSetter("Scorpio")}
          className={
            value === "Scorpio"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Scorpio
        </Button>
        <Button
          onClick={() => valueSetter("Sagittarius")}
          className={
            value === "Sagittarius"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Sagittarius
        </Button>
        <Button
          onClick={() => valueSetter("Capricorn")}
          className={
            value === "Capricorn"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Capricorn
        </Button>
        <Button
          onClick={() => valueSetter("Aquarius")}
          className={
            value === "Aquarius"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Aquarius
        </Button>
        <Button
          onClick={() => valueSetter("Pisces")}
          className={
            value === "Pisces"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Pisces
        </Button>
      </div>
    </div>
  );
};

const PoliticsModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState(props.value[8].value);
  const valueSetter = (v) => {
    props.value[8].value = v;
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "infoTags", "politics");
      await updateDoc(userRef, {
        value: v,
      });
      props.close();
    }
    updateData();
  };
  return (
    <div className="modal__tags">
      <AccountBalanceIcon />
      <h1 className="modal__tags__title">
        What's are your political learnings?
      </h1>
      <div className="modal__tags__buttons">
        <Button
          onClick={() => valueSetter("null")}
          className="modal__tags__buttons--inactive"
        >
          Skip
        </Button>
        <Button
          onClick={() => valueSetter("Apolitical")}
          className={
            value === "Apolitical"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Apolitical
        </Button>
        <Button
          onClick={() => valueSetter("Moderate")}
          className={
            value === "Moderate"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Moderate
        </Button>
        <Button
          onClick={() => valueSetter("Left")}
          className={
            value === "Left"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Left
        </Button>
        <Button
          onClick={() => valueSetter("Right")}
          className={
            value === "Right"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Right
        </Button>
        <Button
          onClick={() => valueSetter("Communist")}
          className={
            value === "Communist"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Communist
        </Button>
        <Button
          onClick={() => valueSetter("Socialist")}
          className={
            value === "Socialist"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Socialist
        </Button>
      </div>
    </div>
  );
};

const ReligionModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState(props.value[9].value);
  const valueSetter = (v) => {
    props.value[9].value = v;
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "infoTags", "religion");
      await updateDoc(userRef, {
        value: v,
      });
      props.close();
    }
    updateData();
  };
  return (
    <div className="modal__tags">
      <SoapIcon />
      <h1 className="modal__tags__title">Do you identify with a religion?</h1>
      <div className="modal__tags__buttons">
        <Button
          onClick={() => valueSetter("null")}
          className="modal__tags__buttons--inactive"
        >
          Skip
        </Button>
        <Button
          onClick={() => valueSetter("Agnostic")}
          className={
            value === "Agnostic"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Agnostic
        </Button>
        <Button
          onClick={() => valueSetter("Atheist")}
          className={
            value === "Atheist"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Atheist
        </Button>
        <Button
          onClick={() => valueSetter("Buddhist")}
          className={
            value === "Buddhist"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Buddhist
        </Button>
        <Button
          onClick={() => valueSetter("Catholic")}
          className={
            value === "Catholic"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Catholic
        </Button>
        <Button
          onClick={() => valueSetter("Christian")}
          className={
            value === "Christian"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Christian
        </Button>
        <Button
          onClick={() => valueSetter("Hindu")}
          className={
            value === "Hindu"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Hindu
        </Button>
        <Button
          onClick={() => valueSetter("Jain")}
          className={
            value === "Jain"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Jain
        </Button>
        <Button
          onClick={() => valueSetter("Jewish")}
          className={
            value === "Jewish"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Jewish
        </Button>
        <Button
          onClick={() => valueSetter("Mormon")}
          className={
            value === "Mormon"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Mormon
        </Button>
        <Button
          onClick={() => valueSetter("Muslim")}
          className={
            value === "Muslim"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Muslim
        </Button>
        <Button
          onClick={() => valueSetter("Zoroastrianism")}
          className={
            value === "Zoroastrianism"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Zoroastrianism
        </Button>
        <Button
          onClick={() => valueSetter("Sikh")}
          className={
            value === "Sikh"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Sikh
        </Button>
        <Button
          onClick={() => valueSetter("Spiritual")}
          className={
            value === "Spiritual"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Spiritual
        </Button>
        <Button
          onClick={() => valueSetter("Other")}
          className={
            value === "Other"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Other
        </Button>
      </div>
    </div>
  );
};

const GenderModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState(props.value[10].value);
  const valueSetter = (v) => {
    props.value[10].value = v;
    async function updateData() {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const adminRef = doc(db, "users", "admin");
      const adminSnap = await getDoc(adminRef);
      const userInterests = adminSnap.data().userInterests;
      userInterests[userSnap.data().adminI].gender = v;
      await updateDoc(userRef, {
        gender: v,
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
      <h1 className="modal__tags__title">Which gender do you identify with?</h1>
      <div className="modal__tags__buttons">
        <Button
          onClick={() => valueSetter("Man")}
          className={
            value === "Man"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Man
        </Button>
        <Button
          onClick={() => valueSetter("Woman")}
          className={
            value === "Woman"
              ? "modal__tags__buttons--active"
              : "modal__tags__buttons--inactive"
          }
        >
          Woman
        </Button>
      </div>
    </div>
  );
};

const LivesInModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState(props.value[11].value);
  const valueSetter = (v, x) => {
    props.value[11].value = v;
    async function updateData() {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const adminRef = doc(db, "users", "admin");
      const adminSnap = await getDoc(adminRef);
      const userInterests = adminSnap.data().userInterests;
      userInterests[userSnap.data().adminI].livesInLoc = [x[1], x[0]];
      await updateDoc(userRef, {
        livesIn: v,
        livesInLoc: [x[1], x[0]],
      });
      await updateDoc(adminRef, {
        userInterests: userInterests,
      });
      props.close();
    }
    updateData();
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
    <div className="modal__tags">
      <h1 className="modal__tags__title">Where do you currently reside?</h1>
      <div className="modal__tags__buttons modal__tags__buttons__location">
        <ge-autocomplete api_key="ge-49164db40a81bfce"></ge-autocomplete>
      </div>
    </div>
  );
};

const FromModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState(props.value[12].value);
  const valueSetter = (v) => {
    props.value[12].value = v;
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "infoTags", "from");
      await updateDoc(userRef, {
        value: v,
      });
      props.close();
    }
    updateData();
  };

  useEffect(() => {
    const el = document.querySelector("ge-autocomplete");
    el.addEventListener("select", ({ detail, currentTarget }) => {
      valueSetter(detail.properties.label);
    });

    return () => {
      el.removeEventListener("select", ({ detail, currentTarget }) => {
        console.log("change", currentTarget);
        console.log(detail);
      });
    };
  }, []);

  return (
    <div className="modal__tags">
      <h1 className="modal__tags__title">Where are you from?</h1>
      <div className="modal__tags__buttons modal__tags__buttons__location">
        <Button
          onClick={() => valueSetter("null")}
          className="modal__tags__buttons--inactive"
          sx={{ marginBottom: "2rem" }}
        >
          Skip
        </Button>
        <ge-autocomplete api_key="ge-49164db40a81bfce"></ge-autocomplete>
      </div>
    </div>
  );
};

const WorkAddModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const { register, handleSubmit } = useForm();
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const workForm = useRef();
  const handleCancel = (e) => {
    e.preventDefault();
    setCompany("");
    setTitle("");
    props.close();
  };
  const handleSave = (e) => {
    // e.preventDefault();
    props.value[13].value.push(`${title} at ${company}`);
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "cardInfo", "work");
      await updateDoc(userRef, {
        companies: arrayUnion(company),
        titles: arrayUnion(title),
      });
      props.close();
    }
    updateData();
  };
  return (
    <div className="modal__tags">
      <h1 className="modal__tags__title">Add a job</h1>
      <div className="modal__tags__buttons">
        <form ref={workForm} className="modal__tags__form">
          <input
            className="modal__tags__form__input"
            {...register("title", { required: true })}
            text="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="modal__tags__form__input"
            {...register("company", { required: true })}
            text="text"
            value={company}
            placeholder="Company"
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <div className="modal__tags__form__buttons">
            <input onClick={handleCancel} type="submit" value="Cancel" />
            <input
              onClick={handleSubmit(handleSave)}
              type="submit"
              value="Save"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const WorkEditModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const { register, handleSubmit } = useForm();
  const atIndex = props.value[13].value[props.current]?.indexOf(" at ");
  const [company, setCompany] = useState(
    props.value[13].value[props.current]?.substring(atIndex + 4)
  );
  const [title, setTitle] = useState(
    props.value[13].value[props.current]?.substring(0, atIndex)
  );
  const workForm = useRef();
  const handleCancel = (e) => {
    e.preventDefault();
    props.value[13].value.splice(props.current, 1);
    const companies = props.value[13].value.map((c) => {
      const ai = c.indexOf(" at ");
      return c.substring(ai + 4);
    });
    const titles = props.value[13].value.map((c) => {
      const ai = c.indexOf(" at ");
      return c.substring(0, ai);
    });
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "cardInfo", "work");
      const userRef2 = doc(db, "users", user.uid, "cardInfo", "aboutMe");
      await updateDoc(userRef, {
        companies: companies,
        titles: titles,
      });
      await updateDoc(userRef2, {
        currentCompany: "null",
        currentTitle: "null",
      });
      props.close();
    }
    updateData();
  };
  const handleSave = (e) => {
    props.value[13].value[props.current] = `${title} at ${company}`;
    const companies = props.value[13].value.map((c) => {
      const ai = c.indexOf(" at ");
      return c.substring(ai + 4);
    });
    const titles = props.value[13].value.map((c) => {
      const ai = c.indexOf(" at ");
      return c.substring(0, ai);
    });
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "cardInfo", "work");
      await updateDoc(userRef, {
        companies: companies,
        titles: titles,
      });
      props.close();
    }
    updateData();
  };
  return (
    <div className="modal__tags">
      <h1 className="modal__tags__title">Edit job</h1>
      <div className="modal__tags__buttons">
        <form ref={workForm} className="modal__tags__form">
          <input
            className="modal__tags__form__input"
            {...register("title", { required: true })}
            text="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="modal__tags__form__input"
            {...register("company", { required: true })}
            text="text"
            value={company}
            placeholder="Company"
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <div className="modal__tags__form__buttons">
            <input onClick={handleCancel} type="submit" value="Remove" />
            <input
              onClick={handleSubmit(handleSave)}
              type="submit"
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const EducationAddModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const { register, handleSubmit } = useForm();
  const [Institution, setInstitution] = useState("");
  const [Year, setYear] = useState("");
  const workForm = useRef();
  const handleCancel = (e) => {
    e.preventDefault();
    setInstitution("");
    setYear("");
    props.close();
  };
  const handleSave = (e) => {
    // e.preventDefault();
    props.value[14].value.push(`${Institution} ${Year}`);
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "cardInfo", "education");
      await updateDoc(userRef, {
        institutions: arrayUnion(Institution),
        graduationYears: arrayUnion(Year),
      });
      props.close();
    }
    updateData();
  };
  return (
    <div className="modal__tags">
      <h1 className="modal__tags__title">Add education</h1>
      <div className="modal__tags__buttons">
        <form ref={workForm} className="modal__tags__form">
          <input
            className="modal__tags__form__input"
            {...register("Institution", { required: true })}
            text="text"
            value={Institution}
            placeholder="Institution"
            onChange={(e) => setInstitution(e.target.value)}
            required
          />
          <input
            className="modal__tags__form__input"
            {...register("Year", { required: true })}
            text="text"
            value={Year}
            placeholder="Year"
            onChange={(e) => setYear(e.target.value)}
            required
          />
          <div className="modal__tags__form__buttons">
            <input onClick={handleCancel} type="submit" value="Cancel" />
            <input
              onClick={handleSubmit(handleSave)}
              type="submit"
              value="Save"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const EducationEditModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const { register, handleSubmit } = useForm();
  const atIndex = props.value[14].value[props.current]?.lastIndexOf(" ");
  const [Institution, setInstitution] = useState(
    props.value[14].value[props.current]?.substring(0, atIndex)
  );
  const [Year, setYear] = useState(
    props.value[14].value[props.current]?.substring(atIndex + 1)
  );
  const workForm = useRef();
  const handleCancel = (e) => {
    e.preventDefault();
    props.value[14].value.splice(props.current, 1);
    const institutions = props.value[14].value.map((c) => {
      const ai = c.lastIndexOf(" ");
      return c.substring(0, ai);
    });
    const graduationYears = props.value[14].value.map((c) => {
      const ai = c.lastIndexOf(" ");
      return c.substring(ai + 1);
    });
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "cardInfo", "education");
      const userRef2 = doc(db, "users", user.uid, "cardInfo", "aboutMe");
      await updateDoc(userRef, {
        graduationYears: graduationYears,
        institutions: institutions,
      });
      await updateDoc(userRef2, {
        currentInstitution: "null",
        currentGraduationYear: "null",
      });
      props.close();
    }
    updateData();
  };
  const handleSave = (e) => {
    // e.preventDefault();
    props.value[14].value[props.current] = `${Institution} ${Year}`;
    const institutions = props.value[14].value.map((c) => {
      const ai = c.lastIndexOf(" ");
      return c.substring(0, ai);
    });
    const graduationYears = props.value[14].value.map((c) => {
      const ai = c.lastIndexOf(" ");
      return c.substring(ai + 1);
    });
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "cardInfo", "education");
      await updateDoc(userRef, {
        graduationYears: graduationYears,
        institutions: institutions,
      });
      props.close();
    }
    updateData();
  };
  return (
    <div className="modal__tags">
      <h1 className="modal__tags__title">Edit institution</h1>
      <div className="modal__tags__buttons">
        <form ref={workForm} className="modal__tags__form">
          <input
            className="modal__tags__form__input"
            {...register("Institution", { required: true })}
            text="text"
            value={Institution}
            placeholder="Institution"
            onChange={(e) => setInstitution(e.target.value)}
            required
          />
          <input
            className="modal__tags__form__input"
            {...register("Year", { required: true })}
            text="text"
            value={Year}
            placeholder="Year"
            onChange={(e) => setYear(e.target.value)}
            required
          />
          <div className="modal__tags__form__buttons">
            <input onClick={handleCancel} type="submit" value="Remove" />
            <input
              onClick={handleSubmit(handleSave)}
              type="submit"
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const ImageEditModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState(props.value[15].value);
  const uploadInputRef = useRef(null);
  const onChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    let img = new Image();
    let imgWidth, imgHeight;
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      imgWidth = img.width;
      imgHeight = img.height;
      console.log(imgWidth, imgHeight);
      const maxHeight = imgWidth >= 1050 ? 1050 : 1680;
      const maxWidth = imgHeight >= 1050 ? 1050 : 1680;
      console.log(maxWidth, maxHeight);
      if (imgWidth >= 500 && imgHeight >= 500) {
        new Compressor(file, {
          minHeight: 500,
          minwidth: 500,
          maxHeight: maxHeight,
          maxWidth: maxWidth,
          success(result) {
            const tstp = Timestamp.now().seconds;
            const userStorageRef = ref(
              storage,
              `userImages/${user.uid}-${tstp}.jpg`
            );
            uploadBytes(userStorageRef, result).then((snapshot) => {
              console.log("Uploaded a blob or file!");
              props.close();
            });
            props.value[15].value.push(`${user.uid}-${tstp}.jpg`);
            props.value[15].value.splice(props.current, 1);
            console.log(props.value[15].value);
            async function updateData() {
              const userRef = doc(db, "users", user.uid, "cardInfo", "images");
              const wait = async () => {
                return await updateDoc(userRef, {
                  urls: props.value[15].value,
                });
              };
              wait();
            }
            updateData();
          },
          error(err) {
            console.error(err);
          },
        });
      }
    };
  };
  const handleDelete = () => {
    props.value[15].value.splice(props.current, 1);
    async function updateData() {
      const userRef = doc(db, "users", user.uid, "cardInfo", "images");
      const wait = async () => {
        return await updateDoc(userRef, {
          urls: props.value[15].value,
        });
      };
      wait.then(props.close());
    }
    updateData();
  };
  return (
    <div className="modal__tags">
      <h1 className="modal__tags__title">
        Are you sure you want to delete your photo?
      </h1>
      {/*inputProps={{ accept: "image/*" }} */}
      <div className="modal__tags__buttons">
        <Tooltip
          title={<h2>We accept JPGs and PNGs of at least 500x500px.</h2>}
          arrow
        >
          <Button
            onClick={() =>
              uploadInputRef.current && uploadInputRef.current.click()
            }
            className="modal__tags__buttons--active"
          >
            Update
            <input
              id="upload"
              ref={uploadInputRef}
              type="file"
              accept="image/*"
              onChange={onChange}
              hidden
            />
          </Button>
        </Tooltip>
        {/* <Input type="file" inputProps={{ accept: "image/*" }} /> */}
        <Button
          onClick={() => handleDelete()}
          className="modal__tags__buttons--inactive"
        >
          Delete
        </Button>
        <Button
          onClick={() => props.close()}
          className="modal__tags__buttons--inactive"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

const ImageAddModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState(props.value[15].value);
  const uploadInputRef = useRef(null);
  const onChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    let img = new Image();
    let imgWidth, imgHeight;
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      imgWidth = img.width;
      imgHeight = img.height;
      console.log(imgWidth, imgHeight);
      const maxHeight = imgWidth >= 1050 ? 1050 : 1680;
      const maxWidth = imgHeight >= 1050 ? 1050 : 1680;
      console.log(maxWidth, maxHeight);
      if (imgWidth >= 500 && imgHeight >= 500) {
        new Compressor(file, {
          minHeight: 500,
          minwidth: 500,
          maxHeight: maxHeight,
          maxWidth: maxWidth,
          success(result) {
            const tstp = Timestamp.now().seconds;
            const userStorageRef = ref(
              storage,
              `userImages/${user.uid}-${tstp}.jpg`
            );
            uploadBytes(userStorageRef, result).then((snapshot) => {
              console.log("Uploaded a blob or file!");
              props.close();
            });
            props.value[15].value.push(`${user.uid}-${tstp}.jpg`);
            // props.value[15].value.splice(props.current, 1);
            console.log(props.value[15].value);
            async function updateData() {
              const userRef = doc(db, "users", user.uid, "cardInfo", "images");
              const wait = async () => {
                return await updateDoc(userRef, {
                  urls: props.value[15].value,
                });
              };
              wait();
            }
            updateData();
          },
          error(err) {
            console.error(err);
          },
        });
      }
    };
  };
  return (
    <div className="modal__tags">
      <h1 className="modal__tags__title">
        Are you sure you want to delete your photo?
      </h1>
      {/*inputProps={{ accept: "image/*" }} */}
      <div className="modal__tags__buttons">
        <Tooltip
          title={<h2>We accept JPGs and PNGs of at least 500x500px.</h2>}
          arrow
        >
          <Button
            onClick={() =>
              uploadInputRef.current && uploadInputRef.current.click()
            }
            className="modal__tags__buttons--active"
          >
            Add
            <input
              id="upload"
              ref={uploadInputRef}
              type="file"
              accept="image/*"
              onChange={onChange}
              hidden
            />
          </Button>
        </Tooltip>
        {/* <Input type="file" inputProps={{ accept: "image/*" }} /> */}
        <Button
          onClick={() => props.close()}
          className="modal__tags__buttons--inactive"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default UserEditProfile;
