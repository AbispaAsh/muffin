import React, { useState } from "react";
import "./css/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ScriptTag from "react-script-tag";

import Landing from "./js/Landing";
import MainApp from "./js/MainApp";
import Login from "./js/Login";
import { useStateValue } from "./js/StateProvider";
import NotFound from "./js/NotFound";
import SignUp from "./js/SignUp";
import Test from "./js/Test";

function App() {
  const [{ user }, dispatch] = useStateValue();

  // const navigate = useNavigate();
  // const [user, setUser] = useState("user");

  console.log(user);
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<Landing />} />
          <Route path="/contact" element={<Landing />} />
          {!user && <Route path="login" element={<Login />} />}
          <Route path="/sign-up" element={<SignUp />} />
          {user && <Route path="app" element={<MainApp />} />}
          {user && <Route path="/app/chat/:roomId" element={<MainApp />} />}
          {user && <Route path="/app/restaurants" element={<MainApp />} />}
          {user && (
            <Route
              path="/app/user-profile/edit-profile"
              element={<MainApp />}
            />
          )}
          {user && (
            <Route path="/app/user-profile/settings" element={<MainApp />} />
          )}
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
