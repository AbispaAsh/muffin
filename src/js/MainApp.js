import React, { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { getDistance } from "geolib";
import LeftApp from "./LeftApp";

import RightDate from "./RightDate";
import RightResto from "./RightResto";
import ChatScreen from "./ChatScreen";
import UserEditProfile from "./UserEditProfile";
import UserSettings from "./UserSettings";
import LeftUserProfile from "./LeftUserProfile";
import db, { storage } from "./firebase";
import { useStateValue } from "./StateProvider";
import { set } from "react-hook-form";

// import { Routes, Route, Outlet } from "react-router-dom";

function MainApp() {
  const [{ user }, dispatch] = useStateValue();
  const [renderNow, setRenderNow] = useState(false);
  async function updateData() {
    const userRef = doc(db, "users", user.uid);
    const adminRef = doc(db, "users", "admin");
    let docSnap = await getDoc(userRef);
    let adminSnap = await getDoc(adminRef);
    // let userGenratedList = docSnap.data().generatedList;
    let userGenratedList = [];
    let allUserList = adminSnap.data().allUsers;
    let allUserInterestList = adminSnap.data().userInterests;
    for (let i = 0; i < allUserList.length; i++) {
      if (!allUserInterestList[i].active) {
        continue;
      }
      if (docSnap.data().interestedInGender !== allUserInterestList[i].gender) {
        if (docSnap.data().interestedInGender === "Everyone") {
        } else {
          continue;
        }
      }
      if (docSnap.data().gender !== allUserInterestList[i].genderInt) {
        if (allUserInterestList[i].genderInt === "Everyone") {
        } else {
          continue;
        }
      }
      if (
        allUserInterestList[i].age < docSnap.data().interestedInAgeStart ||
        allUserInterestList[i].age > docSnap.data().interestedInAgeEnd
      ) {
        continue;
      }
      if (
        docSnap.data().age < allUserInterestList[i].ageStart ||
        docSnap.data().age > allUserInterestList[i].ageEnd
      ) {
        continue;
      }
      const distBtwn = getDistance(
        {
          latitude: docSnap.data().livesInLoc[0],
          longitude: docSnap.data().livesInLoc[1],
        },
        {
          latitude: allUserInterestList[i].livesInLoc[0],
          longitude: allUserInterestList[i].livesInLoc[1],
        }
      );
      if (distBtwn / 1000 > docSnap.data().interestedInDistance) {
        continue;
      }
      if (distBtwn / 1000 > allUserInterestList[i].distance) {
        continue;
      }
      userGenratedList.push(allUserList[i]);
    }
    userGenratedList = userGenratedList.filter((id) => id !== user.uid);
    userGenratedList = userGenratedList.filter(
      (id) => !docSnap.data().skipList.includes(id)
    );
    userGenratedList = userGenratedList.filter(
      (id) => !docSnap.data().likeList.includes(id)
    );
    userGenratedList = userGenratedList.filter(
      (id) => !docSnap.data().matchList.includes(id)
    );
    userGenratedList = [...new Set(userGenratedList)];
    // const querySnapshot = await getDocs(collection(db, "users"));
    // querySnapshot.forEach((doc) => console.log(doc.id, "=>", doc.data()));
    // const interestedInAgeStartList =
    // userGenratedList = userGenratedList.filter();
    const c = await updateDoc(userRef, {
      generatedList: userGenratedList,
    });
    return c;
  }
  updateData()
    .then(() => {
      setRenderNow(true);
    })
    .catch((e) => console.log(e));
  const Left = LeftDecider();
  const Right = RightDecider();
  if (renderNow) {
    return (
      <div className="main-container">
        <Left />
        <Right />
      </div>
    );
  }
  return <div></div>;
}

function LeftDecider() {
  if (window.location.pathname.startsWith("/app/user-profile")) {
    return LeftUserProfile;
  } else if (window.location.pathname.startsWith("/app")) {
    return LeftApp;
  }
}

function RightDecider() {
  if (window.location.pathname === "/app/restaurants") {
    return RightResto;
  } else if (window.location.pathname === "/app") {
    return RightDate;
  } else if (window.location.pathname.startsWith("/app/chat/")) {
    return ChatScreen;
  } else if (window.location.pathname === "/app/user-profile/edit-profile") {
    return UserEditProfile;
  } else if (window.location.pathname === "/app/user-profile/settings") {
    return UserSettings;
  }
}

export default MainApp;
