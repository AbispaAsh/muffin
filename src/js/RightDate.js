import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";
import "../css/style.css";
import ProfileCards from "./ProfileCards";
import SwipeButtons from "./SwipeButtons";
import db, { storage } from "./firebase";
import { useStateValue } from "./StateProvider";

function RightDate() {
  return (
    <div className="right">
      <ProfileCards />
      {/* <SwipeButtons /> */}
    </div>
  );
}

export default RightDate;
