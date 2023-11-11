import React, { useState, useEffect, useRef } from "react";
import "../css/style.css";
import { ref, getDownloadURL } from "firebase/storage";
import db, { storage } from "./firebase";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import StraightenIcon from "@mui/icons-material/Straighten";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SchoolIcon from "@mui/icons-material/School";
import WineBarIcon from "@mui/icons-material/WineBar";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import SearchIcon from "@mui/icons-material/Search";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ChurchIcon from "@mui/icons-material/Church";
import TransgenderIcon from "@mui/icons-material/Transgender";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HomeIcon from "@mui/icons-material/Home";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";

function ProfileCard({ person }) {
  // const [totalCards, setTotalCards] = useState(3);
  console.log(person);
  console.log(person.infoTags);
  const [infoTags, setInfoTags] = useState([
    {
      name: StraightenIcon,
      value: person.infoTags.height,
    },
    {
      name: FitnessCenterIcon,
      value: person.infoTags.exercise,
    },
    {
      name: SchoolIcon,
      value: person.infoTags.educationLevel,
    },
    {
      name: WineBarIcon,
      value: person.infoTags.drinking,
    },
    {
      name: SmokingRoomsIcon,
      value: person.infoTags.smoking,
    },
    {
      name: SearchIcon,
      value: person.infoTags.lookingFor,
    },
    {
      name: ChildFriendlyIcon,
      value: person.infoTags.kids,
    },
    {
      name: AutoAwesomeIcon,
      value: person.infoTags.starSign,
    },
    {
      name: AccountBalanceIcon,
      value: person.infoTags.politics,
    },
    {
      name: ChurchIcon,
      value: person.infoTags.religion,
    },
  ]);

  // 0;
  // ("Hc81hEbANKQb18HcWYdrSu7LFwt2-Img1.jpg");
  // 1;
  // ("Hc81hEbANKQb18HcWYdrSu7LFwt2-Img2.jpg");
  // 2;
  // ("Hc81hEbANKQb18HcWYdrSu7LFwt2-Img3.jpg");
  // 3;
  // ("Hc81hEbANKQb18HcWYdrSu7LFwt2-Img4.jpg");
  // 4;
  // ("Hc81hEbANKQb18HcWYdrSu7LFwt2-Img5.jpg");
  // 5;
  // ("Hc81hEbANKQb18HcWYdrSu7LFwt2-Img6.jpg");

  // "https://static.wikia.nocookie.net/youtube/images/7/76/Minx.jpg",
  // "https://www.dexerto.com/wp-content/uploads/2022/01/30/Minx-630x354.jpg",
  // "https://cdn-images.win.gg/wp/uploads/2021/08/minx-claps-back-against-xqcs-comments-about-her-ban-reason.jpg",
  // "https://www.gspdb.com/wp-content/uploads/2021/05/justaminx.jpg",
  // "https://networthandsalary.com/wp-content/uploads/2021/05/Justaminx-ins.jpg",
  // "https://thecelebritybirthday.com/wp-content/uploads/2022/01/JustaMinx-768x428.jpg",

  const [userImages, setUserImages] = useState([]);
  useEffect(() => {
    if (userImages.length === 0) {
      getDownloadURL(ref(storage, `userImages/${person.urls[0]}`))
        .then((url) => {
          setUserImages([...userImages, url]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (userImages.length === 1 && person.urls.length > 1) {
      getDownloadURL(ref(storage, `userImages/${person.urls[1]}`))
        .then((url) => {
          setUserImages([...userImages, url]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (userImages.length === 2 && person.urls.length > 2) {
      getDownloadURL(ref(storage, `userImages/${person.urls[2]}`))
        .then((url) => {
          setUserImages([...userImages, url]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (userImages.length === 3 && person.urls.length > 3) {
      getDownloadURL(ref(storage, `userImages/${person.urls[3]}`))
        .then((url) => {
          setUserImages([...userImages, url]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (userImages.length === 4 && person.urls.length > 4) {
      getDownloadURL(ref(storage, `userImages/${person.urls[4]}`))
        .then((url) => {
          setUserImages([...userImages, url]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (userImages.length === 5 && person.urls.length === 6) {
      getDownloadURL(ref(storage, `userImages/${person.urls[5]}`))
        .then((url) => {
          setUserImages([...userImages, url]);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // setUserImages(
    //   person.urls.map((URL) => {
    //     getDownloadURL(ref(storage, `userImages/${URL}`))
    //       .then((url) => {})
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   })
    // );
  }, [userImages]);
  const [answersList, setAnswerList] = useState(person.answers);
  const [questionsList, setQuestionsList] = useState(person.questions);
  const imgT = userImages.length;
  const aqT = answersList.length;
  const t = imgT + aqT;
  const totalCards = t === 1 ? 3 : t <= 3 ? 4 : t <= 5 ? 5 : t <= 7 ? 6 : 7;

  const cardRef = useRef();
  let i = 0;
  const handleKeyDown = (event) => {
    if (event.keyCode === 40) {
      i = i + 1 === 7 ? i : i + 1;
      if (i + 1 <= 7)
        cardRef.current.scrollTop =
          (cardRef.current.scrollHeight * i) / totalCards;
    } else if (event.keyCode === 38) {
      i = i <= 0 ? 0 : i - 1;
      if (i >= 0)
        cardRef.current.scrollTop =
          (cardRef.current.scrollHeight * i) / totalCards;
    }
  };

  var scrollingDirection = 0; //idle
  var lastScroll = 9999;
  var scrollIdleTime = 500; // time interval that we consider a new scroll event
  const handleWheel = (event) => {
    var delta = event.deltaY;
    var timeNow = performance.now();
    if (
      delta > 0 &&
      (scrollingDirection !== 1 || timeNow > lastScroll + scrollIdleTime)
    ) {
      i = i + 1 === 7 ? i : i + 1;
      if (i + 1 <= 7)
        cardRef.current.scrollTop =
          (cardRef.current.scrollHeight * i) / totalCards;
      scrollingDirection = 1;
    } else if (
      delta < 0 &&
      (scrollingDirection !== 2 || timeNow > lastScroll + scrollIdleTime)
    ) {
      i = i <= 0 ? 0 : i - 1;
      if (i >= 0)
        cardRef.current.scrollTop =
          (cardRef.current.scrollHeight * i) / totalCards;
      scrollingDirection = 2;
    }
    lastScroll = timeNow;
  };

  // useEffect(() => {}, [userImages.length, answersList.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel);

    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [t]);

  //
  return (
    <div className="profileCard">
      {userImages.length === person.urls.length ? (
        <div className="profileCard__container" ref={cardRef}>
          <img
            className="profileCard__img-1"
            src={userImages[0]}
            alt="profile-pic"
          />
          <div className="profileCard__card-1">
            <h1>
              {person.name.split(" ")[0]}, {person.age}
            </h1>
            {person.currentCompany !== "null" && (
              <h3>
                {person.currentTitle} at {person.currentCompany}
              </h3>
            )}
            {person.currentInstitution !== "null" && (
              <h3>
                {person.currentInstitution} {person.currentGraduationYear}
              </h3>
            )}
          </div>
          <div className="profileCard__card-2">
            <div className="profileCard__card-2--center">
              <h3 className="profileCard__about-header">
                <FormatQuoteIcon fontSize="large" />
                &nbsp;About {person.name.split(" ")[0]}
              </h3>
              <p className="profileCard__about">{person.aboutMe}</p>
              <div className="profileCard__infoTags">
                {infoTags.map((Tag) => {
                  if (Tag.value === "null") {
                    return <div></div>;
                  } else {
                    const CustomTag = Tag.name;
                    return (
                      <div className="profileCard__infoTag">
                        <CustomTag />
                        {Tag.value}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>

          {imgT === 1 && aqT === 1 && (
            <div className="profileCard__card-f">
              <div className="profileCard__card-f--center">
                <h3>{questionsList[0]}</h3>
                <p>{answersList[0]}</p>
              </div>
            </div>
          )}

          {imgT === 1 && aqT === 2 && (
            <div className="profileCard__card-4">
              <div className="profileCard__card-4--center">
                <h3>{questionsList[0]}</h3>
                <p>{answersList[0]}</p>
              </div>
            </div>
          )}
          {imgT === 1 && aqT === 2 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[1]}</h3>
                <p>{answersList[1]}</p>
              </div>
            </div>
          )}

          {imgT === 1 && aqT === 3 && (
            <div className="profileCard__card-4">
              <div className="profileCard__card-4--center">
                <h3>{questionsList[0]}</h3>
                <p>{answersList[0]}</p>
              </div>
            </div>
          )}
          {imgT === 1 && aqT === 3 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[1]}</h3>
                <p>{answersList[1]}</p>
              </div>
            </div>
          )}
          {imgT === 1 && aqT === 3 && (
            <div className="profileCard__card-f">
              <div className="profileCard__card-f--center">
                <h3>{questionsList[2]}</h3>
                <p>{answersList[2]}</p>
              </div>
            </div>
          )}

          {imgT === 2 && aqT === 0 && (
            <div className="profileCard__img-f">
              <img src={userImages[1]} alt="profile-pic" />
            </div>
          )}
          {imgT === 2 && aqT === 1 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 2 && aqT === 1 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[0]}</h3>
                <p>{answersList[0]}</p>
              </div>
            </div>
          )}
          {imgT === 2 && aqT === 2 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 2 && aqT === 2 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[0]}</h3>
                <p>{answersList[0]}</p>
              </div>
            </div>
          )}
          {imgT === 2 && aqT === 2 && (
            <div className="profileCard__card-f">
              <div className="profileCard__card-f--center">
                <h3>{questionsList[1]}</h3>
                <p>{answersList[1]}</p>
              </div>
            </div>
          )}
          {imgT === 2 && aqT === 3 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 2 && aqT === 3 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[0]}</h3>
                <p>{answersList[0]}</p>
              </div>
            </div>
          )}
          {imgT === 2 && aqT === 3 && (
            <div className="profileCard__card-4">
              <div className="profileCard__card-4--center">
                <h3>{questionsList[1]}</h3>
                <p>{answersList[1]}</p>
              </div>
            </div>
          )}
          {imgT === 2 && aqT === 3 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[2]}</h3>
                <p>{answersList[2]}</p>
              </div>
            </div>
          )}
          {imgT === 3 && aqT === 0 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 3 && aqT === 0 && (
            <img
              className="profileCard__img-2"
              src={userImages[2]}
              alt="profile-pic"
            />
          )}
          {imgT === 3 && aqT === 1 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 3 && aqT === 1 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[0]}</h3>
                <p>{answersList[0]}</p>
              </div>
            </div>
          )}
          {imgT === 3 && aqT === 1 && (
            <div className="profileCard__img-f">
              <img src={userImages[2]} alt="profile-pic" />
            </div>
          )}

          {imgT === 3 && aqT === 2 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 3 && aqT === 2 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[0]}</h3>
                <p>{answersList[0]}</p>
              </div>
            </div>
          )}
          {imgT === 3 && aqT === 2 && (
            <img
              className="profileCard__img-1"
              src={userImages[2]}
              alt="profile-pic"
            />
          )}
          {imgT === 3 && aqT === 2 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[1]}</h3>
                <p>{answersList[1]}</p>
              </div>
            </div>
          )}

          {imgT === 3 && aqT === 3 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 3 && aqT === 3 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[0]}</h3>
                <p>{answersList[0]}</p>
              </div>
            </div>
          )}
          {imgT === 3 && aqT === 3 && (
            <img
              className="profileCard__img-1"
              src={userImages[2]}
              alt="profile-pic"
            />
          )}
          {imgT === 3 && aqT === 3 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[1]}</h3>
                <p>{answersList[1]}</p>
              </div>
            </div>
          )}
          {imgT === 3 && aqT === 3 && (
            <div className="profileCard__card-f">
              <div className="profileCard__card-f--center">
                <h3>{questionsList[2]}</h3>
                <p>{answersList[2]}</p>
              </div>
            </div>
          )}

          {imgT === 4 && aqT === 0 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 4 && aqT === 0 && (
            <img
              className="profileCard__img-2"
              src={userImages[2]}
              alt="profile-pic"
            />
          )}
          {imgT === 4 && aqT === 0 && (
            <div className="profileCard__img-f">
              <img src={userImages[3]} alt="profile-pic" />
            </div>
          )}

          {imgT === 4 && aqT === 1 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 4 && aqT === 1 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[0]}</h3>
                <p>{answersList[0]}</p>
              </div>
            </div>
          )}
          {imgT === 4 && aqT === 1 && (
            <img
              className="profileCard__img-1"
              src={userImages[2]}
              alt="profile-pic"
            />
          )}
          {imgT === 4 && aqT === 1 && (
            <img
              className="profileCard__img-2"
              src={userImages[3]}
              alt="profile-pic"
            />
          )}

          {imgT === 4 && aqT === 2 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 4 && aqT === 2 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[0]}</h3>
                <p>{answersList[0]}</p>
              </div>
            </div>
          )}
          {imgT === 4 && aqT === 2 && (
            <img
              className="profileCard__img-1"
              src={userImages[2]}
              alt="profile-pic"
            />
          )}
          {imgT === 4 && aqT === 2 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[1]}</h3>
                <p>{answersList[1]}</p>
              </div>
            </div>
          )}
          {imgT === 4 && aqT === 2 && (
            <div className="profileCard__img-f">
              <img src={userImages[3]} alt="profile-pic" />
            </div>
          )}

          {imgT === 4 && aqT === 3 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 4 && aqT === 3 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[0]}</h3>
                <p>{answersList[0]}</p>
              </div>
            </div>
          )}
          {imgT === 4 && aqT === 3 && (
            <img
              className="profileCard__img-1"
              src={userImages[2]}
              alt="profile-pic"
            />
          )}
          {imgT === 4 && aqT === 3 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[1]}</h3>
                <p>{answersList[1]}</p>
              </div>
            </div>
          )}
          {imgT === 4 && aqT === 3 && (
            <img
              className="profileCard__img-1"
              src={userImages[3]}
              alt="profile-pic"
            />
          )}
          {imgT === 4 && aqT === 3 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[2]}</h3>
                <p>{answersList[2]}</p>
              </div>
            </div>
          )}

          {imgT === 5 && aqT === 0 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 5 && aqT === 0 && (
            <img
              className="profileCard__img-2"
              src={userImages[2]}
              alt="profile-pic"
            />
          )}
          {imgT === 5 && aqT === 0 && (
            <img
              className="profileCard__img-1"
              src={userImages[3]}
              alt="profile-pic"
            />
          )}
          {imgT === 5 && aqT === 0 && (
            <img
              className="profileCard__img-2"
              src={userImages[4]}
              alt="profile-pic"
            />
          )}

          {imgT === 5 && aqT === 1 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 5 && aqT === 1 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[0]}</h3>
                <p>{answersList[0]}</p>
              </div>
            </div>
          )}
          {imgT === 5 && aqT === 1 && (
            <img
              className="profileCard__img-1"
              src={userImages[2]}
              alt="profile-pic"
            />
          )}
          {imgT === 5 && aqT === 1 && (
            <img
              className="profileCard__img-2"
              src={userImages[3]}
              alt="profile-pic"
            />
          )}
          {imgT === 5 && aqT === 1 && (
            <div className="profileCard__img-f">
              <img src={userImages[4]} alt="profile-pic" />
            </div>
          )}

          {imgT === 5 && aqT === 2 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 5 && aqT === 2 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[0]}</h3>
                <p>{answersList[0]}</p>
              </div>
            </div>
          )}
          {imgT === 5 && aqT === 2 && (
            <img
              className="profileCard__img-1"
              src={userImages[2]}
              alt="profile-pic"
            />
          )}
          {imgT === 5 && aqT === 2 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[1]}</h3>
                <p>{answersList[1]}</p>
              </div>
            </div>
          )}
          {imgT === 5 && aqT === 2 && (
            <img
              className="profileCard__img-1"
              src={userImages[3]}
              alt="profile-pic"
            />
          )}
          {imgT === 5 && aqT === 2 && (
            <img
              className="profileCard__img-2"
              src={userImages[4]}
              alt="profile-pic"
            />
          )}

          {imgT === 5 && aqT === 3 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 5 && aqT === 3 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[0]}</h3>
                <p>{answersList[0]}</p>
              </div>
            </div>
          )}
          {imgT === 5 && aqT === 3 && (
            <img
              className="profileCard__img-1"
              src={userImages[2]}
              alt="profile-pic"
            />
          )}
          {imgT === 5 && aqT === 3 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[1]}</h3>
                <p>{answersList[1]}</p>
              </div>
            </div>
          )}
          {imgT === 5 && aqT === 3 && (
            <img
              className="profileCard__img-1"
              src={userImages[3]}
              alt="profile-pic"
            />
          )}
          {imgT === 5 && aqT === 3 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[2]}</h3>
                <p>{answersList[2]}</p>
              </div>
            </div>
          )}
          {imgT === 5 && aqT === 3 && (
            <div className="profileCard__img-f">
              <img src={userImages[4]} alt="profile-pic" />
            </div>
          )}

          {imgT === 6 && aqT === 0 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 6 && aqT === 0 && (
            <img
              className="profileCard__img-2"
              src={userImages[2]}
              alt="profile-pic"
            />
          )}
          {imgT === 6 && aqT === 0 && (
            <img
              className="profileCard__img-1"
              src={userImages[3]}
              alt="profile-pic"
            />
          )}
          {imgT === 6 && aqT === 0 && (
            <img
              className="profileCard__img-2"
              src={userImages[4]}
              alt="profile-pic"
            />
          )}
          {imgT === 6 && aqT === 0 && (
            <div className="profileCard__img-f">
              <img src={userImages[5]} alt="profile-pic" />
            </div>
          )}

          {imgT === 6 && aqT === 1 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 6 && aqT === 1 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[1]}</h3>
                <p>{answersList[1]}</p>
              </div>
            </div>
          )}
          {imgT === 6 && aqT === 1 && (
            <img
              className="profileCard__img-1"
              src={userImages[2]}
              alt="profile-pic"
            />
          )}
          {imgT === 6 && aqT === 1 && (
            <img
              className="profileCard__img-2"
              src={userImages[3]}
              alt="profile-pic"
            />
          )}
          {imgT === 6 && aqT === 1 && (
            <img
              className="profileCard__img-1"
              src={userImages[4]}
              alt="profile-pic"
            />
          )}
          {imgT === 6 && aqT === 1 && (
            <img
              className="profileCard__img-2"
              src={userImages[5]}
              alt="profile-pic"
            />
          )}

          {imgT === 6 && aqT === 2 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 6 && aqT === 2 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[0]}</h3>
                <p>{answersList[0]}</p>
              </div>
            </div>
          )}
          {imgT === 6 && aqT === 2 && (
            <img
              className="profileCard__img-1"
              src={userImages[2]}
              alt="profile-pic"
            />
          )}
          {imgT === 6 && aqT === 2 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[1]}</h3>
                <p>{answersList[1]}</p>
              </div>
            </div>
          )}
          {imgT === 6 && aqT === 2 && (
            <img
              className="profileCard__img-1"
              src={userImages[3]}
              alt="profile-pic"
            />
          )}
          {imgT === 6 && aqT === 2 && (
            <img
              className="profileCard__img-2"
              src={userImages[4]}
              alt="profile-pic"
            />
          )}
          {imgT === 6 && aqT === 2 && (
            <div className="profileCard__img-f">
              <img src={userImages[5]} alt="profile-pic" />
            </div>
          )}

          {imgT === 6 && aqT === 3 && (
            <img
              className="profileCard__img-1"
              src={userImages[1]}
              alt="profile-pic"
            />
          )}
          {imgT === 6 && aqT === 3 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[0]}</h3>
                <p>{answersList[0]}</p>
              </div>
            </div>
          )}
          {imgT === 6 && aqT === 3 && (
            <img
              className="profileCard__img-1"
              src={userImages[2]}
              alt="profile-pic"
            />
          )}
          {imgT === 6 && aqT === 3 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[1]}</h3>
                <p>{answersList[1]}</p>
              </div>
            </div>
          )}
          {imgT === 6 && aqT === 3 && (
            <img
              className="profileCard__img-1"
              src={userImages[3]}
              alt="profile-pic"
            />
          )}
          {imgT === 6 && aqT === 3 && (
            <div className="profileCard__card-3">
              <div className="profileCard__card-3--center">
                <h3>{questionsList[2]}</h3>
                <p>{answersList[2]}</p>
              </div>
            </div>
          )}
          {imgT === 6 && aqT === 3 && (
            <img
              className="profileCard__img-1"
              src={userImages[4]}
              alt="profile-pic"
            />
          )}
          {imgT === 6 && aqT === 3 && (
            <img
              className="profileCard__img-2"
              src={userImages[5]}
              alt="profile-pic"
            />
          )}

          <img
            className="profileCard__img-1"
            src={userImages[0]}
            alt="profile-pic"
          />
          <div className="profileCard__card-3">
            <div className="profileCard__card-3--center">
              <h3>
                <ShareLocationIcon /> {person.name.split(" ")[0]}'s location
              </h3>
              <div className="profileCard__infoTag">
                <LocationCityIcon />
                Lives in {person.livesIn}
              </div>
              {person.from !== "null" && (
                <div className="profileCard__infoTag">
                  <HomeIcon />
                  From {person.from}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="profileCard__container__loading">
          <svg className="w-0">
            <defs>
              <filter id="w-0">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="7"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10"
                  result="res"
                />
                <feComposite in="SourceGraphic" in2="res" operator="atop" />
              </filter>
            </defs>
          </svg>
          <svg className="f-w-0" width="200" height="200" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="linear-gradient">
                <stop className="stop1" offset="0" />
                <stop className="stop2" offset="1" />
              </linearGradient>
              <linearGradient
                y2="160"
                x2="160"
                y1="40"
                x1="40"
                gradientUnits="userSpaceOnUse"
                id="gradient"
                xlinkHref="#linear-gradient"
              />
            </defs>
            <path
              className="path-class"
              d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776
           -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64
           0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736
           -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317
           64,-64 64,-64"
            />
            <circle className="cricle-class" cx="100" cy="100" r="64" />
          </svg>
          <svg
            className="svg-class-1"
            width="200"
            height="200"
            viewBox="0 0 200 200"
          >
            <path
              className="path-class"
              d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776
           -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64
           0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736
           -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64
           64,-64"
            />
            <circle className="cricle-class" cx="100" cy="100" r="64" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
