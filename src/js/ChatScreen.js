import React, { useState, useEffect } from "react";
import "../css/style.css";
import {
  Avatar,
  IconButton,
  Grow,
  ClickAwayListener,
  Popper,
  MenuItem,
  MenuList,
  Paper,
  Modal,
  Box,
  Typography,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import WarningIcon from "@mui/icons-material/Warning";
import FlagIcon from "@mui/icons-material/Flag";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import db, { storage } from "./firebase";
import { useStateValue } from "./StateProvider";
import ProfileCard from "./ProfileCard";
import { grey } from "@mui/material/colors";

function ChatScreen() {
  const senderImage =
    "https://gooddoggies.online/wp-content/uploads/2020/06/5-Tips-To-Training-A-Labrador-Puppy-1.jpg";
  const [{ user }, dispatch] = useStateValue();
  const [open, setOpen] = React.useState(false);
  const [modalReportOpen, setModalReportOpen] = useState(false);
  const [modalBlockOpen, setModalBlockOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [senderId, setSenderId] = useState("");
  const [messages, setMessages] = useState([]);
  const [docr, setDocr] = useState(Timestamp.fromDate(new Date()));
  const [pPRef, setPPRef] = useState(null);
  const [roomActive, setRoomActive] = useState(true);
  const [roomInactiveReason, setRoomInactiveReason] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function setChatScreen() {
      if (roomId) {
        const docRef = doc(db, "rooms", roomId);
        const docSnap = await getDoc(docRef);
        let senderInd = docSnap.data().senders.indexOf(user.uid);
        senderInd = senderInd ? 0 : 1;
        setRoomName(docSnap.data().senderNames[senderInd]);
        setSenderId(docSnap.data().senders[senderInd]);
        // setRoomName(docSnap.data().name);
        setDocr(docSnap.data().doc);
        setRoomActive(docSnap.data().active);
        setRoomInactiveReason(docSnap.data().inactiveReason);

        const msgsQuery = query(
          collection(db, "rooms", roomId, "messages"),
          orderBy("timestamp", "asc")
        );
        const msgsSnap = onSnapshot(msgsQuery, (snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
        const userSnap = await getDoc(
          doc(db, "users", docSnap.data().senders[senderInd])
        );
        const img = userSnap.data().profilePic;
        getDownloadURL(ref(storage, `userImages/${img}`))
          .then((url) => {
            setPPRef(url);
          })
          .catch((error) => {
            console.error(error);
          });
        // const msgsSnap = await getDocs(msgsRef);
      }
    }
    setChatScreen();
  }, [roomId]);

  const handleSend = (e) => {
    e.preventDefault();
    (async function () {
      await addDoc(collection(db, "rooms", roomId, "messages"), {
        message: input,
        senderId: user.uid,
        timestamp: serverTimestamp(),
      });

      // const flm = input.length > 18 ? input.substring(0, 18) + "..." : input;
      setDoc(doc(db, "rooms", roomId), { lastMessage: input }, { merge: true });
    })();
    setInput("");
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + ampm;
    return strTime;
  }

  function formatDate() {
    const date = docr.toDate();
    const datee = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return datee;
  }

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

  const [modalOpen, setModalOpen] = React.useState(false);
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

  //get generatedList from current user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "rooms", roomId);
        const docSnap = await getDoc(docRef);
        let senderInd = docSnap.data().senders.indexOf(user.uid);
        senderInd = senderInd ? 0 : 1;
        setgeneratedId(docSnap.data().senders[senderInd]);
        const userSnap = await getDoc(
          doc(db, "users", docSnap.data().senders[senderInd])
        );
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
  }, [roomId]);

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

  const handleReportOpen = () => {
    setModalReportOpen(true);
  };

  const handleReportCloser = () => {
    setModalReportOpen(false);
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
          against: senderId,
          at: serverTimestamp(),
        });
      }
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        roomsList: arrayRemove(roomId),
        skipList: arrayUnion(senderId),
        matchList: arrayRemove(senderId),
      });
      const roomRef = doc(db, "rooms", roomId);
      await updateDoc(roomRef, {
        active: false,
        inactiveReason: "User has unmatched.",
      });
      navigate("/app");
    }

    updateData();
  };
  const getPerson = () => {
    if (!setBool) {
      setSetBool(true);

      // console.log(geeratedName);
      return people[0];
    }
    return people[0];
  };
  return (
    <div className="chatScreen">
      <div className="chatScreen__header">
        <div
          className="chatScreen__header__userProfile"
          onClick={handleModalOpen}
        >
          <Avatar
            className="chatScreen__header__user__profilePic"
            src={pPRef}
            alt={messages.name}
          />
          <div className="chatScreen__header__user__name">
            {/* {messages[0].name} */}
            {roomName}
          </div>
        </div>

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
        <div className="chatScreen__header__icons">
          <div>
            <IconButton
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              size="large"
              className="options__button"
              onClick={handleToggle}
            >
              <MoreVertIcon
                fontSize="large"
                className="chatScreen__header__icon"
              />
            </IconButton>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleReportOpen}>Unmatch</MenuItem>
                        <MenuItem onClick={handleBlockOpen}>
                          Block &amp; Report
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
          <Link to="/app">
            <IconButton size="large">
              <CloseIcon
                fontSize="large"
                className="chatScreen__header__icon"
              />
            </IconButton>
          </Link>
          <Modal
            open={modalReportOpen}
            onClose={handleReportCloser}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal"
          >
            <Box className="modal__container">
              <div className="modal__tags">
                <h1 className="modal__tags__title">Everything Ok?</h1>
                <p style={{ fontSize: "1.6rem" }}>
                  {`Help us keep the community safe by telling us if there's a reason
                  why you've unmatched. Don't worry, this is anonymous.`}
                </p>
                <div className="modal__tags__buttons">
                  <Button
                    onClick={() => reportHandler(null)}
                    className="modal__tags__buttons--inactive--report"
                  >
                    <NotInterestedIcon /> I'm just not interested
                  </Button>
                  <Button
                    onClick={() => reportHandler("Made me uncomfortable")}
                    className="modal__tags__buttons--inactive--report"
                  >
                    <SentimentDissatisfiedIcon /> Made me uncomfortable
                  </Button>
                  <Button
                    onClick={() => reportHandler("Abusive or threatening")}
                    className="modal__tags__buttons--inactive--report"
                  >
                    <AnnouncementIcon /> Abusive or threatening
                  </Button>
                  <Button
                    onClick={() => reportHandler("Inappropriate content")}
                    className="modal__tags__buttons--inactive--report"
                  >
                    <WarningIcon />
                    Inappropriate content
                  </Button>
                  <Button
                    onClick={() => reportHandler("Spam or scam")}
                    className="modal__tags__buttons--inactive--report"
                  >
                    <FlagIcon /> Spam or scam
                  </Button>
                  <Button
                    onClick={() => reportHandler("Stolen Photo")}
                    className="modal__tags__buttons--inactive--report"
                  >
                    <CameraAltIcon />
                    Stolen photo
                  </Button>
                </div>
              </div>
            </Box>
          </Modal>
          <Modal
            open={modalBlockOpen}
            onClose={handleBlockCloser}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal"
          >
            <Box className="modal__container">
              <div className="modal__tags">
                <h1 className="modal__tags__title">Tell us what happened</h1>
                <p style={{ fontSize: "1.6rem" }}>
                  {`Help us keep the Community safe by telling us why you're blocking this user. Don't worry, this is anonymous.`}
                </p>
                <div className="modal__tags__buttons">
                  <Button
                    onClick={() => reportHandler("Made me uncomfortable")}
                    className="modal__tags__buttons--inactive--report"
                  >
                    <SentimentDissatisfiedIcon /> Made me uncomfortable
                  </Button>
                  <Button
                    onClick={() => reportHandler("Abusive or threatening")}
                    className="modal__tags__buttons--inactive--report"
                  >
                    <AnnouncementIcon /> Abusive or threatening
                  </Button>
                  <Button
                    onClick={() => reportHandler("Inappropriate content")}
                    className="modal__tags__buttons--inactive--report"
                  >
                    <WarningIcon />
                    Inappropriate content
                  </Button>
                  <Button
                    onClick={() => reportHandler("Spam or scam")}
                    className="modal__tags__buttons--inactive--report"
                  >
                    <FlagIcon /> Spam or scam
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
      </div>
      <div className="chatScreen__chatbody">
        <div className="chatScreen__clearSpace"></div>
        <div className="chatScreen__chat">
          <p className="chatScreen__timestart">
            {`YOU MATCHED WITH ${roomName.toUpperCase()} ON ${formatDate()}`}
          </p>
          {messages.map((message) =>
            message.senderId !== user.uid ? (
              <div className="chatScreen__message">
                <p className="chatScreen__text">
                  {message.message}
                  <span className="chatScreen__timestamp">
                    {formatTime(new Date(message.timestamp?.toDate()))}
                  </span>
                </p>
              </div>
            ) : (
              <div className="chatScreen__message">
                <p className="chatScreen__text--reciever">
                  {message.message}
                  <span className="chatScreen__timestamp">
                    {formatTime(new Date(message.timestamp?.toDate()))}
                  </span>
                </p>
              </div>
            )
          )}
        </div>
      </div>

      <div className="chatScreen__footer">
        {roomActive ? (
          <form className="chatScreen__form">
            <input
              className="chatScreen__input"
              type="text"
              value={input}
              placeholder="Type a message"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={handleSend}
              type="submit"
              className="chatScreen__button"
            >
              SEND
            </button>
          </form>
        ) : (
          <div className="chatScreen__form">
            <h5>{roomInactiveReason}</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatScreen;
