import React, { useEffect, useState } from "react";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import "../css/style.css";
import Chat from "./Chat";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import { useParams } from "react-router-dom";

function Chats() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const { roomId } = useParams();
  //.filter((doc) => roomSnapshot.data().roomList.includes(doc.id))
  const currentUserID = user.uid;
  useEffect(() => {
    (async function () {
      try {
        const querySnapshot = await getDocs(collection(db, "rooms"));
        const roomSnapshot = await getDoc(doc(db, "users", currentUserID));
        setRooms(
          querySnapshot.docs
            .filter((doc) => roomSnapshot.data().roomsList.includes(doc.id))
            .map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
        );
      } catch (e) {
        console.error(e);
      }
    })();
  }, [roomId, user]);

  const roomName = (room) => {
    let senderInd = room.data.senders.indexOf(user.uid);
    senderInd = senderInd ? 0 : 1;
    const senderName = room.data.senderNames[senderInd];

    return senderName;
  };

  const roomPic = (room) => {
    let senderInd = room.data.senders.indexOf(user.uid);
    senderInd = senderInd ? 0 : 1;
    const senderId = room.data.senders[senderInd];

    return senderId;
  };

  return (
    <div className="chats">
      {rooms.map((room) => (
        <Chat
          key={room.id}
          id={room.id}
          name={roomName(room)}
          sid={roomPic(room)}
        />
      ))}
    </div>
  );
}

export default Chats;
