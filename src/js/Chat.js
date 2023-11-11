import React, { useState, useEffect } from "react";
import "../css/style.css";
import { Avatar } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import db, { storage } from "./firebase";

// name, message, profilePic, timestamp;
function Chat({ id, name, sid }) {
  const [lastMessage, setLastMessage] = useState("");
  const { roomId } = useParams();
  const [pPRef, setPPRef] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const docSnap = await getDoc(doc(db, "users", sid));
        const img = docSnap.data().profilePic;
        getDownloadURL(ref(storage, `userImages/${img}`))
          .then((url) => {
            setPPRef(url);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    if (id) {
      const unsubMsg = onSnapshot(doc(db, "rooms", id), (doc) => {
        const msg = doc.data().lastMessage;
        let lmsg;
        lmsg = msg.length > 18 ? msg.substring(0, 18) + "..." : msg;
        if (msg === "niYPcJPHqvKoqugCGjMi") {
          lmsg = msg;
        }
        setLastMessage(lmsg);
      });
    }
  }, [id]);

  return (
    <Link to={`/app/chat/${id}`}>
      <div
        className={`${id === roomId ? "chat-active" : ""} ${
          lastMessage === "niYPcJPHqvKoqugCGjMi" ? "chat__newChat" : "chat"
        }`}
      >
        <Avatar className="chat__image" alt={name} src={pPRef} />
        <div
          className={`${
            lastMessage === "niYPcJPHqvKoqugCGjMi"
              ? "chat__details__newChat"
              : "chat__details"
          }`}
        >
          <h2>{name}</h2>
          <p
            className={`${
              lastMessage === "niYPcJPHqvKoqugCGjMi"
                ? "chat__lastmessage__newChat"
                : "chat__lastmessage"
            }`}
          >
            {`${
              lastMessage === "niYPcJPHqvKoqugCGjMi"
                ? "NEW MATCH!"
                : lastMessage
            }`}
          </p>
        </div>
        {/* <p className="chat__timestamp">{timestamp}</p> */}
      </div>
    </Link>
  );
}

export default Chat;
