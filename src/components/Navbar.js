import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import Kwil from "../assets/logos/kwil.svg";

export default function NavBar({ page }) {
  const navigate = useNavigate();

  const openHome = () => {
    window.open("https://kwil.com", "_blank");
  };

  const openDocs = () => {
    window.open("https://docs.kwil.com", "_blank");
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div id="nav-wrapper" style={{ position: "fixed", zIndex: 10 }}>
      <div
        id="nav-top-bar"
        style={{
          zIndex: 5,
          backgroundColor: "transparent",
          width: "100vw",
          height: "64px",
          display: "flex",
          marginTop: "10px",
        }}
      >
        <Button
          startIcon={<ArrowBackIosIcon />}
          variant="text"
          onClick={goBack}
          sx={{
            color: "#fff",
            textTransform: "none",
            margin: "auto 20px auto 40px",
            display: page === "home" ? "none" : "flex",
          }}
        >
          Back
        </Button>
        <h1
          style={{
            textAlign: "center",
            fontSize: "32px",
            margin: "auto 0px auto 20px",
            background:
              "-webkit-linear-gradient(45deg, #FF4F99 30%, #717AFF 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          KwilDB
        </h1>
        <img
          src={Kwil}
          alt="kwil-logo"
          style={{
            height: "32px",
            margin: "auto auto auto 10px",
          }}
        />
        <Button
          href="/"
          sx={{
            textTransform: "none",
            margin: "auto 0px auto auto",
            color: "#fff",
          }}
          variant="text"
        >
          Home
        </Button>
        <Button
          onClick={openDocs}
          sx={{
            textTransform: "none",
            margin: "auto 40px auto 20px",
            color: "#fff",
          }}
          variant="text"
        >
          API Docs
        </Button>
      </div>
    </div>
  );
}
