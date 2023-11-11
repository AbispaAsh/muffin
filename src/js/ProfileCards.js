import React, { useState, useEffect } from "react";
import "../css/style.css";
import axiosInstance from "./axios";
import ProfileCard from "./ProfileCard";
import Logo from "../img/logo-pink-small-2x.png";
import { Link, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  serverTimestamp,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import db, { storage } from "./firebase";
import { useStateValue } from "./StateProvider";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import WarningIcon from "@mui/icons-material/Warning";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { Box, Button, IconButton, Modal, Tooltip } from "@mui/material";

function ProfileCards() {
  const [modalBlockOpen, setModalBlockOpen] = useState(false);
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
  const [{ user }, dispatch] = useStateValue();
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
  ]);
  const [infoTags, setInfoTags] = useState([
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
  const [generatedId, setgeneratedId] = useState("");
  const [generatedName, setgeneratedName] = useState("");
  const [generatedLivesIn, setgeneratedLivesIn] = useState("");
  const [generatedDob, setgeneratedDob] = useState(
    Timestamp.fromDate(new Date())
  );
  const [imgRefs, setImgRefs] = useState([]);
  const [setBool, setSetBool] = useState(false);
  const [allOver, setAllOver] = useState(false);
  const [next, setNext] = useState(1);

  //get generatedList from current user
  useEffect(() => {
    const fetchData = async () => {
      try {
        let docSnap = await getDoc(doc(db, "users", user.uid));
        let userGenratedList = docSnap.data().generatedList;
        if (userGenratedList.length === 0) {
          if (userGenratedList.length === 0) {
            setAllOver(true);
            return;
          }
        }
        setAllOver(false);
        console.log(userGenratedList);
        setgeneratedId(userGenratedList[0]);
        const userSnap = await getDoc(doc(db, "users", userGenratedList[0]));
        const cardUser = userSnap.data();
        setgeneratedName(cardUser.name);
        setgeneratedDob(cardUser.dob);
        setgeneratedLivesIn(cardUser.livesIn);
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
          setInfoTags(
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
  }, [next]);

  useEffect(() => {
    const age = Math.trunc(
      (Timestamp.now().toDate() - generatedDob.toDate()) /
        (1000 * 60 * 60 * 24 * 365.25)
    );
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
          height: infoTags[4].value,
          exercise: infoTags[2].value,
          educationLevel: infoTags[1].value,
          drinking: infoTags[0].value,
          smoking: infoTags[9].value,
          lookingFor: infoTags[6].value,
          kids: infoTags[5].value,
          starSign: infoTags[10].value,
          politics: infoTags[7].value,
          religion: infoTags[8].value,
        },
        from: infoTags[3].value,
        livesIn: generatedLivesIn,
      },
    ]);
  }, [
    generatedId,
    generatedName,
    generatedLivesIn,
    cardInfo,
    infoTags,
    generatedDob,
  ]);

  //get all user cardInfo from first id in generatedList

  const swiped = (direction, nameToDelete) => {
    console.log("removing " + nameToDelete);
    // setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const getPerson = () => {
    return people[0];
  };

  // BUTTON FUNCTIONALITY

  const navigate = useNavigate();

  const reset = () => {
    setgeneratedId("");
    setPeople([
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
    setCardInfo([
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
    ]);
    setInfoTags([
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
    setgeneratedName("");
    setgeneratedLivesIn("");
    setgeneratedDob(Timestamp.fromDate(new Date()));
    setNext(next + 1);
  };

  const handleSkip = () => {
    if (people[0].id.length > 0) {
      (async () => {
        const cardUserRef = doc(db, "users", user.uid);
        const cardCUserRef = doc(db, "users", people[0].id);
        await updateDoc(cardUserRef, {
          skipList: arrayUnion(people[0].id),
        });
        await updateDoc(cardUserRef, {
          generatedList: arrayRemove(people[0].id),
        });
        await updateDoc(cardCUserRef, {
          likeList: arrayRemove(user.uid),
        });
        reset();
      })();
    }
  };

  const handleLike = () => {
    if (people[0].id.length > 0) {
      (async () => {
        const cardUserRef = doc(db, "users", user.uid);
        const cardCUserRef = doc(db, "users", people[0].id);
        await updateDoc(cardUserRef, {
          generatedList: arrayRemove(people[0].id),
        });

        // if both like, make room
        const cardUserSnap = await getDoc(cardUserRef);
        const cardCUserSnap = await getDoc(cardCUserRef);
        if (cardCUserSnap.data().likeList.includes(user.uid)) {
          const docRef = await addDoc(collection(db, "rooms"), {
            doc: Timestamp.fromDate(new Date()),
            lastMessage: "niYPcJPHqvKoqugCGjMi",
            senderNames: [cardUserSnap.data().name, cardCUserSnap.data().name],
            senders: [user.uid, people[0].id],
            active: true,
            inactiveReason: "",
          });
          await updateDoc(cardCUserRef, {
            likeList: arrayRemove(user.uid),
            matchList: arrayUnion(user.uid),
          });
          await updateDoc(cardCUserRef, {
            roomsList: arrayUnion(docRef.id),
          });
          await updateDoc(cardUserRef, {
            roomsList: arrayUnion(docRef.id),
            matchList: arrayUnion(people[0].id),
          });
          navigate(`/app/chat/${docRef.id}`);
        } else {
          await updateDoc(cardUserRef, {
            likeList: arrayUnion(people[0].id),
          });
          await updateDoc(cardCUserRef, {
            generatedList: arrayUnion(user.uid),
          });
        }
        reset();
      })();
    }
  };

  const handleBlockOpen = () => {
    setModalBlockOpen(true);
  };

  const handleBlockCloser = () => {
    setModalBlockOpen(false);
  };

  const reportHandler = (v) => {
    async function updateData() {
      if (v) {
        await addDoc(collection(db, "reports"), {
          report: v,
          by: user.uid,
          against: generatedId,
          at: serverTimestamp(),
        });
      }
    }
    updateData();
    handleSkip();
    setModalBlockOpen(false);
  };

  return (
    <div className="profileCards">
      <div className="profileCards__header">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      {allOver && (
        <div className="profileCards__cardEnd">
          That's it for today!&nbsp;
          <DoneAllIcon />
        </div>
      )}
      {!allOver && (
        <div className="profileCards__cardContainer">
          {people[0].name.length > 0 &&
            people[0].id.length > 0 &&
            people[0].aboutMe.length > 0 &&
            people[0].urls.length > 0 &&
            people[0].infoTags.height.length > 0 && (
              <ProfileCard person={getPerson()} />
            )}
        </div>
      )}
      {!allOver && (
        <div className="swipeButtons">
          <p onClick={() => handleBlockOpen()} className="swipeButtons__report">
            <FlagOutlinedIcon />
            Block &amp; report
          </p>
          <div className="swipeButtons__swipe">
            <IconButton
              onClick={handleSkip}
              className="swipeButtons__left"
              // disabled={
              //   people[0].name.length > 0 &&
              //   people[0].id.length > 0 &&
              //   people[0].aboutMe.length > 0 &&
              //   people[0].urls.length > 0 &&
              //   people[0].infoTags.height.length > 0
              //     ? false
              //     : true
              // }
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              onClick={handleLike}
              className="swipeButtons__right"
              // disabled={props.disable[0].value}
            >
              <FavoriteIcon />
            </IconButton>
          </div>
          <div className="swipeButtons__instruction">
            <Tooltip title={<h2>Skip</h2>} arrow>
              <ArrowLeftIcon />
            </Tooltip>
            <Tooltip title={<h2>Scroll down</h2>} arrow>
              <ArrowDropUpIcon />
            </Tooltip>
            <Tooltip title={<h2>Scroll up</h2>} arrow>
              <ArrowDropDownIcon />
            </Tooltip>
            <Tooltip title={<h2>Like</h2>} arrow>
              <ArrowRightIcon />
            </Tooltip>
          </div>
          <Modal
            open={modalBlockOpen}
            onClose={handleBlockCloser}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal"
          >
            <Box className="modal__container">
              <div className="modal__tags">
                <h1 className="modal__tags__title">
                  What's wrong with this profile?
                </h1>
                <p style={{ fontSize: "1.6rem" }}>
                  {`Help us keep the Community safe by telling us why you're reporting or blocking this user. Don't worry, this is anonymous.`}
                </p>
                <div className="modal__tags__buttons">
                  <Button
                    onClick={() => reportHandler(null)}
                    className="modal__tags__buttons--inactive--report"
                  >
                    <VisibilityOffIcon /> I don't want them to see me
                  </Button>
                  <Button
                    onClick={() => reportHandler("Made me uncomfortable")}
                    className="modal__tags__buttons--inactive--report"
                  >
                    <SentimentDissatisfiedIcon /> Made me uncomfortable
                  </Button>
                  <Button
                    onClick={() => reportHandler("Inappropriate content")}
                    className="modal__tags__buttons--inactive--report"
                  >
                    <WarningIcon />
                    Inappropriate content
                  </Button>
                  <Button
                    onClick={() => reportHandler("Stolen photo")}
                    className="modal__tags__buttons--inactive--report"
                  >
                    <CameraAltIcon />
                    Stolen photo
                  </Button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default ProfileCards;
