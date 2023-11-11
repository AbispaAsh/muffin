import {
  addDoc,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";
import db, { storage } from "./firebase";
import Compressor from "compressorjs";
import { ref, uploadBytes } from "firebase/storage";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";

function FormUploadUser(props) {
  const [{}, dispatch] = useStateValue();
  const navigate = useNavigate();
  useEffect(() => {
    async function uploadData() {
      const adminRef = doc(db, "users", "admin");
      const adminSnap = await getDoc(adminRef);
      const adminI = adminSnap.data().allUsers.length;
      const age = Math.trunc(
        (Timestamp.now().toDate() - props.values.dob.toDate()) /
          (1000 * 60 * 60 * 24 * 365.25)
      );
      await updateDoc(adminRef, {
        allUsers: arrayUnion(props.values.user.uid),
        userInterests: arrayUnion({
          active: true,
          age: age,
          ageEnd: 80,
          ageStart: 18,
          distance: 50,
          gender: props.values.gender,
          genderInt: props.values.gender === "Man" ? "Woman" : "Man",
          livesInLoc: props.values.livesInLoc,
        }),
      });
      let pPic = "";
      const urls = [];
      async function uploadProfile() {
        async function updateInfo() {
          await setDoc(
            doc(db, "users", props.values.user.uid, "cardInfo", "aboutMe"),
            {
              currentCompany: "null",
              currentTitle: "null",
              currentInstitution: "null",
              currentGraduationYear: "null",
              value: "null",
            }
          );
          await setDoc(
            doc(db, "users", props.values.user.uid, "cardInfo", "education"),
            {
              graduationYears: [],
              institutions: [],
            }
          );
          await setDoc(
            doc(db, "users", props.values.user.uid, "cardInfo", "images"),
            {
              urls: urls,
            }
          );
          await setDoc(
            doc(db, "users", props.values.user.uid, "cardInfo", "prompts"),
            {
              answers: [],
              questions: [],
            }
          );
          await setDoc(
            doc(db, "users", props.values.user.uid, "cardInfo", "work"),
            {
              companies: [],
              titles: [],
            }
          );
          await setDoc(
            doc(db, "users", props.values.user.uid, "infoTags", "drinking"),
            {
              value: "null",
            }
          );
          await setDoc(
            doc(
              db,
              "users",
              props.values.user.uid,
              "infoTags",
              "educationLevel"
            ),
            {
              value: "null",
            }
          );
          await setDoc(
            doc(db, "users", props.values.user.uid, "infoTags", "exercise"),
            {
              value: "null",
            }
          );
          await setDoc(
            doc(db, "users", props.values.user.uid, "infoTags", "from"),
            {
              value: "null",
            }
          );
          await setDoc(
            doc(db, "users", props.values.user.uid, "infoTags", "height"),
            {
              value: "null",
            }
          );
          await setDoc(
            doc(db, "users", props.values.user.uid, "infoTags", "kids"),
            {
              value: "null",
            }
          );
          await setDoc(
            doc(db, "users", props.values.user.uid, "infoTags", "lookingFor"),
            {
              value: "null",
            }
          );
          await setDoc(
            doc(db, "users", props.values.user.uid, "infoTags", "politics"),
            {
              value: "null",
            }
          );
          await setDoc(
            doc(db, "users", props.values.user.uid, "infoTags", "religion"),
            {
              value: "null",
            }
          );
          await setDoc(
            doc(db, "users", props.values.user.uid, "infoTags", "smoking"),
            {
              value: "null",
            }
          );
          await setDoc(
            doc(db, "users", props.values.user.uid, "infoTags", "starSign"),
            {
              value: "null",
            }
          );
          dispatch({
            type: actionTypes.SET_USER,
            user: props.values.user,
          });
          navigate("/app");
        }
        const docRef = await setDoc(doc(db, "users", props.values.user.uid), {
          active: true,
          adminI: adminI,
          age: age,
          dob: props.values.dob,
          gender: props.values.gender,
          generatedList: [],
          interestedInAgeEnd: 80,
          interestedInAgeStart: 18,
          interestedInDistance: 50,
          interestedInGender: props.values.gender === "Man" ? "Woman" : "Man",
          likeList: [],
          livesIn: props.values.livesIn,
          livesInLoc: props.values.livesInLoc,
          matchList: [],
          name: props.values.name,
          profilePic: pPic,
          roomsList: [],
          skipList: [],
        });
        updateInfo();
      }
      async function updatePP() {
        new Compressor(props.values.images[0], {
          width: 60,
          height: 60,
          resize: "cover",
          success(result) {
            const tstp = Timestamp.now().seconds;
            const userStorageRef = ref(
              storage,
              `userImages/${props.values.user.uid}-${tstp}-PP.jpg`
            );
            uploadBytes(userStorageRef, result).then((snapshot) => {
              console.log("Uploaded a blob or file!");
            });
            pPic = `${props.values.user.uid}-${tstp}-PP.jpg`;
            uploadProfile();
          },
          error(err) {
            console.error(err);
          },
        });
      }
      for (let i = 0, count = 0; i < props.values.images.length; i++) {
        (async function () {
          const file = props.values.images[i];
          let img = new Image();
          let imgWidth, imgHeight;
          img.src = window.URL.createObjectURL(file);
          img.onload = () => {
            imgWidth = img.width;
            imgHeight = img.height;
            const maxHeight = imgWidth >= 1050 ? 1050 : 1680;
            const maxWidth = imgHeight >= 1050 ? 1050 : 1680;
            if (imgWidth >= 500 && imgHeight >= 500) {
              new Compressor(file, {
                minHeight: 500,
                minwidth: 500,
                maxHeight: maxHeight,
                maxWidth: maxWidth,
                success(result) {
                  const tstp = Timestamp.now().seconds;
                  urls.push(`${props.values.user.uid}-${tstp}-${count}.jpg`);
                  const userStorageRef = ref(
                    storage,
                    `userImages/${props.values.user.uid}-${tstp}-${count}.jpg`
                  );
                  uploadBytes(userStorageRef, result).then((snapshot) => {});
                },
                error(err) {
                  console.error(err);
                },
              });
            }
          };
          count++;
          if (count > props.values.images.length - 1) {
            updatePP();
          }
        })();
      }
    }

    uploadData();
  }, []);

  return (
    <div
      className="profileCard__container__loading"
      style={{ width: "100%", height: "100vh" }}
    >
      <svg className="w-0">
        <defs>
          <filter id="w-0">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
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
  );
}

export default FormUploadUser;
