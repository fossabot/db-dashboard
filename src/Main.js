import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

function Main() {
  return (
    <Routes>
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path="/" element={<SignIn />} />
      <Route exact path="/home" element={<Home />} />
    </Routes>
  );
}

export default Main;
