import { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYh6PakaOJIFubR8FlgkiOxs4EmBMDYBw",
  authDomain: "muffin-aded0.firebaseapp.com",
  projectId: "muffin-aded0",
  storageBucket: "muffin-aded0.appspot.com",
  messagingSenderId: "165518145382",
  appId: "1:165518145382:web:63304208eee7f08a3d7aa7",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const useAuth = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(firebaseApp);
  let mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("onAuthUserChanged", user);
      if (user) {
        if (mounted.current) {
          setUser(user);
        }
      } else {
        if (mounted.current) {
          setUser(null);
        }
      }
    });

    return () => {
      mounted.current = false;
    };
  }, [auth]);

  return {
    user,
  };
};
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);
(async () => {
  await setPersistence(auth, browserSessionPersistence);
})();

export { auth, provider, useAuth, storage };
export default db;
