import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

function Main() {
  return (
    <Routes>
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path="/" element={<SignIn />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/privacy" element={<PrivacyPolicy />} />
      <Route exact path="/terms" element={<Terms />} />
    </Routes>
  );
}

export default Main;
