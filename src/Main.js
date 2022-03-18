import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import CreatePool from "./pages/CreatePool";
import Home from "./pages/Home";

function Main() {
  return (
    <Routes>
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path="/" element={<SignIn />} />
      <Route exact path="/createpool" element={<CreatePool />} />
      <Route exact path="/home" element={<Home />} />

      {/*<Route element={<SignIn/>} />*/}
    </Routes>
  );
}

export default Main;
