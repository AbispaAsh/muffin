import { Button } from "@mui/material";
import adImage from "../img/dffd.jpg";
import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

function LandingBody() {
  const Body = BodyDecider();
  return (
    <div className="landing__body">
      <Body />
    </div>
  );
}

function BodyDecider() {
  if (window.location.pathname === "/") {
    return BodyHome;
  } else if (window.location.pathname === "/about") {
    return BodyAbout;
  } else if (window.location.pathname === "/contact") {
    return BodyContact;
  }
}

const BodyHome = () => {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const signUp = () => {
    if (user) {
      navigate("/app");
    } else {
      navigate("/sign-up");
    }
  };
  const signIn = () => {
    if (user) {
      navigate("/app");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="landing__home">
      <div className="landing__home__rect1"></div>
      <div className="landing__home__rect2"></div>
      <div className="landing__home__cta">
        <h1>Make the first move</h1>
        <h6>
          Start meeting new people in your area! If you already have an account,
          sign in to use Muffin.
        </h6>
        <div className="landing__home__cta__btns">
          <Button onClick={signUp} className="landing__home__cta__btn--1">
            JOIN
          </Button>
          <Button onClick={signIn} className="landing__home__cta__btn--2">
            SIGN IN
          </Button>
        </div>
      </div>
      <img className="landing__home__img" src={adImage} alt="ad" />
    </div>
  );
};

const BodyContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const contactForm = useRef();
  const successForm = useRef();
  const failForm = useRef();

  const handleSend = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_bl20c1c",
        "template_u9qly2j",
        contactForm.current,
        "user_IKlWq9XV8t6ZxO7bRNLbv"
      )
      .then(
        (result) => {
          setName("");
          setEmail("");
          setMessage("");
          successForm.current.style.zIndex = 1;
          setTimeout(() => {
            successForm.current.style.zIndex = -1;
          }, 2000);
        },
        (error) => {
          failForm.current.style.zIndex = 1;
          setTimeout(() => {
            failForm.current.style.zIndex = -1;
          }, 2000);
        }
      );
  };

  return (
    <div className="landing__contact">
      <div className="landing__contact__title">
        Got a question? We're here to help
      </div>
      <div className="landing__contact__cta">
        <div className="landing__contact__form">
          <div ref={successForm} className="landing__contact__success">
            <CheckCircleOutlinedIcon />
            Message sent succesfully!
          </div>
          <div ref={failForm} className="landing__contact__fail">
            <DoNotDisturbOnOutlinedIcon />
            Message not sent.
          </div>
          <form ref={contactForm}>
            <input
              name="user_name"
              type="text"
              value={name}
              className="landing__contact__form__feedback-input"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required="required"
            />
            <input
              name="email"
              type="email"
              value={email}
              className="landing__contact__form__feedback-input"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required="required"
            />
            <textarea
              name="text"
              value={message}
              className="landing__contact__form__feedback-input"
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
              required="required"
            ></textarea>
            <input onClick={handleSend} type="submit" value="SUBMIT" />
          </form>
        </div>
        <div className="landing__contact__socials">
          Connect to us on:
          <Button>
            <InstagramIcon />
            @muffin_app
          </Button>
          <Button>
            <TwitterIcon />
            @muffin_app
          </Button>
          <Button>
            <FacebookIcon />
            /muffinapp
          </Button>
        </div>
      </div>
    </div>
  );
};

const BodyAbout = () => {
  return (
    <div className="landing__about">
      <div className="landing__about__title">Meet your Foodie-alike!</div>
    </div>
  );
};

export default LandingBody;
